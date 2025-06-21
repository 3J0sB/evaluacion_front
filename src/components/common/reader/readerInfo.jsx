import React from 'react';

function ReaderInfo({ user, onToggleState }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
      <div className="mb-2"><span className="font-semibold">Nombre:</span> {user.name}</div>
      <div className="mb-2"><span className="font-semibold">Apellido:</span> {user.last_name}</div>
      <div className="mb-2 flex items-center gap-4">
        <span>
          <span className="font-semibold">Estado:</span>{" "}
          {user.state
            ? <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-semibold">Activo</span>
            : <span className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold">Bloqueado</span>
          }
        </span>
        {onToggleState && (
          <button
            onClick={onToggleState}
            className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-medium text-sm transition"
          >
            {user.state ? 'Bloquear' : 'Desbloquear'}
          </button>
        )}
      </div>
    </div>
  );
}

export default ReaderInfo;