import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AddBookCopyForm = () => {
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchingBooks, setFetchingBooks] = useState(true);
    
    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/book/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar los libros');
            }

            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
            toast.error('No se pudieron cargar los libros. Intente nuevamente.');
        } finally {
            setFetchingBooks(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const bookCopy = {
                book_fk: parseInt(selectedBookId),
                state: true
            };
            console.log('Creating book copy:', bookCopy);
            const response = await fetch('http://localhost:8085/copyBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookCopy)
            });

            if (!response.ok) {
                console.error('Error creating book copy:', response.statusText);
                throw new Error('Error al crear la copia');
            }

            const savedCopy = await response.json();
            console.log('Copia de libro guardada:', savedCopy);
            toast.success('¡Copia de libro creada exitosamente!');


        } catch (error) {
            toast.error(`Error: ${error.message}`);
            console.error('Error creating book copy:', error);
        } finally {
            setLoading(false);
        }
    };

    const getSelectedBookTitle = () => {
        const book = books.find(book => book.id === selectedBookId);
        return book ? book.title : '';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Agregar Copia de Libro</h2>

            {fetchingBooks ? (
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Cargando libros...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">
                            Selecciona un Libro
                        </label>
                        <select
                            id="bookId"
                            value={selectedBookId}
                            onChange={(e) => setSelectedBookId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">-- Selecciona un libro --</option>
                            {books.map(book => (
                                <option key={book.id_book} value={book.id_book}>
                                    {book.id_book}: {book.title} - {book.author}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedBookId && (
                        <div className="rounded-md bg-blue-50 p-4 mt-4">
                            <div className="flex">
                                <div className="ml-3 flex-1 md:flex md:justify-between">
                                    <p className="text-sm text-blue-700">
                                        <strong>Se creará una copia de:</strong> {getSelectedBookTitle()}
                                    </p>
                                    <p className="mt-3 text-sm md:mt-0 md:ml-6">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                                            Estado: Disponible
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading || !selectedBookId}
                            className={`w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${(loading || !selectedBookId) ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creando copia...' : 'Crear Copia'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddBookCopyForm;