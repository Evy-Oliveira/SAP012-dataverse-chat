import data from "../data/dataset.js";
import { filterById } from "../lib/dataFunctions.js";

export function chat(props) {
  document.title = "Chat individual";
    const viewEl = document.createElement('div');
    viewEl.classList.add('chat');
    viewEl.innerHTML = `<div class="chats-individuais">
    <section class="chat-individual">
    <figure class="chat-img-personagem"><img src="https://1.bp.blogspot.com/-idOGKkUibAo/UMuLr6ylG4I/AAAAAAAABV0/sxYu84vkCC8/s1600/Sakura+Kinomoto.jpg"alt="imagem da Sakura Kinomoto protagonista do Sakura Cardcaptor"></figure>
    <div>
    <h1 class="chat-personagem">Sakura Kinomoto</h1>
    <p class="chat-personalidade">Gentil, responsável, leal aos seus entes queridos, senso de dever e preferência pela harmonia e estabilidade.</p>
    </div>
    </section>
    <ul id="chat-mensagens">
    <li class="mensagem-enviada"><span>Olá,qual o seu nome?</span></li>
    <li class="mensagem-resposta"><span>Meu nome é Sakura Kinomoto</span></li>
    </ul>
    <div class="chat-input">
    <input name="chat-mensagem" type="text" class="chat-mensagem" placeholder="Mensagem">
    <button class="chat-botao">Enviar</button>
    </div>
</div>`;
    
    return viewEl;
  }