let ROUTES = {};
let rootEl;
const ERRORPATH = '/Error'

export const setRootEl = (el) => {
  // atribuir elemento raiz
  rootEl = el;
}

export const setRoutes = (routes) => {
  // opcional Lança erros se as rotas não forem um objeto - opcional Lança erros se as rotas não definirem uma rota /error
  if (typeof routes !== 'object') {
    throw new Error('Routes não é um objeto')
  }
  if (!routes[ERRORPATH]) {
    throw new Error('Routes não definiu uma rota')
  }
  // atribuir ROTAS
  ROUTES = routes;
}

const renderView = (pathname, props = {}) => {
  // limpa o elemento raiz
  rootEl.textContent = "";
  let path = "";
  // encontra a visualização correta em ROUTES para o nome do caminho
  if (pathname in ROUTES) {
    path = pathname;
  }
  // caso não seja encontrado renderiza a view do erro
  else (
    path = ERRORPATH
  )
  // renderiza a view correta passando o valor das props e adiciona o elemento view ao elemento raiz do DOM
  rootEl.appendChild(ROUTES[path](props));
}

export const onURLChange = (location) => {
  console.log("Chamou a onURLChange");
  // analisa a localização do nome do caminho e dos parâmetros de pesquisa
  // converte os parâmetros de pesquisa em um objeto
  const props =queryStringToObject(location.search);

  // renderiza a view com o caminho e o objeto
  renderView(location.pathname, props);

}

export const navigateTo = (pathname, props = {}) => {
  //atualiza o histórico da janela com pushState
  // renderiza a view com o nome do caminho e props
}
const queryStringToObject = (queryString) => {
  let props = {};
  //converte a string de consulta em URLSearchParams
  //converte URLSearchParams em um objeto
  
  //retorna o objeto
  return props;
}