
const APIKEY = "apikey-value"
export const getApiKey = () => {
    // Vai no armazenamento local do navegador, pega a chave api que esta armazenado no localStorage e retorna a chave
    const apiKey = localStorage.getItem(APIKEY)

    return apiKey;
    
};
 export const setApiKey = (key) => {
   //coloca a  API KEY no armazenamento local
   localStorage.setItem(APIKEY, key);

 };