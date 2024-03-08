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
    <div class="listaMensagens"></div>
    <div class="chat-input">
    <input name="chat-mensagem" type="text" class="chat-mensagem" placeholder="Mensagem">
    <button class="chat-botao">Enviar</button>
    </div>
</div>`;


  const messages = [{
    "role": "system",
    "content": `a partir de agora responda a tudo que eu disse nesta conversa como se fosse ${dataAnime.facts.protagonist.name} do anime ${dataAnime.name}. Considere a seguinte personalidade: ${dataAnime.facts.protagonist.personality}`
  }];
  messages.push({
    "role": "user",
    "content": "Me conte sua historia"
  });

  communicateWithOpenAI(messages)
    .then(assistentAnswer => {
      const ul = document.createElement('ul');
      ul.id = "chat-mensagens";

       if (assistentAnswer && assistentAnswer.choices && assistentAnswer.choices.length > 0 && assistentAnswer.choices[0].message && assistentAnswer.choices[0].message.content) {
        const assistantMessage = {
          "role": "assistant",
          "content": assistentAnswer.choices[0].message.content.trim()
        };
        messages.push(assistantMessage);

      for (const message of messages) {
        if(message.role !== "system"){
        const li = document.createElement('li');
        if (message.role === "assistant")
          li.classList.add('mensagem-resposta');
        else if (message.role === "user")
          li.classList.add("mensagem-enviada");
        li.innerHTML = `<span>${message.content}</span>`;
        ul.appendChild(li);
        }
      }
      const listaMensagens = viewEl.querySelector('.listaMensagens');
      console.log(listaMensagens);
      listaMensagens.appendChild(ul);

      } else {
        console.error("Resposta do assistente inválida:", assistentAnswer);
      }
    })
    .catch(error => {
      console.error("Erro ao comunicar com OpenAI:", error);
    });

  return viewEl;
}
// communicateWithOpenAI(messages).then(assistentAnswer => {
//   console.log("Resposta da OpenAI:", assistentAnswer); // Adicione este console.log
//   const choice = assistentAnswer?.choices?.[0];
//   const assistantMessage = choice?.message?.content?.trim();
//   if (assistantMessage) {
//       const message = {
//           role: "assistant",
//           content: assistantMessage
//       };
//       messages.push(message);
//       // Exibir a mensagem na interface do usuário
//       const chatMensagens = document.getElementById('chat-mensagens');
//       const liAnswer = document.createElement('li');
//       liAnswer.classList.add('mensagem-resposta');
//       liAnswer.innerHTML = `<span>${assistantMessage}</span>`;
//       chatMensagens.appendChild(liAnswer);
//   } else {
//       console.error("Resposta do assistente inválida:", assistentAnswer);
//   }
// }).catch(error => {
//   console.error("Erro ao comunicar com OpenAI:", error);
// });
//
// communicateWithOpenAI(messages).then(assistentAnswer => {
//   if (assistentAnswer && assistentAnswer.message && assistentAnswer.message.content) {
//     messages.push(assistentAnswer);
//     const liAnswer = document.createElement('li');
//     liAnswer.classList.add('mensagem-resposta');
//     liAnswer.innerHTML = `<span>${assistentAnswer.message.content}</span>`;
//     viewEl.querySelector('#chat-mensagens').appendChild(liAnswer);
//   } else {
//     console.error("Resposta do assistente inválida:", assistentAnswer);
//   }
// }).catch(error => {
//   console.error("Erro ao comunicar com OpenAI:", error);
// });

// communicateWithOpenAI(messages).then(assistentAnswer => {
//   messages.push(assistentAnswer);
//   const liAnswer = document.createElement('li');
//   liAnswer.classList.add('mensagem-resposta');
//   liAnswer.innerHTML = `<span>${assistentAnswer.message.content}</span>`;
//   viewEl.querySelector('#chat-mensagens').appendChild(liAnswer);
// });

// try{
// let assistentAnswer = await communicateWithOpenAI(messages);
// console.log('Resposta do assistente:', assistentAnswer);
//   messages.push(assistentAnswer);
//   const liAnswer = document.createElement('li');
//   liAnswer.classList.add('mensagem-resposta');
//   liAnswer.innerHTML = `<span>${assistentAnswer.message.content}</span>`
//   viewEl.querySelector('#chat-mensagens').appendChild(liAnswer);
// } catch (error){
//   console.error('Ocorreu um erro ao obter a resposta do assistente:', error)
// }
