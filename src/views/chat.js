import data from "../data/dataset.js";
import { filterById } from "../lib/dataFunctions.js";
import { communicateWithOpenAI } from "../lib/openAiApi.js";

export function chat(props) {
  document.title = "Chat individual";
  const dataAnime = filterById(data, props["id"]);
  const viewEl = document.createElement('div');
  viewEl.classList.add('chat');
  viewEl.innerHTML = `<div class="chats-individuais">
    <section class="chat-individual">
    <figure class="chat-img-personagem"><img src="${dataAnime.facts.protagonist.imageURL}" alt="imagem de ${dataAnime.facts.protagonist.name} protagonista do ${dataAnime.name}"></figure>
    <div>
    <h1 class="chat-personagem">${dataAnime.facts.protagonist.name}</h1>
    <p class="chat-personalidade">${dataAnime.facts.protagonist.personality}</p>
    </div>
    </section>
    <div class="listaMensagens">
    <ul id="chat-mensagens"></ul>
    </div>
    <div class="chat-typing" style="display:none">${dataAnime.facts.protagonist.name} está digitando...</div>
    <div class="chat-input">
    <input name="chat-mensagem" type="text" class="chat-mensagem" placeholder="Mensagem">
    <button class="chat-botao">Enviar</button>
    </div>
</div>`;

  const chatTyping = viewEl.querySelector(".chat-typing");
  const inputMessage = viewEl.querySelector('input[name="chat-mensagem"]');
  let messages = [];

  const sendMessage = (event) => {
    event.preventDefault();
    const chatMessage = inputMessage.value;

    const ul = viewEl.querySelector("#chat-mensagens");
    const li = document.createElement('li');
    li.classList.add("mensagem-enviada");
    li.innerHTML = `<span>${chatMessage}</span>`;
    ul.appendChild(li);
    inputMessage.value ="";

    chatTyping.style.display = "block";

    if (messages.length === 0) {
      messages = [{
        "role": "system",
        "content": `a partir de agora responda a tudo que eu disse nesta conversa como se fosse ${dataAnime.facts.protagonist.name} do anime ${dataAnime.name}. Considere a seguinte personalidade: ${dataAnime.facts.protagonist.personality}`
      }];
    }
  console.log(typeof messages);
  //incluir obejto no vetor de objtos com add ou push?
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
          console.log(messages)
          messages.push(assistantMessage);

          chatTyping.style.display = "none";

          const li2 = document.createElement('li');
          li2.classList.add('mensagem-resposta');
          li2.innerHTML = `<span>${message}</span>`;
          ul.appendChild(li2);

        } else {
          console.error("Resposta do assistente inválida:", assistentAnswer);
        }
      })
      .catch(error => {
        console.error("Erro ao comunicar com OpenAI:", error);
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
