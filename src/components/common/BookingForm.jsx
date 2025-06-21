import { useState } from 'react';


const BookingForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [availableBooks, setAvailableBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedCopy, setSelectedCopy] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });


  const searchBooks = async (e) => {
    e.preventDefault();
    if (!searchTitle.trim()) {
      setMessage({ type: 'error', text: 'Ingrese un título para buscar' });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8085/api/copyBook/${searchTitle}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al buscar copias del libro');
      }

      const data = await response.json();
      setAvailableBooks(data);
      setSearchPerformed(true);
      
      if (data.length === 0) {
        setMessage({ type: 'info', text: 'No se encontraron copias para este título' });
      } else {
        setMessage({ type: '', text: '' });
      }
    } catch (error) {
      console.error('Error searching books:', error);
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (e) => {
    e.preventDefault();
    
    if (!userEmail || !selectedCopy) {
      setMessage({ 
        type: 'error', 
        text: !userEmail ? 'Ingrese el email del usuario' : 'Seleccione una copia disponible' 
      });
      return;
    }

    try {
      setLoading(true);
      
   
      const loanData = {
        copybook_fk: selectedCopy.id_copybook,
date_booking: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 19),
        date_return: '',
        state: true,
        user_fk: userEmail
      };
      console.log('Creating loan with data:', loanData);

      const response = await fetch('http://localhost:8085/api/booking/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(loanData)
      });

      if (!response.ok) {
        console.error('Error creating loan:', response.statusText);
        throw new Error('Error al crear el préstamo');
      }else{
        const  copyBookState = await fetch(`http://localhost:8085/api/copyBook/${loanData.copybook_fk}/disable`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!copyBookState.ok) {
          throw new Error('Error al actualizar el estado de la copia del libro');
        }
        console.log('Estado de la copia del libro actualizado exitosamente');
        setMessage({ type: 'success', text: '¡Préstamo creado exitosamente y estado de la copia actualizado!' });
      }
      

      const result = await response.json();
      setMessage({ type: 'success', text: '¡Préstamo creado exitosamente!' });
      

      setUserEmail('');
      setSearchTitle('');
      setAvailableBooks([]);
      setSelectedCopy(null);
      setSearchPerformed(false);
      
    } catch (error) {
      console.error('Error creating loan:', error);
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Préstamo de Libros</h2>
      
      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
          'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Email del Usuario
          </label>
          <input
            type="email"
            id="userEmail"
            value={userEmail || '' }
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="usuario@ejemplo.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            required
          />
        </div>
        
        <div className="flex items-end">
          <button
            onClick={createBooking}
            disabled={loading || !selectedCopy}
            className={`w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
              (loading || !selectedCopy) ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Procesando...' : 'Crear Préstamo'}
          </button>
        </div>
      </div>
      

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Buscar Libro Disponible</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTitle || ''}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Título del libro"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={searchBooks}
            disabled={loading}
            className={`px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition-colors ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            Buscar
          </button>
        </div>
      </div>
      

      {searchPerformed && availableBooks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Copias Disponibles</h3>
          <div className="space-y-3">
            {availableBooks.map((book) => (
              <div 
                key={book.id_copybook}
                onClick={() => setSelectedCopy(book)}
                className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${
                  selectedCopy && selectedCopy.id_copybook === book.id_copybook
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="bookSelection"
                    checked={selectedCopy && selectedCopy.id_copybook === book.id_copybook}
                    onChange={() => setSelectedCopy(book)}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">
                    {book.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Autor: {book.author} | Tipo: {book.type} | ID de copia: {book.id_copybook}
                  </p>
                  <p className="text-sm mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      book.state ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {book.state ? 'Disponible' : 'No Disponible'}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;