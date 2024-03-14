import { filterBy, sortBy, computeStats, filterById } from '../src/lib/dataFunctions.js';
import { data as fakeData, mockCrescente, mockDecrescente } from './data.js';

describe('FilterById', () => {
  const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ];
  it('Fitrar item pelo ID', () => {
    const id = 2;
    const result = filterById(data, id);
    expect(result).toEqual({ id: 2, name: 'Item 2' });

  });
  it('Retorna indefinido para ID inexistente', () => {
    const id = 3;
    const result = filterById(data, id);

    expect(result).toBeUndefined();
  });
  it('Deve retornar indefinido para lista vazia', () => {
    const data = []; // lista de dados vazia
    const id = 1;
    const result = filterById(data, id);

    expect(result).toBeUndefined();
  });

});

describe('filterBy', () => {
  it('filtra dados por plataforma de streaming', () => {
    fakeData.length;

    const filteredData = filterBy(fakeData, 'streaming', 'Netflix');
    expect(filteredData.every(item => item.extraInfo.streaming === 'Netflix')).toBe(true);
  });
  it('filtra dados por plataforma de streaming Crunchyroll', () => {
    const filteredData = filterBy(fakeData, 'streaming', 'Crunchyroll');
    expect(filteredData.every(item => item.extraInfo.streaming === 'Crunchyroll')).toBe(true);
  });
  it('filtra dados por plataforma de streaming Star+', () => {
    const filteredData = filterBy(fakeData, 'streaming', 'Star+');
    expect(filteredData.every(item => item.extraInfo.streaming === 'Star+')).toBe(true);

  });
  it('Retornar array vazio quando não há correspondências', () => {
    const filteredData = filterBy(fakeData, 'streaming', 'Disney+');
    expect(filteredData.every(item => item.extraInfo.streaming === 'Disney+')).toBe(true);
  });

});
describe('computeStats', () => {
  it('Calculando as estatisticas de acordo com a classificação', () => {
    const resultado = computeStats(fakeData);
    const resultadoEsperado = {
      L: 20.0,
      A12: 20.0,
      A14: 20.0,
      A16: 40.0,
    }
    expect(resultado).toEqual(resultadoEsperado);
  });
  it('A soma das porcentagens deve ser 100', () => {
    const resultado = computeStats(fakeData);
    let somaPorcentagens = 0;
    for (const classificacao in resultado) {
      somaPorcentagens += resultado[classificacao];
    }
    expect(somaPorcentagens).toBe(100);
  })
});

describe('sortBy', () => {

  it('ordenação de dados pelos os anime de A-Z', () => {
    const ordenarData = sortBy(fakeData, 'name', 'asc')

    expect(ordenarData).toStrictEqual(mockCrescente);
  });
  it('ordenação de dados pelos os animes de Z-A', () => {
    const ordenarData = sortBy(fakeData, 'name', 'desc')
    expect(ordenarData).toStrictEqual(mockDecrescente);
  })
});