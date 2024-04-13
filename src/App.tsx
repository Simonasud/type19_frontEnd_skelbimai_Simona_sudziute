//

import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import AdsPage from './pages/skelbimai/AdsPage.tsx';
import SingleAddPage from './pages/skelbimai/SingleAddPage.tsx';
import AddAdsPage from './pages/skelbimai/AddAdsPage.tsx';
import UserPage from './pages/UserPage.tsx';
import TownPage from './pages/town/TownPage.tsx';
import Login from './components/auth/Login.tsx';
import Register from './components/auth/Register.tsx';
import { useAuthCtx } from './store/AuthProvieder.tsx';
import UserAds from './pages/UserAds.tsx';

function App() {
  const { isUserLoggedIn } = useAuthCtx();
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<AdsPage />} />
        <Route path='/add' element={<AddAdsPage />} />
        <Route path='/ads/:adsId' element={<SingleAddPage />} />
        <Route
          path='/user'
          element={
            isUserLoggedIn ? <UserPage /> : <Navigate to={'/auth/login'} />
          }
        />
        <Route
          path='/user/user-ads'
          element={
            isUserLoggedIn ? <UserAds /> : <Navigate to={'/auth/login'} />
          }
        />
        <Route
          path='/auth/login'
          element={isUserLoggedIn ? <Navigate to='/' /> : <Login />}
        />
        <Route
          path='/auth/register'
          element={isUserLoggedIn ? <Navigate to='/' /> : <Register />}
        />
        <Route path='/town' element={<TownPage />} />
      </Routes>
    </div>
  );
}

export default App;
