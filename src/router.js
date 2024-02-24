let ROUTES = {};
let rootEl;

export const setRootEl = (el) => {
  // atribuir ROTAS
  rootEl = el;
}

export const setRoutes = (routes) => {
  // opcional Lança erros se as rotas não forem um objeto - opcional Lança erros se as rotas não definirem uma rota /error - atribuir ROTAS
  if (typeof routes !== 'object') {
    throw new Error('Routes não é um objeto')
  }
  if (!routes['/error']) {
    throw new Error('Routes não definiu uma rota')
  }
  ROUTES = routes;
}

 const renderView = (pathname, props = {}) => {
  // limpa o elemento raiz
  // encontra a visualização correta em ROUTES para o nome do caminho
  // caso não seja encontrado renderiza a view do erro
  // renderiza a view correta passando o valor das props
  // adiciona o elemento view ao elemento raiz do DOM
}

export const onURLChange = (location) => {
  // analisa a localização do nome do caminho e dos parâmetros de pesquisa
  // converte os parâmetros de pesquisa em um objeto
  // renderiza a view com o caminho e o objeto
const pathname = window.location.pathname;
const search= window.location.search;
const queryObject = queryStringToObject(search);

renderView(pathname, queryObject);

window.addEventListener('popstate', onURLChange);

onURLChange();
}

  export const navigateTo = (pathname, props={}) => {
    //atualiza o histórico da janela com pushState
   // renderiza a view com o nome do caminho e props
  }
  const queryStringToObject = (queryString) => {
//converte a string de consulta em URLSearchParams
//converte URLSearchParams em um objeto
//retorna o objeto
  }