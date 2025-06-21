import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const roles = [
    { value: 1, label: 'Usuario' },
    { value: 2, label: 'Administrador' },
];

function RegisterForm() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        name: '',
        lastName: '',
        password: '',
        rolId: 1,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'rolId' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8085/auth/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                setError('Error al registrar usuario');
                setLoading(false);
                return;
            }
            setSuccess('Usuario registrado correctamente');
            navigate('/login');
            setForm({
                email: '',
                name: '',
                lastName: '',
                password: '',
                rolId: 1,
            });
        } catch {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-gray-700 mb-1">Correo electrónico</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1">Apellido</label>
                <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1">Rol</label>
                <select
                    name="rolId"
                    value={form.rolId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                    {roles.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                </select>
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
            >
                {loading ? 'Registrando...' : 'Registrarse'}
            </button>
            <div className='text-center '>
                <span>Ya tienes cuenta?</span><Link to={"/login"} className='text-blue-600'> Ingresa</Link>
            </div>
        </form>
    );
}

export default RegisterForm;