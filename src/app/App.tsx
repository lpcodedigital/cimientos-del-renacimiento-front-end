import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../presentation/pages/Home'
import CursosPage from '../presentation/features/Cursos/CursosPage';

function App() {

  return (
    <BrowserRouter basename="/cimientos-del-renacimiento-front-end">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CursosPage" element={<CursosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
