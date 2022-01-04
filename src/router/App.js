import {BrowserRouter, Routes, Route} from 'react-router-dom'
import FavoritesPage from '../pages/FavoritesPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import '../styles/app.css'
import SingleMoviePage from '../pages/SingleMoviePage';
import AboutPage from '../pages/AboutPage';
import {GlobalProvider} from '../context/GlobalState.js'

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <main>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/movie/:id" element={<SingleMoviePage/>}/>
            <Route path="about" element={<AboutPage/>}/>
            <Route path="favorites" element={<FavoritesPage />}/>
          </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>      
    </GlobalProvider>
  );
}

export default App;
