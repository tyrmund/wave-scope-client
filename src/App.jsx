import AppRoutes from './routes/AppRoutes'
import './App.css'
import { Container } from 'react-bootstrap'
import Navigation from './components/Navigation'
import Footer from './pages/Footer/Footer'

function App() {

  return (
    <div className='App'>

      <Navigation />

      <AppRoutes />

      <Footer />

    </div>
  )
}

export default App
