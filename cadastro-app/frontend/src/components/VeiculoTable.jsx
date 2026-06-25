import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function formatarKm(km) {
  return `${Number(km).toLocaleString('pt-BR')} km`;
}

function VeiculoTable({ veiculos, onDelete, loading }) {
  if (loading) {
    return <p className="message">Carregando veículos...</p>;
  }

  if (veiculos.length === 0) {
    return <p className="message">Nenhum veículo encontrado.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.id}>
              <td>{veiculo.id}</td>
              <td>{veiculo.marca}</td>
              <td>{veiculo.modelo}</td>
              <td>{veiculo.ano}</td>
              <td>
                <span className="badge">{veiculo.categoria}</span>
              </td>
              <td>{formatarPreco(veiculo.preco)}</td>
              <td className="actions">
                <Link to={`/veiculos/${veiculo.id}`} className="btn btn-small btn-outline">
                  Detalhes
                </Link>
                <Link to={`/editar/${veiculo.id}`} className="btn btn-small">
                  Editar
                </Link>
                <button
                  type="button"
                  className="btn btn-small btn-danger"
                  onClick={() => onDelete(veiculo.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { formatarPreco, formatarKm };
export default VeiculoTable;
