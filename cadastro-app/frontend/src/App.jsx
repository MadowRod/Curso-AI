import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import VeiculoList from './pages/VeiculoList';
import VeiculoForm from './pages/VeiculoForm';
import VeiculoDetail from './pages/VeiculoDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <VeiculoList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cadastro"
                element={
                  <ProtectedRoute>
                    <VeiculoForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/editar/:id"
                element={
                  <ProtectedRoute>
                    <VeiculoForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/veiculos/:id"
                element={
                  <ProtectedRoute>
                    <VeiculoDetail />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
