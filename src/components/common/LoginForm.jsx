import React, { useContext, useState } from 'react';
import { AuthContext } from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const contexto = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8085/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!res.ok) {
                setError('Usuario o contraseña incorrectos');
                setLoading(false);
                return;
            }
            const data = await res.json();

            await contexto.saveToken(data.token);
            console.log(contexto.token);
            const token = jwtDecode(contexto.token);
            const email = token.sub.split('#')[0];
            console.log(token);
            console.log(email);
            localStorage.setItem('userId', email);
            navigate('/');
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-gray-700 mb-1">Usuario</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1">Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
            >
                {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
            <div className='text-center '>
                <span>No tienes cuenta?</span><Link to={"/register"} className='text-blue-600'> Registrate</Link>
            </div>

        </form>
    );
}

export default LoginForm;