import React, { useEffect, useState } from 'react';
import { formatDate } from '../../../lib';



function ReaderReservations({ email }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8085/api/booking/email/${email}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [email]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-bold mb-4 text-lg text-blue-700">Reservas</h3>
      {loading && <div className="text-gray-500">Cargando reservas...</div>}
      {!loading && reservations.length === 0 && <div className="text-gray-500">No hay reservas.</div>}
      {!loading && reservations.length > 0 && (
        <ul className="space-y-4">
          {reservations.map(r => (
            <li key={r.id_booking} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-gray-50">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <div className="font-semibold text-lg text-gray-800">{r.title}</div>
                  <div className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Autor:</span> {r.author}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Tipo:</span> {r.type}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Copia:</span> {r.copyId}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Email:</span> {r.email}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">ID Reserva:</span> {r.id_booking}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Estado:</span>{" "}
                    {r.state
                      ? <span className="inline-block px-2 py-1  bg-red-100 text-red-700 rounded text-xs font-semibold">Prestado</span>
                      : <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Devuelto</span>
                    }
                  </div>
                </div>
                <div className="text-right md:min-w-[180px]">
                  <div className="text-xs text-gray-400">Fecha préstamo:</div>
                  <div className="font-mono text-blue-700">{formatDate(r.date_booking)}</div>
                  <div className="text-xs text-gray-400 mt-2">Fecha devolución:</div>
                  <div className="font-mono text-green-700">{r.date_return ? formatDate(r.date_return) : '-'}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReaderReservations;