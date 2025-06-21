import React from 'react'
import ReaderReservations from '../components/common/reader/readerReservations'
import Header from '../components/layout/header'

function MyBookings() {
  const userId = localStorage.getItem('userId')
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Mis Reservas</h2>
        <ReaderReservations email={userId} />
      </div>
    </div>
  )
}

export default MyBookings