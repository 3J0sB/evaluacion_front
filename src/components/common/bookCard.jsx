import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const { id, title, author, category, coverImage } = book;

  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition-shadow">
      <Link to={`/book/${id}`}>
        <div className="overflow-hidden h-48">
          <img 
            src={coverImage || 'img/miau.jpg'} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm">by {author}</p>
          <span className="inline-block text-sm bg-gray-100 px-2 py-1 mt-2 text-gray-600 rounded">
            {category}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;