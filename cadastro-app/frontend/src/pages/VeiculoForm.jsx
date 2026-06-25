import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { veiculoApi } from '../api/veiculoApi';
import {
  fetchAnosFipe,
  fetchMarcasFipe,
  fetchModelosFipe,
  sugerirDadosFipe,
} from '../api/fipeService';
import { formatarKm, formatarPreco } from '../components/VeiculoTable';

const CATEGORIAS = ['Sedan', 'SUV', 'Hatch', 'Pickup', 'Esportivo', 'Utilitário'];

const formInicial = {
  marca: '',
  modelo: '',
  ano: '',
  cor: '',
  preco: '',
  quilometragem: '',
  categoria: 'Sedan',
};

function VeiculoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form, setForm] = useState(formInicial);
  const [loading, setLoading] = useState(editando);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [fipeInfo, setFipeInfo] = useState('');

  const [marcasFipe, setMarcasFipe] = useState([]);
  const [modelosFipe, setModelosFipe] = useState([]);
  const [anosFipe, setAnosFipe] = useState([]);
  const [fipeSelecao, setFipeSelecao] = useState({ brandId: '', modelId: '', yearCode: '' });
  const [carregandoFipe, setCarregandoFipe] = useState(false);

  useEffect(() => {
    fetchMarcasFipe()
      .then(setMarcasFipe)
      .catch(() => setFipeInfo('FIPE indisponível no momento.'));
  }, []);

  useEffect(() => {
    if (!editando) {
      return;
    }

    const carregarVeiculo = async () => {
      try {
        setLoading(true);
        const response = await veiculoApi.buscarPorId(id);
        const veiculo = response.data;
        setForm({
          marca: veiculo.marca,
          modelo: veiculo.modelo,
          ano: String(veiculo.ano),
          cor: veiculo.cor,
          preco: String(veiculo.preco),
          quilometragem: String(veiculo.quilometragem),
          categoria: veiculo.categoria,
        });
      } catch (error) {
        setErro('Não foi possível carregar o veículo para edição.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    carregarVeiculo();
  }, [editando, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((atual) => ({ ...atual, [name]: value }));
  };

  const handleFipeSelecao = async (event) => {
    const { name, value } = event.target;
    const novaSelecao = { ...fipeSelecao, [name]: value };

    if (name === 'brandId') {
      novaSelecao.modelId = '';
      novaSelecao.yearCode = '';
      setModelosFipe([]);
      setAnosFipe([]);
      if (value) {
        const modelos = await fetchModelosFipe(value);
        setModelosFipe(modelos);
      }
    }

    if (name === 'modelId') {
      novaSelecao.yearCode = '';
      setAnosFipe([]);
      if (value && novaSelecao.brandId) {
        const anos = await fetchAnosFipe(novaSelecao.brandId, value);
        setAnosFipe(anos);
      }
    }

    setFipeSelecao(novaSelecao);
  };

  const aplicarSugestaoFipe = async () => {
    const { brandId, modelId, yearCode } = fipeSelecao;

    if (!brandId || !modelId || !yearCode) {
      setFipeInfo('Selecione marca, modelo e ano na FIPE.');
      return;
    }

    try {
      setCarregandoFipe(true);
      setFipeInfo('');
      const sugestao = await sugerirDadosFipe(brandId, modelId, yearCode);

      setForm((atual) => ({
        ...atual,
        marca: sugestao.marca,
        modelo: sugestao.modelo,
        ano: String(sugestao.ano),
        preco: sugestao.preco,
      }));

      setFipeInfo(`Sugestão FIPE (${sugestao.referencia}): ${sugestao.precoFormatado}`);
    } catch (error) {
      setFipeInfo('Não foi possível obter sugestão da FIPE.');
      console.error(error);
    } finally {
      setCarregandoFipe(false);
    }
  };

  const montarPayload = () => ({
    marca: form.marca.trim(),
    modelo: form.modelo.trim(),
    ano: Number(form.ano),
    cor: form.cor.trim(),
    preco: Number(form.preco),
    quilometragem: Number(form.quilometragem),
    categoria: form.categoria,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSalvando(true);
    setErro('');

    try {
      const payload = montarPayload();

      if (editando) {
        await veiculoApi.atualizar(id, payload);
      } else {
        await veiculoApi.criar(payload);
      }
      navigate('/');
    } catch (error) {
      const mensagem = error.response?.data?.message;
      setErro(mensagem || 'Não foi possível salvar o veículo.');
      console.error(error);
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return <p className="message">Carregando formulário...</p>;
  }

  return (
    <section className="page">
      <div className="page-header">
        <h2>{editando ? 'Editar Veículo' : 'Cadastrar Veículo'}</h2>
        <p className="page-subtitle">
          {editando ? 'Atualize as informações do veículo' : 'Adicione um novo veículo ao estoque'}
        </p>
      </div>

      <div className="fipe-panel">
        <h3>Sugestão FIPE (opcional)</h3>
        <p className="page-subtitle">Use a FIPE apenas para preencher marca, modelo, ano e preço sugerido.</p>

        <div className="form-grid fipe-grid">
          <label>
            Marca FIPE
            <select name="brandId" value={fipeSelecao.brandId} onChange={handleFipeSelecao}>
              <option value="">Selecione...</option>
              {marcasFipe.map((marca) => (
                <option key={marca.code} value={marca.code}>
                  {marca.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Modelo FIPE
            <select
              name="modelId"
              value={fipeSelecao.modelId}
              onChange={handleFipeSelecao}
              disabled={!fipeSelecao.brandId}
            >
              <option value="">Selecione...</option>
              {modelosFipe.map((modelo) => (
                <option key={modelo.code} value={modelo.code}>
                  {modelo.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Ano FIPE
            <select
              name="yearCode"
              value={fipeSelecao.yearCode}
              onChange={handleFipeSelecao}
              disabled={!fipeSelecao.modelId}
            >
              <option value="">Selecione...</option>
              {anosFipe.map((ano) => (
                <option key={ano.code} value={ano.code}>
                  {ano.name}
                </option>
              ))}
            </select>
          </label>

          <div className="fipe-action">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={aplicarSugestaoFipe}
              disabled={carregandoFipe}
            >
              {carregandoFipe ? 'Consultando FIPE...' : 'Aplicar sugestão FIPE'}
            </button>
          </div>
        </div>

        {fipeInfo && <p className="fipe-info">{fipeInfo}</p>}
      </div>

      <form className="form-card form-grid" onSubmit={handleSubmit}>
        <label>
          Marca
          <input type="text" name="marca" value={form.marca} onChange={handleChange} required />
        </label>

        <label>
          Modelo
          <input type="text" name="modelo" value={form.modelo} onChange={handleChange} required />
        </label>

        <label>
          Ano
          <input
            type="number"
            name="ano"
            value={form.ano}
            onChange={handleChange}
            min="1900"
            max="2100"
            required
          />
        </label>

        <label>
          Cor
          <input type="text" name="cor" value={form.cor} onChange={handleChange} required />
        </label>

        <label>
          Preço (R$)
          <input
            type="number"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </label>

        <label>
          Quilometragem
          <input
            type="number"
            name="quilometragem"
            value={form.quilometragem}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <label className="full-width">
          Categoria
          <select name="categoria" value={form.categoria} onChange={handleChange} required>
            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </label>

        {erro && <p className="error full-width">{erro}</p>}

        <div className="form-actions full-width">
          <Link to="/" className="btn btn-secondary">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default VeiculoForm;
