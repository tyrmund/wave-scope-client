import AppRoutes from './routes/AppRoutes'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'

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
