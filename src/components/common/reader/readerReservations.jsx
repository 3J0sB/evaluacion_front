import React, { useEffect, useState } from 'react';

function ReaderReservations({ email }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8085/api/booking/email/${email}`);
        const data = await res.json();
        console.log(data);
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
      <h3 className="font-bold mb-4 text-lg">Reservas</h3>
      {loading && <div className="text-gray-500">Cargando reservas...</div>}
      {!loading && reservations.length === 0 && <div className="text-gray-500">No hay reservas.</div>}
      {!loading && reservations.length > 0 && (
        <ul className="divide-y">
          {reservations.map(r => (
            <li key={r.id_booking} className="py-2">
              <span className="font-semibold">{r.title}</span> — {r.author} ({r.type})
              <span className="ml-2 text-xs text-gray-500">Fecha: {r.date_booking?.slice(0,10)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReaderReservations;