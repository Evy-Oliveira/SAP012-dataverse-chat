import { getApiKey, setApiKey } from '../src/lib/apikey.js';

const mockApiKey = "123abc";
const APIKEY = "apikey-value";
// const localStorageMock = {}

describe('ApiKey Functions', () => {

  it('Deve definir corretamente o valor da chave API', () => {
    setApiKey(mockApiKey);
    expect(localStorage.getItem(APIKEY)).toEqual(mockApiKey)
  });

  it('Deve devolver o valor da chave API', () => {
    expect(getApiKey()).toEqual(mockApiKey);
  });
});
