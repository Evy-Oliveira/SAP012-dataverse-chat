import { getApiKey } from './apikey.js';

export const communicateWithOpenAI = async (messages) => {
  const url = 'https://api.openai.com/v1/chat/completions';
  const api = "Bearer " + getApiKey();

  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': api
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 1,
      messages
    }),
  }

  const response = await fetch(url, req);

  if (!response.ok) {
    if(response.status === 401) throw new Error('Chave API fornecida incorreta');
    if(response.status === 429) throw new Error('Limite de requisições atingido');
    if(response.status === 500) throw new Error('Erro interno do servidor');
    throw new Error('Falha na conexão com a Api');

  }

  const data = await response.json();
  return data;

};