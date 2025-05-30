import './App.css'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'
import { AppRoutes } from './routes/AppRoutes'

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
