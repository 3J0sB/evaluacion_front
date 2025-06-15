import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBookForm from '../components/common/AddbookForm';
import AddBookCopyForm from '../components/common/AddCopyBookForm';
import Header from '../components/layout/header';

const AddBook = () => {
    return (
        <div className='bg-gray-100 min-h-screen'>
            <Header />
            <div className="container mx-auto px-4 py-8">

                <h1 className="text-3xl font-bold mb-8 text-gray-900">Gestión de Inventario</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <AddBookForm />
                    <AddBookCopyForm />
                </div>

                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>
    );
};

export default AddBook;