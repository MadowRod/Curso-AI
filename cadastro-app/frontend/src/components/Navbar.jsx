import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <h1 className="logo">Concessionária AutoPrime</h1>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/">Veículos</Link>
              <Link to="/cadastro" className="btn btn-primary">
                Novo Veículo
              </Link>
              <span className="navbar-user">Olá, {user?.nome}</span>
              <button type="button" className="btn btn-secondary" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-primary">
                Cadastrar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
