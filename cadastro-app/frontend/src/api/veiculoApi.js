import api from './api';

export const veiculoApi = {
  listar: (busca = '') => api.get('/veiculos', { params: busca ? { busca } : {} }),
  buscarPorId: (id) => api.get(`/veiculos/${id}`),
  criar: (veiculo) => api.post('/veiculos', veiculo),
  atualizar: (id, veiculo) => api.put(`/veiculos/${id}`, veiculo),
  excluir: (id) => api.delete(`/veiculos/${id}`),
};
