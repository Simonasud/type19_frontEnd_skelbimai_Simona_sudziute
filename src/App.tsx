//

import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AddsPage from './pages/skelbimai/AddsPage.tsx';
import SingleAddPage from './pages/skelbimai/SingleAddPage.tsx';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/ads' element={<AddsPage />} />
        <Route path='/ads/:adsId' element={<SingleAddPage />} />
      </Routes>
    </div>
  );
}

export default App;
