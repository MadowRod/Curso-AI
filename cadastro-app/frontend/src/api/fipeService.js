import axios from 'axios';

const fipeApi = axios.create({
  baseURL: 'https://api.fipe.online/api/v2',
});

export async function fetchMarcasFipe() {
  const { data } = await fipeApi.get('/cars/brands');
  return data;
}

export async function fetchModelosFipe(brandId) {
  const { data } = await fipeApi.get(`/cars/brands/${brandId}/models`);
  return data;
}

export async function fetchAnosFipe(brandId, modelId) {
  const { data } = await fipeApi.get(`/cars/brands/${brandId}/models/${modelId}/years`);
  return data;
}

export async function fetchPrecoFipe(brandId, modelId, yearCode) {
  const { data } = await fipeApi.get(
    `/cars/brands/${brandId}/models/${modelId}/years/${yearCode}`,
  );
  return data;
}

export function parsePrecoFipe(precoTexto) {
  if (!precoTexto) {
    return '';
  }

  const numerico = precoTexto
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim();

  const valor = Number(numerico);
  return Number.isNaN(valor) ? '' : String(valor);
}

export async function sugerirDadosFipe(brandId, modelId, yearCode) {
  const dados = await fetchPrecoFipe(brandId, modelId, yearCode);

  return {
    marca: dados.brand,
    modelo: dados.model,
    ano: dados.modelYear,
    preco: parsePrecoFipe(dados.price),
    precoFormatado: dados.price,
    referencia: dados.referenceMonth,
  };
}

export default fipeApi;
