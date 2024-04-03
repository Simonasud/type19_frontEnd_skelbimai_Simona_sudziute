//

import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AdsPage from './pages/skelbimai/AdsPage.tsx';
import SingleAddPage from './pages/skelbimai/SingleAddPage.tsx';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/ads' element={<AdsPage />} />
        <Route path='/ads/:adsId' element={<SingleAddPage />} />
      </Routes>
    </div>
  );
}

export default App;
