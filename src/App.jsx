import AppRoutes from './routes/AppRoutes'
import './App.css'
import { Container } from 'react-bootstrap'
import Navigation from './components/Navigation'

function App() {

  return (
    <div className='App'>

      <Navigation />

      <AppRoutes />

      {/* <Footer /> */}

    </div>
  )
}

export default App
