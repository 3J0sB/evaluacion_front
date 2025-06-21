import React, { useEffect, useState } from 'react'
import Header from '../components/layout/header'
import BookCollection from '../components/common/bookCollection'
import BookSearchBar from '../components/common/home/bookSearchBar'

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [types, setTypes] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8085/api/book/all', {
        method: 'GET',

        headers: {
          'Content-Type': 'application/json',
        },


      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);


      const uniqueTypes = Array.from(new Set(data.map(b => b.type))).filter(Boolean);
      setTypes(uniqueTypes);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (search, type) => {
    let filtered = books;
    if (search) {
      filtered = filtered.filter(
        b =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (type) {
      filtered = filtered.filter(b => b.type === type);
    }
    setFilteredBooks(filtered);
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Header />
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <BookSearchBar onSearch={handleSearch} types={types} />
        <BookCollection books={filteredBooks} title={"Explora nuestra colección"} />
      </div>
    </div>
  )
}

export default Home