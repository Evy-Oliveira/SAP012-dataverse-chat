
import { home } from './views/Home.js'
import { chat } from './views/chat.js'
import { error } from './views/Error.js'
import { setRootEl, setRoutes, onURLChange } from './router.js'
import { setApiKey } from './lib/apikey.js'

const routes = {
  "/": home,
  "/chat": chat,
  "/error": error,
};
setRoutes(routes);

window.addEventListener("DOMContentLoaded", () => {
  setRootEl(document.getElementById("root"));
  onURLChange(window.location);
});

//modal chave api
const closeApiKeyModal = () => {
  const modal = document.querySelector("#modal-apikey");
  modal.style.display = "none";
}

const openApiKeyModal = () => {
  const modal = document.querySelector("#modal-apikey");
  modal.style.display = "flex";
  // Criar e adicionar o elemento de fundo transparente
  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');
  document.body.appendChild(overlay);

  // Adicionar um evento de clique ao overlay para fechar o modal
  overlay.addEventListener('click', () => {
    closeApiKeyModal();
    document.body.removeChild(overlay); // Remover o overlay quando o modal for fechado

  });
}
document.querySelector("#botao-apikey").addEventListener('click', () => {
  openApiKeyModal();
})
// botao de salvar chave api
document.querySelector("#botao-salvar").addEventListener('click', () => {
  const chaveApi = document.querySelector("input[name='key-value']").value;
  setApiKey(chaveApi);
  closeApiKeyModal();
})