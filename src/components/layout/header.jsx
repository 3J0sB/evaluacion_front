import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context.jsx';
import { jwtDecode } from 'jwt-decode';

const Header = () => {

  const routes = [];
  routes.push({ to: '/', label: 'Home' });
  routes.push({ to: '/about', label: 'About' });
  routes.push({ to: '/new-book', label: 'Agregar libro' });
  routes.push({ to: '/prestamo', label: 'Préstamo' });
  routes.push({ to: '/devolucion', label: 'Devolución' });
  routes.push({ to: '/lector', label: 'Lector' });
  routes.push({ to: '/my-bookings', label: 'Mis reservas' });

  const contexto = useContext(AuthContext);
  const navigate = useNavigate();

  let token;
  if (contexto.token) {
    const decodeToken = jwtDecode(contexto.token);
    if(decodeToken.sub.includes('USER')){
      routes.splice(0, routes.length);
      routes.push({ to: '/', label: 'Home' });
      routes.push({ to: '/about', label: 'About' });
      routes.push({ to: '/my-bookings', label: 'Mis reservas' });
    }else if(decodeToken.sub.includes('ADMIN')){
      routes.splice(0, routes.length);
      routes.push({ to: '/', label: 'Home' });
      routes.push({ to: '/about', label: 'About' });
      routes.push({ to: '/new-book', label: 'Agregar libro' });
      routes.push({ to: '/prestamo', label: 'Préstamo' });
      routes.push({ to: '/devolucion', label: 'Devolución' });
      routes.push({ to: '/lector', label: 'Lector' });
    }
  }else{
      routes.splice(0, routes.length);
      routes.push({ to: '/', label: 'Home' });
      routes.push({ to: '/about', label: 'About' });
      routes.push({ to: '/login', label: 'Iniciar Sesión' });
      routes.push({ to: '/register', label: 'Registrarse' });
  }


  const handleLogout = () => {
    contexto.logout();
    navigate('/login');
  };

  return (
    <header className="bg-slate-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">
            Book<span className="text-red-500">Hub</span>
          </Link>
        </div>
        <nav className="flex gap-6 justify-center items-center">
          {routes.map(route => (
            <Link
              key={route.to}
              to={route.to}
              className="text-white hover:text-red-400 transition font-medium"
            >
              {route.label}
            </Link>
          ))}
          {contexto.token ? (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold shadow"
              onClick={handleLogout}
            >
              SALIR
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Header;