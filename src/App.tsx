//

import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import SkelbimuPage from './pages/skelbimai/SkelbimuPage';
import VienoSkelbimoPage from './pages/skelbimai/VienoSkelbimoPage.tsx';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/skelbimai' element={<SkelbimuPage />} />
        <Route path='/skelbimai/:skelbimoId' element={<VienoSkelbimoPage />} />
      </Routes>
    </div>
  );
}

export default App;
