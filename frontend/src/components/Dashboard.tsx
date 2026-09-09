// src/components/Dashboard.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar tokens/sesión
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </header>
      
      <main className="dashboard-content">
        <h2>Bienvenido al Panel de Control</h2>
        <p>Aquí verás tu contenido personalizado según tu rol</p>
      </main>
    </div>
  );
};

export default Dashboard;