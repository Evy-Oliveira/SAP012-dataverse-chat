import { communicateWithOpenAI } from "../src/lib/openAiApi";
/* eslint-disable */
// global.fetch = jest.fn().mockResolvedValue({
//     status: 200, json: jest.fn().mockResolvedValue({})
// });

describe('Testes da função de comunicação com a OpenAi', () => {

  it('Testa se existe falha na comunicação com a API', async () => {
    const mockMessages = [{ role: 'user', content: 'Olá' }];
    const mockError = new Error('Falha na conexão com a Api');
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(communicateWithOpenAI(mockMessages)).rejects.toThrow(mockError);
  });

  it('Testa Chave API fornecida', async () => {
    const mockMessages = [{role: 'user', content: 'Olá'}];
    const mockError = new Error('Chave API fornecida incorreta');
    global.fetch = jest.fn().mockResolvedValue({
      ok: false, status:401,
    });
    await expect(communicateWithOpenAI(mockMessages)).rejects.toThrow(mockError);
  });

  it('Testa o limite de requisições', async () => {
    const mockMessages = [{role: 'user', content: 'Olá'}];
    const mockError = new Error('Limite de requisições atingido');
    global.fetch = jest.fn().mockResolvedValue({
      ok: false, status:429,
    });
    await expect(communicateWithOpenAI(mockMessages)).rejects.toThrow(mockError);
  });

  it('Teste de erro interno do servidor', async () => {
    const mockMessages = [{role: 'user', content: 'Olá'}];
    const mockError = new Error('Erro interno do servidor');
    global.fetch = jest.fn().mockResolvedValue({
      ok: false, status:500,
    });
    await expect(communicateWithOpenAI(mockMessages)).rejects.toThrow(mockError);
  });
  
 it('Simula sucesso na comunicação com Api', async () => {
    const mockMessages = [{ role: 'user', content: 'Olá' }];
    const mockData = { choices: [{ message: { content: 'Olá, como vai?' } }] }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const response = await communicateWithOpenAI(mockMessages);
    expect(response).toEqual(mockData);
  });
});

