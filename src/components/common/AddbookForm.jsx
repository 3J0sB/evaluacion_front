import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddBookForm = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        type: '',
        image64: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setBook(prev => ({
                ...prev,
                image64: base64String
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!book.title || !book.author || !book.type) {
            toast.error('Por favor completa todos los campos requeridos');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:8085/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book)
            });

            if (!response.ok) {
                throw new Error('Error al guardar el libro');
            }

            const savedBook = await response.json();
            console.log('Libro guardado:', savedBook);
            toast.success('¡Libro guardado exitosamente!');


            setBook({
                title: '',
                author: '',
                type: '',
                image64: ''
            });

        } catch (error) {
            toast.error(`Error: ${error.message}`);
            console.error('Error saving book:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Agregar Nuevo Libro</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                        Autor
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Tipo
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={book.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Selecciona un tipo</option>
                        <option value="Fiction">Ficción</option>
                        <option value="Non-Fiction">No Ficción</option>
                        <option value="Fantasy">Fantasía</option>
                        <option value="Science Fiction">Ciencia Ficción</option>
                        <option value="Mystery">Misterio</option>
                        <option value="Biography">Biografía</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Portada del Libro
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            disabled 
                            onChange={handleImageChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {book.image64 && (
                            <div className="h-16 w-16 overflow-hidden rounded-md">
                                <img
                                    src={book.image64}
                                    alt="Vista previa"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Guardando...' : 'Guardar Libro'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBookForm;