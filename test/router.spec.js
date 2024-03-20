import { setRootEl, rootEl, setRoutes, onURLChange, navigateTo} from "../src/router";

let Routes = {
  '/error': [() => {}],
  '/home': [() => {}],
  '/about': [() => {}],
};
describe('setRootEl', () => {
  it('Deve testar se a atribuição do elemento raiz foi bem-sucedida', () => {
    const rootElement = document.createElement('div');
    setRootEl(rootElement);

    expect(rootEl).toBe(rootElement);
  });
  it('Deve testar se faz atribuição do elemento raiz se o elemento fornecido for inválido', () => {
   
    setRootEl(null); // Chama a função setRootEl com um elemento inválido (null)

    expect(rootEl).toBe(null);// Verifica se o elemento raiz ainda é null
  });

});
describe('setRoutes', () => {

  let originalRoutes;

  beforeEach(() => {
  
    originalRoutes = Routes;  // Salva as rotas originais antes de cada teste
  });

  afterEach(() => {
   
    Routes = originalRoutes;  // Restaura as rotas originais após cada teste
  });

  it('deve atribuir as rotas corretamente', () => {
    const mockRoutes = {
      '/error': [() => {}],
      '/home': [() => {}],
      '/about': [() => {}],
    };

    setRoutes(mockRoutes);

    expect(JSON.stringify(Routes)).toEqual(JSON.stringify(mockRoutes));
  });

  it('Deve testar se lança um erro se as rotas não forem um objeto', () => {
    expect(() => {
      setRoutes('não objeto');
    }).toThrow('Routes não é um objeto');
  });

  it('Deve testar se routes lança uma exceção', () => {
    const mockRoutes = {
      '/home': [() => {}],
      '/about': [() => {}],
    };
   
    expect(() => {
      setRoutes(mockRoutes);
    }).toThrow('Routes não definiu uma rota de erro');

  });

});
describe('onURLChange', () =>{
  
  let mockLocation;
  let mockErrorLocation;
  
  beforeEach(() => {
    // Simula a chamada de setRootEl com um elemento válido
    const tempRootEl = document.createElement('main');
    document.body.appendChild(tempRootEl);
    setRootEl(tempRootEl);

  
    const mockRoutes = {
      '/home': jest.fn(() =>{
        const viewHome = document.createElement('div');
        viewHome.textContent = 'home';
        return viewHome;
      }), // Simula uma função para a rota '/home'
      '/error': jest.fn(() =>{
        const viewErro = document.createElement('div');
        viewErro.textContent = 'erro';
        return viewErro;
      }), // Simula uma função para a rota '/error'

    };
    setRoutes(mockRoutes);

    mockLocation ={
      pathname:'/home',
      search:'?param1=value1&param2=value2',
    };
    mockErrorLocation ={
      pathname:'/caminhoInexistente',
      search:'?param1=value1&param2=value2',
    };
  });
  afterEach(() => {
    // Limpa o elemento raiz temporário após cada teste
    document.body.removeChild(rootEl);
  });
  it('Deve testar a localização do nome do caminho ', () => {

    onURLChange(mockLocation);
 
    const div = document.querySelector('div');
    expect(div.textContent).toBe('home');
  });
  it('Deve testar se redireciona para o pagina de erro', () => {

    onURLChange(mockErrorLocation);

    const div = document.querySelector('div');
    expect(div.textContent).toBe('erro');
  });
});
describe('navigateTo', () =>{
  let mockPushState;

  beforeEach(() => {
    mockPushState = jest.spyOn(window.history, 'pushState').mockImplementation(() => {});
  });

  afterEach(() => {
    mockPushState.mockRestore();
  });
  it('Deve testar se atualiza o historico com pushState e se funciona sem o envio do props', () =>{
    const mockPathname = '/home';

    navigateTo(mockPathname);

    expect(mockPushState).toHaveBeenCalledWith({}, null, mockPathname);
  });

  it('Deve testar se recebe as props corretamente e se renderiza a pagina correta', () =>{
    const mockRoutes = {
      '/home': jest.fn((props) =>{
        const viewHome = document.createElement('div');
        viewHome.textContent = props['param1'];
        return viewHome;
      }), // Simula uma função para a rota '/home'
      '/error': jest.fn(() =>{
        const viewErro = document.createElement('div');
        viewErro.textContent = 'erro';
        return viewErro;
      }), // Simula uma função para a rota '/error'
    };
    setRoutes(mockRoutes);

    const rootElement = document.createElement('main');
    setRootEl(rootElement);

    const mockPathname = '/home';
    const mockProps = {param1: 'value1', param2:'value2'};

    navigateTo(mockPathname, mockProps);
    const div = rootElement.querySelector('div');
    expect(div.textContent).toBe(mockProps['param1']);

  });

});