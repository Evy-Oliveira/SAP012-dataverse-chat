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

import {Home} from './views/Home.js'
import {About} from './views/About.js'
import {Error} from './views/Error.js'
import {setRootEl, setRoutes, onURLChange } from './router.js'

const routes = {
    "/": Home,
    "/About": About,
    "/error": Error,
};
setRoutes(routes);

window.addEventListener("DOMContentLoaded", () =>{
    setRootEl(document.getElementById("root"));
    onURLChange(window.location);
});
