//

import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import AdsPage from './pages/skelbimai/AdsPage.tsx';
import SingleAddPage from './pages/skelbimai/SingleAddPage.tsx';
import AddAdsPage from './pages/skelbimai/AddAdsPage.tsx';
import UserPage from './pages/UserPage.tsx';
import TownPage from './pages/town/TownPage.tsx';
import Login from './components/auth/Login.tsx';
import Register from './components/auth/Register.tsx';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<AdsPage />} />
        <Route path='/add' element={<AddAdsPage />} />
        <Route path='/ads/:adsId' element={<SingleAddPage />} />
        {/* <Route path='/user' element={<UserPage />} /> */}
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/town' element={<TownPage />} />
      </Routes>
    </div>
  );
}

export default App;
