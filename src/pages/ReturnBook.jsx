import React from 'react'
import Header from '../components/layout/header'
import ReturnBookForm from '../components/common/ReturnBookForm'

function ReturnBook() {
  return (
    <div className='bg-gray-100 min-h-screen '>
      <Header />
      <div className='mt-16'>
        <ReturnBookForm />
      </div>

    </div>
  )
}

export default ReturnBook