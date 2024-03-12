import { communicateWithOpenAI } from "../src/lib/openAiApi";
/* eslint-disable */
// global.fetch = jest.fn().mockResolvedValue({
//     status: 200, json: jest.fn().mockResolvedValue({})
// });

// describe('Testes para a Comunicação com OpenAi', () => {

//     it('Teste de sucesso na comunicação com a API', async () => {
//         const mockMessages = [{ role: 'user', content: 'Olá' }];
//         const mockData = { choices: [{ message: { content: 'Olá! Tudo bem?' } }] };
//         global.fetch = jest.fn().mockResolvedValue({
//             ok: true,
//             json: () => Promise.resolve(mockData),
//         });

//         const response = await communicateWithOpenAI(mockMessages);
//         expect(response).toEqual(mockData);
//     });
// });
