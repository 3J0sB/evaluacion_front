import React, { useEffect, useState } from 'react';

function ReaderFines({ email }) {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFines = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8085/api/fine/user/${email}`);
        const data = await res.json();
        setFines(data);
      } catch (err) {
        setFines([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFines();
  }, [email]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-bold mb-4 text-lg">Multas</h3>
      {loading && <div className="text-gray-500">Cargando multas...</div>}
      {!loading && fines.length === 0 && <div className="text-gray-500">No hay multas.</div>}
      {!loading && fines.length > 0 && (
        <ul className="divide-y">
          {fines.map(f => (
            <li key={f.id_fine} className="py-2">
              <span className="font-semibold">Monto:</span> ${f.amount} — {f.description}
              <span className="ml-2 text-xs text-gray-500">{f.state ? 'Pendiente' : 'Pagada'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReaderFines;