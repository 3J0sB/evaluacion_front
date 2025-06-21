import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    const { id, title, author, type, coverImage } = book;

    return (
        <div className="bg-white rounded shadow hover:shadow-lg transition-shadow">
                <div className="overflow-hidden h-48">
                    <img
                        src={coverImage || 'img/miau.jpg'}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    
                    <div className='flex justify-between items-center mt-2'>
                        <p className="text-gray-600 text-sm">by {author}</p>
                        <span className="inline-block text-sm bg-gray-600 px-2 py-1 text-white  mt-2  rounded">
                            {type}
                        </span>
                    </div>

                </div>
        </div>
    );
};

export default BookCard;