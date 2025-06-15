import React, { useEffect, useState } from 'react'
import Header from '../components/layout/header'
import BookCollection from '../components/common/bookCollection'

function Home() {
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
    <div>
      <Header/>
      <BookCollection books = {books} title={"Explora nuestra colección"}/>
    </div>
  )
}

export default Home