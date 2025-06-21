import React from 'react'
import Header from '../components/layout/header'

function About() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Integrantes</h1>
          <div className="space-y-4 text-center">
            <div className='flex justify-center items-center gap-2'>
              <span className="block text-lg font-semibold text-gray-800">Nicolas Trejos</span>
              <span className="block text-gray-500">20.915.095-6</span>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <span className="block text-lg font-semibold text-gray-800">Matias Reveco</span>
              <span className="block text-gray-500">11.111.111-1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About