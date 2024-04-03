//

import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AddPage from './pages/skelbimai/AddPage.tsx';
import SingleAddPage from './pages/skelbimai/SingleAddPage.tsx';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/ads' element={<AddPage />} />
        <Route path='/ads/:adsId' element={<SingleAddPage />} />
      </Routes>
    </div>
  );
}

export default App;
