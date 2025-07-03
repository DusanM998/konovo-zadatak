import { Header } from '../components/layout'
import Footer from '../components/layout/Footer'
import MainPage from '../pages/MainPage'

function App() {

  return (
    <div>
      <Header />
      <main className='w-screen m-0 p-0'>
        <MainPage  />
      </main>
      <Footer />
    </div>
  )
}

export default App
