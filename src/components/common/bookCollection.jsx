import React from 'react';
import BookCard from './bookCard';

const BookCollection = ({ title, books }) => {
  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {books.map(book => ( 
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookCollection;