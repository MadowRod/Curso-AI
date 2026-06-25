import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { veiculoApi } from '../api/veiculoApi';
import { formatarKm, formatarPreco } from '../components/VeiculoTable';
import { FALLBACK_IMAGE, getVehicleImageUrl } from '../utils/vehicleImage';

function VeiculoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [veiculo, setVeiculo] = useState(null);
  const [imageSrc, setImageSrc] = useState(FALLBACK_IMAGE);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarVeiculo = async () => {
      try {
        setLoading(true);
        setErro('');
        const response = await veiculoApi.buscarPorId(id);
        setVeiculo(response.data);
        setImageSrc(getVehicleImageUrl(response.data.marca, response.data.modelo));
      } catch (error) {
        setErro('Veículo não encontrado.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    carregarVeiculo();
  }, [id]);

  const handleDelete = async () => {
    const confirmar = window.confirm('Deseja realmente excluir este veículo?');
    if (!confirmar) {
      return;
    }

    try {
      await veiculoApi.excluir(id);
      navigate('/');
    } catch (error) {
      setErro('Não foi possível excluir o veículo.');
      console.error(error);
    }
  };

  if (loading) {
    return <p className="message">Carregando detalhes...</p>;
  }

  if (erro || !veiculo) {
    return (
      <section className="page">
        <p className="error">{erro || 'Veículo não encontrado.'}</p>
        <Link to="/" className="btn btn-secondary">
          Voltar
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="detail-hero">
        <img
          src={imageSrc}
          alt={`${veiculo.marca} ${veiculo.modelo}`}
          className="detail-hero-image"
          onError={() => setImageSrc(FALLBACK_IMAGE)}
        />
      </div>

      <div className="page-header">
        <h2>
          {veiculo.marca} {veiculo.modelo}
        </h2>
        <p className="page-subtitle">Detalhes do veículo #{veiculo.id}</p>
      </div>

      <div className="detail-grid">
        <div className="detail-item">
          <span className="detail-label">Marca</span>
          <span className="detail-value">{veiculo.marca}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Modelo</span>
          <span className="detail-value">{veiculo.modelo}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Ano</span>
          <span className="detail-value">{veiculo.ano}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Cor</span>
          <span className="detail-value">{veiculo.cor}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Categoria</span>
          <span className="detail-value">
            <span className="badge">{veiculo.categoria}</span>
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Quilometragem</span>
          <span className="detail-value">{formatarKm(veiculo.quilometragem)}</span>
        </div>
        <div className="detail-item detail-highlight">
          <span className="detail-label">Preço</span>
          <span className="detail-value price">{formatarPreco(veiculo.preco)}</span>
        </div>
      </div>

      <div className="form-actions">
        <Link to="/" className="btn btn-secondary">
          Voltar
        </Link>
        <Link to={`/editar/${veiculo.id}`} className="btn btn-primary">
          Editar
        </Link>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Excluir
        </button>
      </div>
    </section>
  );
}

export default VeiculoDetail;
