
import { home } from './views/Home.js'
import { chat } from './views/chat.js'
import { error } from './views/Error.js'
import { setRootEl, setRoutes, onURLChange } from './router.js'
import { setApiKey } from './lib/apikey.js'
import { openApiKeyModal, closeApiKeyModal } from './components/modalApiKey.js'



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

document.querySelector("#botao-apikey").addEventListener('click', () => {
  openApiKeyModal();
});
// botao de salvar chave api
document.querySelector("#botao-salvar").addEventListener('click', () => {
  const chaveApi = document.querySelector("input[name='key-value']").value;
  setApiKey(chaveApi);
  closeApiKeyModal();
});

