import React from 'react'
import Header from '../components/layout/header'
import { useEffect, useState } from 'react'
import BookingForm from '../components/common/BookingForm';
function Booking() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/book/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBooks(data);
            console.log('Books fetched successfully:', data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);


    return (
        <div className='bg-gray-100 min-h-screen'>
            <Header />
            <div className='mt-16'>
                <BookingForm />
            </div>
        </div>

    )
}

export default Booking