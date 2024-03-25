import data from "../data/dataset.js";
import { filterById } from "../lib/dataFunctions.js";
import { communicateWithOpenAI } from "../lib/openAiApi.js";
import { getApiKey } from "../lib/apikey.js";
import { openApiKeyModal } from "../components/modalApiKey.js";

export function chat(props) {
  document.title = " Otaku's List - Chat";
  const dataAnime = filterById(data, props["id"]);
  //verificar se dataAnine é undefined (!dataAnime), se for encaminha para a pagina de erro;
  if(!dataAnime){
    window.location.href = '/error';
    return;
  }
  const viewEl = document.createElement('div');
  viewEl.classList.add('chat');
  viewEl.innerHTML = `<div class="chats-individuais">
    <section class="chat-id-perso">
     <figure class="chat-img-personagem"><img src="${dataAnime.facts.protagonist.imageURL}" title="imagem de ${dataAnime.facts.protagonist.name} protagonista do ${dataAnime.name}"></figure>
     <div>
       <h1 class="chat-personagem">${dataAnime.facts.protagonist.name}</h1>
       <p class="chat-personalidade">${dataAnime.facts.protagonist.personality}</p>
     </div>
    </section>
    <div class="listaMensagens">
     <ul id="chat-mensagens"></ul>
    </div>
    <div class="chat-execao">
     <p class="chat-typing" style="display:none">${dataAnime.facts.protagonist.name} está digitando...</p>
     <p class="chat-erro-typing" style="display:none"> Você quer conversar com ${dataAnime.facts.protagonist.name}? Primeiro informe uma chave api na parte superior da tela a direita</p>
    </div>
    <div class="chat-input">
     <input name="chat-mensagem" type="text" class="chat-mensagem" placeholder="Mensagem">
     <button class="chat-botao">Enviar</button>
    </div>
</div>`;

  const chatTyping = viewEl.querySelector(".chat-typing");
  const chatErroTyping = viewEl.querySelector('.chat-erro-typing');
  const inputMessage = viewEl.querySelector('input[name="chat-mensagem"]');
  let messages = [];

  const sendMessage = (event) => {
    event.preventDefault();
    if(!getApiKey()){
      chatErroTyping.style.display ="block";
      return;
    }

    chatErroTyping.style.display ="none";
    
    const chatMessage = inputMessage.value;

    const ul = viewEl.querySelector("#chat-mensagens");
    const li = document.createElement('li');
    li.classList.add("mensagem-enviada");
    li.innerHTML = `<span>${chatMessage}</span>`;
    ul.appendChild(li);

    li.scrollIntoView();

    inputMessage.value = "";

    chatTyping.style.display = "block";

    if (messages.length === 0) {
      messages = [{
        "role": "system",
        "content": `a partir de agora responda a tudo que eu disse nesta conversa como se fosse ${dataAnime.facts.protagonist.name} do anime ${dataAnime.name}. Considere a seguinte personalidade: ${dataAnime.facts.protagonist.personality}`
      }];
    }
  
    messages.push({
      "role": "user",
      "content": chatMessage
    });


    communicateWithOpenAI(messages)
      .then(assistentAnswer => {

        if (assistentAnswer && assistentAnswer.choices && assistentAnswer.choices.length > 0 && assistentAnswer.choices[0].message && assistentAnswer.choices[0].message.content) {
          const message = assistentAnswer.choices[0].message.content.trim();
          const assistantMessage = {
            "role": "assistant",
            "content": message
          };
    
          messages.push(assistantMessage);

          chatTyping.style.display = "none";

          const li2 = document.createElement('li');
          li2.classList.add('mensagem-resposta');
          li2.innerHTML = `<span>${message}</span>`;
          ul.appendChild(li2);

          li2.scrollIntoView();

        }
        //  else {
        //   console.error("Resposta do assistente inválida:", assistentAnswer);
        // }
      })
      .catch(error => {
        chatTyping.style.display = "none";
        alert(error);
        openApiKeyModal();
      });
      
  }
  inputMessage.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
      e.preventDefault();
    }
  });

  viewEl.querySelector(".chat-botao").addEventListener('click', sendMessage);

  return viewEl;
}
