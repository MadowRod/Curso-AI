import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((atual) => ({ ...atual, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErro('');

    try {
      const response = await authApi.register(form);
      login(response.data);
      navigate('/');
    } catch (error) {
      const mensagem = error.response?.data?.message;
      setErro(mensagem || 'Não foi possível criar a conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page auth-page">
      <div className="page-header">
        <h2>Cadastro de Usuário</h2>
        <p className="page-subtitle">Crie sua conta para gerenciar veículos</p>
      </div>

      <form className="form-card auth-form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            minLength={6}
            required
          />
        </label>

        {erro && <p className="error">{erro}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="auth-link">
          Já possui conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
