import data from "../data/dataset.js";
import {filterById} from "../lib/dataFunctions.js";

export function chat(props) {
  document.title = "Chat individual";
  const dataAnime = filterById(data, props["id"]);
  console.log(dataAnime);
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
    <ul id="chat-mensagens">
    <li class="mensagem-enviada"><span>Olá,qual o seu nome?</span></li>
    <li class="mensagem-resposta"><span>Meu nome é ${dataAnime.facts.protagonist.name}</span></li>
    </ul>
    <div class="chat-input">
    <input name="chat-mensagem" type="text" class="chat-mensagem" placeholder="Mensagem">
    <button class="chat-botao">Enviar</button>
    </div>
</div>`;
    
    return viewEl;
  }