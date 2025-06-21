import React, { useState } from 'react';

function BookSearchBar({ onSearch, types }) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search, type);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4 bg-gray-100 p-6 rounded mb-6 shadow">
      <input
        type="text"
        placeholder="Search for books by title or author..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded"
      />
      <select
        value={type}
        onChange={e => setType(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded"
      >
        <option value="">All Types</option>
        {types.map((t, idx) => (
          <option key={idx} value={t}>{t}</option>
        ))}
      </select>
      <button
        type="submit"
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold"
      >
        Search
      </button>
    </form>
  );
}

export default BookSearchBar;