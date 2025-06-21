import React, { useState } from 'react';
import Header from '../components/layout/header';
import ReaderInfo from '../components/common/reader/readerInfo';
import ReaderReservations from '../components/common/reader/readerReservations';
import ReaderFines from '../components/common/reader/readerFines';

function Reader() {
    const [user, setUser] = useState(null);
    const [view, setView] = useState('info');
    const [loading, setLoading] = useState(false);
    const [emailInput, setEmailInput] = useState('');


    const handleToggleUserState = async () => {
        if (!user) return;
        setLoading(true);
        try {
            await fetch(`http://localhost:8085/api/user/editState/${user.email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ state: !user.state })
            });
            setUser({ ...user, state: !user.state });
        } catch (err) {
            throw new Error('Error al cambiar el estado del usuario');
        } finally {
            setLoading(false);
        }
    };


    const fetchUserByEmail = async (email) => {
        setLoading(true);
        setUser(null);
        try {
            const res = await fetch(`http://localhost:8085/api/user/email/${email.trim()}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            setUser(data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (emailInput.trim()) {
            fetchUserByEmail(emailInput);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="max-w-3xl mx-auto p-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Datos del Lector</h2>
                <form onSubmit={handleEmailSubmit} className="flex gap-4 mb-8">
                    <input
                        type="email"
                        placeholder="Buscar por email"
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                        disabled={loading || !emailInput.trim()}
                    >
                        Buscar
                    </button>
                </form>
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                    <button
                        className={`px-8 py-4 border rounded-md font-semibold text-gray-700 transition ${view === 'info' ? 'border-blue-500 bg-blue-50' : 'border-gray-400 hover:bg-gray-100'}`}
                        onClick={() => setView('info')}
                    >
                        DATOS LECTOR
                    </button>
                    <button
                        className={`px-8 py-4 border rounded-md font-semibold text-gray-700 transition ${view === 'reservations' ? 'border-blue-500 bg-blue-50' : 'border-gray-400 hover:bg-gray-100'}`}
                        onClick={() => setView('reservations')}
                    >
                        RESERVAS
                    </button>
                    <button
                        className={`px-8 py-4 border rounded-md font-semibold text-gray-700 transition ${view === 'fines' ? 'border-blue-500 bg-blue-50' : 'border-gray-400 hover:bg-gray-100'}`}
                        onClick={() => setView('fines')}
                    >
                        MULTAS
                    </button>
                </div>
                <div>
                    {loading && <div className="text-gray-500">Cargando...</div>}
                    {!loading && user && view === 'info' && (
                        <ReaderInfo user={user} onToggleState={handleToggleUserState} />
                    )}
                    {!loading && user && view === 'reservations' && <ReaderReservations email={user.email} />}
                    {!loading && user && view === 'fines' && <ReaderFines email={user.email} />}
                </div>
            </div>
        </div>
    );
}

export default Reader;