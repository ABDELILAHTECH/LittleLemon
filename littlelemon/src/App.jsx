import './Styles/main.scss'
import Header from './Components/Header'
import HomePage from './Components/Homepage'
import BookingPage from './Components/BookingPage'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/reservations' element={<BookingPage />} />
      </Routes>
    </div>
  )
}
