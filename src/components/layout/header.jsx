import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-slate-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">
            Book<span className="text-red-500">Hub</span>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </li>
            <li>
              <Link to="/new-book" className="hover:text-gray-300">Agregar libro</Link>
            </li>
            <li>
              <Link to="/prestamo" className="hover:text-gray-300">Préstamo</Link>
            </li>
            <li>
              <Link to="/devolucion" className="hover:text-gray-300">Devolución</Link>
            </li>
            <li>
              <Link to="/lector" className="hover:text-gray-300">Lector</Link>
            </li>
            <li>
              <Link to="/salir" className="hover:text-gray-300">Salir</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;