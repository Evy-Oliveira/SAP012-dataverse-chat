
import data from '../data/dataset.js';
import { filterBy, sortBy, computeStats } from '../lib/dataFunctions.js';
import { renderCards } from '../components/cards.js';
import { renderListClassification } from '../components/statistics.js';


export function home() {
  const viewEl = document.createElement('div');
  viewEl.innerHTML = `<section class="menu">
    <section id="filtro">
      <label for="streaming">Filtrar por</label>
      <select data-testid="select-filter" id="streaming" name="streaming">
        <option value=""></option>
        <option value="Netflix">Netflix</option>
        <option value="Crunchyroll">Crunchyroll</option>
        <option value="Star+">Star+</option>
      </select>
    </section>
    <section id="ordem">
      <label for="ordenacao">Ordenar</label>
      <select data-testid="select-sort" id="ordenacao" name="name">
        <option value=""></option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
      </select>
    </section>
    <button id="limpar-filtro" data-testid="button-clear">Limpar</button>
  </section>
  <details class="meu-menu">
    <summary>Confira as Estatísticas</summary>
    <section class="estatisticas"></section>
  </details>
   <main>
    <h2>Deseja saber mais sobre animes?</h2>
    <section id="container-cards"></section>
  </main>`;
  //renderizando os cards
  let dadosExibidos = data;
  const listaCartao = viewEl.querySelector('#container-cards');
  listaCartao.appendChild(renderCards(dadosExibidos));

  //filtro
  viewEl.querySelector("#streaming").addEventListener('change', (event) => {
    const valorFiltro = event.target.value;
    dadosExibidos = filterBy(data, 'streaming', valorFiltro);
    listaCartao.innerHTML = "";
    listaCartao.appendChild(renderCards(dadosExibidos));
  });
  // limpar seleção
  viewEl.querySelector("#limpar-filtro").addEventListener('click', () => {
    listaCartao.innerHTML = "";
    viewEl.querySelector('#ordenacao').value = "";
    viewEl.querySelector('#streaming').value = "";
    listaCartao.appendChild(renderCards(data));
  });
  //ordenação
  viewEl.querySelector("#ordenacao").addEventListener('change', (event) => {
    const valorOrdenacao = event.target.value;
    const valorOrdenado = sortBy(dadosExibidos, 'name', valorOrdenacao);
    listaCartao.innerHTML = "";
    listaCartao.appendChild(renderCards(valorOrdenado));
  });
  //estatistica
  const classificationList = viewEl.querySelector(".estatisticas");
  classificationList.appendChild(renderListClassification(computeStats(dadosExibidos)));
  
  //modal curiosidades
  window.closeModal = (id) => {
    const modal = document.querySelector("#modal-" + id);
    modal.style.display = "none";
  }
  window.openModal = (id) => {
    const modal = document.querySelector("#modal-" + id);
    modal.style.display = "block";
    // Criar e adicionar o elemento de fundo transparente
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');
    document.body.appendChild(overlay);

    // Adicionar um evento de clique ao overlay para fechar o modal
    overlay.addEventListener('click', () => {
      window.closeModal(id);
      document.body.removeChild(overlay); // Remover o overlay quando o modal for fechado

    });
  }
  const botoesChat = viewEl.getElementsByClassName('chat-prot');

  for (let index = 0; index < botoesChat.length; index++) {
    const botao = botoesChat[index];
    botao.addEventListener('click', (event) =>{
      const animeId = event.target.dataset.id;
      // const props = {id:animeId};
      window.location.href = window.location.origin + '/chat?id=' + animeId;
      // window.navigateToPage('/Chat', props);
    });
  }
  return viewEl;
}
