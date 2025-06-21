import React, { useState } from 'react';
import { formatDate } from '../../lib';

const ReturnBookForm = () => {
    const [email, setEmail] = useState('');
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSearch = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setBookings([]);
        setSelectedBooking(null);

        if (!email) {
            setMessage({ type: 'error', text: 'Ingrese un email' });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8085/api/booking/email/${email}`);
            if (!res.ok) throw new Error('No se pudieron obtener los préstamos');
            const data = await res.json();
            console.log(data);
            setBookings(data);
            if (data.length === 0) {
                setMessage({ type: 'info', text: 'No hay préstamos activos para este usuario.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleReturn = async () => {
        if (!selectedBooking) {
            setMessage({ type: 'error', text: 'Seleccione un préstamo para devolver.' });
            return;
        }
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const res = await fetch(`http://localhost:8085/api/booking/${selectedBooking.id_booking}/return`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) throw new Error('No se pudo devolver el libro');
            setMessage({ type: 'success', text: '¡Libro devuelto exitosamente!' });
            setBookings(bookings.filter(b => b.id_booking !== selectedBooking.id_booking));
            setSelectedBooking(null);
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Devolución</h2>
            {message.text && (
                <div className={`mb-6 p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                    message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSearch} className="flex gap-4 mb-8">
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition-colors"
                >
                    Buscar
                </button>
                <button
                    type="button"
                    onClick={handleReturn}
                    disabled={loading || !selectedBooking}
                    className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors ${(!selectedBooking || loading) ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                >
                    Devolución
                </button>
            </form>
            {bookings.length > 0 && (
                <div className="space-y-3">
                    {bookings.map((b, index) => (
                        <div
                            key={b.id_booking}
                            onClick={() => setSelectedBooking(b)}
                            className={`flex items-center p-4 border rounded-lg cursor-pointer shadow-sm transition-all bg-white hover:shadow-md ${selectedBooking && selectedBooking.id_booking === b.id_booking
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-gray-200'
                                }`}
                        >
                            <input
                                type="radio"
                                name="bookingSelection"
                                checked={selectedBooking && selectedBooking.id_booking === b.id_booking}
                                onChange={() => setSelectedBooking(b)}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 accent-blue-600"
                            />
                            <div className="ml-4 w-full">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <span className="block font-semibold text-gray-900 text-lg">{b.title}  copia: {b.copyId}</span>
                                        <span className="block text-gray-500 text-sm">Autor: <span className="font-medium">{b.author}</span></span>
                                        <span className="block text-gray-500 text-sm">Tipo: <span className="font-medium">{b.type}</span></span>
                                        <span className="block mt-2">
                                            Estado: {b.state
                                                ? <span className=" inline-block px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">Prestado</span>
                                                : <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Devuelto</span>
                                            }
                                        </span>

                                    </div>
                                    <div className="mt-2 md:mt-0 text-right">
                                        <span className="block text-xs text-gray-400">Fecha préstamo:</span>
                                        <span className="block font-mono text-sm text-blue-700">{formatDate(b.date_booking)}</span>
                                        <span className="block text-xs text-gray-400 mt-1">Fecha devolución:</span>
                                        <span className="block font-mono text-sm text-green-700">{b.date_return ? formatDate(b.date_return) : '-'}</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReturnBookForm;