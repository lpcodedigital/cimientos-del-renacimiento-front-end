import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Home from '../presentation/pages/Home'
import CursosPage from '../presentation/features/Cursos/CursosPage';
import AllCursos from '../presentation/features/Cursos/AllCursos';
import Obras from '../presentation/features/Obra/Obras';

function App() {

  const basename = import.meta.env.PROD ? '/cimientos-del-renacimiento-front-end' : '';

  return (
    // <BrowserRouter basename="/cimientos-del-renacimiento-front-end">
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/CursosPage" element={<CursosPage />} />
    //   </Routes>
    // </BrowserRouter>

    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CursosPage" element={<CursosPage />} />
        <Route path="/AllCursos" element={<AllCursos />} />
        <Route path="/Obras" element={<Obras />} />
      </Routes>
    </HashRouter>
    
  )
}

export default App
