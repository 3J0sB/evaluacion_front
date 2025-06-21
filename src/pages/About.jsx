import React from 'react'
import Header from '../components/layout/header'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center py-10">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Integrantes</h1>
          <div className="space-y-6">
            <div className="p-4 border rounded-md">
              <p className="text-lg font-semibold text-gray-800">Nicolas Trejos Berrios</p>
              <p className="text-gray-500 break-all">nicolas.trejos@alu.ucm.cl</p>
              <p className="text-gray-500 break-all">20.915.095-6</p>
              <a
                href="https://github.com/3J0sB"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                GitHub
              </a>
            </div>
            <div className="p-4 border rounded-md">
              <p className="text-lg font-semibold text-gray-800">Matias Reveco Fuentes</p>
              <p className="text-gray-500 break-all">matias.reveco@alu.ucm.cl</p>
              <p className="text-gray-500 break-all">21.016.634-3</p>
              <a
                href="https://github.com/MatiasRF1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About