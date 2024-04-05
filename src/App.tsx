//

import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AdsPage from './pages/skelbimai/AdsPage.tsx';
import SingleAddPage from './pages/skelbimai/SingleAddPage.tsx';
import AddAdsPage from './pages/skelbimai/AddAdsPage.tsx';
import UserPage from './pages/user/UserPage.tsx';
import LoginPage from './pages/user/LoginPage.tsx';
import TownPage from './pages/town/TownPage.tsx';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/ads' element={<AdsPage />} />
        <Route path='/ads/add' element={<AddAdsPage />} />
        <Route path='/ads/:adsId' element={<SingleAddPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/town' element={<TownPage />} />
      </Routes>
    </div>
  );
}

export default App;
