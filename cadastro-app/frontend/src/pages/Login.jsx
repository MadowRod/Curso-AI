import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', senha: '' });
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
      const response = await authApi.login(form);
      login(response.data);
      const destino = location.state?.from || '/';
      navigate(destino);
    } catch (error) {
      const mensagem = error.response?.data?.message;
      setErro(mensagem || 'Não foi possível realizar o login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page auth-page">
      <div className="page-header">
        <h2>Login</h2>
        <p className="page-subtitle">Acesse o sistema da concessionária</p>
      </div>

      <form className="form-card auth-form" onSubmit={handleSubmit}>
        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@admin.com"
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
            placeholder="admin123"
            required
          />
        </label>

        {erro && <p className="error">{erro}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="auth-link">
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
