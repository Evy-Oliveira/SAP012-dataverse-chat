// Neste arquivo você definirá suas rotas e importará os componentes que irá renderizar.
/*
importar exemplo de './views/Example.js';

Exemplo de definição de rota:

rotas const = {
    "/": Exemplo,
    ...
}
*/
/*
TODOS:
1.- Defina rotas no roteador. ok
2.- Passe o "elemento raiz" ao roteador.
3.- Invoque o roteador para renderizar a visualização correta.
*/

import {home} from './views/home.js'
import {chatWithProtagonist} from './views/chatWithProtagonist.js'
import {error} from './views/error.js'
import {setRootEl, setRoutes, onURLChange } from './router.js'

const routes = {
    "/": home,
    "/ChatWithProtagonist": chatWithProtagonist,
    "/Error": error,
};
setRoutes(routes);

window.addEventListener("DOMContentLoaded", () =>{
    setRootEl(document.getElementById("root"));
    onURLChange(window.location);
});
window.closeApiKeyModal = () => {
    const modal = document.querySelector("#modal-apikey");
    modal.style.display = "none";
  }
  window.openApiKeyModal = () => {
    const modal = document.querySelector("#modal-apikey");
    modal.style.display = "block";
    // Criar e adicionar o elemento de fundo transparente
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');
    document.body.appendChild(overlay);

    // Adicionar um evento de clique ao overlay para fechar o modal
    overlay.addEventListener('click', () => {
      window.closeApiKeyModal();
      document.body.removeChild(overlay); // Remover o overlay quando o modal for fechado

    });
  }