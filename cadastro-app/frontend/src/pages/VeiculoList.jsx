import { useEffect, useState } from 'react';
import { veiculoApi } from '../api/veiculoApi';
import SearchBar from '../components/SearchBar';
import VeiculoTable from '../components/VeiculoTable';

function VeiculoList() {
  const [veiculos, setVeiculos] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const carregarVeiculos = async (termo = busca) => {
    try {
      setLoading(true);
      setErro('');
      const response = await veiculoApi.listar(termo);
      setVeiculos(response.data);
    } catch (error) {
      setErro('Não foi possível carregar os veículos.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarVeiculos('');
  }, []);

  const handleSearch = () => {
    carregarVeiculos(busca);
  };

  const handleDelete = async (id) => {
    const confirmar = window.confirm('Deseja realmente excluir este veículo?');
    if (!confirmar) {
      return;
    }

    try {
      await veiculoApi.excluir(id);
      await carregarVeiculos(busca);
    } catch (error) {
      setErro('Não foi possível excluir o veículo.');
      console.error(error);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <h2>Listagem de Veículos</h2>
        <p className="page-subtitle">Gerencie o estoque da concessionária</p>
      </div>

      <SearchBar value={busca} onChange={setBusca} onSearch={handleSearch} />

      {erro && <p className="error">{erro}</p>}

      {!loading && !erro && (
        <p className="results-count">{veiculos.length} veículo(s) encontrado(s)</p>
      )}

      <VeiculoTable veiculos={veiculos} onDelete={handleDelete} loading={loading} />
    </section>
  );
}

export default VeiculoList;
