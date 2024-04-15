import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvieder';

type NavItemProps = {
  to: string;
  children: string;
  subItem?: boolean;
  onClick?: () => void;
};

export function NavItem({ to, children, subItem, onClick }: NavItemProps) {
  return (
    <NavLink
      onClick={onClick}
      className={`headerNavLink ${subItem ? 'smaller' : 'larger'} `}
      to={to}
    >
      {children}
    </NavLink>
  );
}

function Header() {
  const { isUserLoggedIn, logout, email } = useAuthCtx();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='header'>
      <div className='container headerContainer'>
        <Link to={'/'}>
          <h2 className='headerLogo'>
            skel<span className='headerSpan'>BI</span>mai
          </h2>
        </Link>
        <nav className={`${isMenuOpen ? 'mobileMenu' : 'close'}`}>
          <ul className='headerUl'>
            <li className='headerLi'>
              <NavItem to='/ads'>Listings</NavItem>
              <ul className='subMenu'>
                <li className='headerLiSub'>
                  <NavItem subItem to='/add'>
                    New add
                  </NavItem>
                </li>
                <li className='headerLiSub'>
                  <NavItem subItem to='/user/user-ads'>
                    My Ads
                  </NavItem>
                </li>
              </ul>
            </li>

            {!isUserLoggedIn && (
              <>
                <li className='headerLi'>
                  <NavItem to='/auth/register'>Register</NavItem>
                </li>
                <li className='headerLi'>
                  <NavItem to='/auth/login'>Login</NavItem>
                </li>
              </>
            )}

            <li className='headerLi'>
              <NavItem to='/town'>Town</NavItem>
            </li>
            {isUserLoggedIn && (
              <>
                <li className='headerLi'>
                  <NavItem onClick={logout} to='/auth/login'>
                    Logout
                  </NavItem>
                </li>
                <li className='headerLi'>
                  <NavItem to='/user'>My account</NavItem>
                </li>
                <li className='headerLiEmail'>
                  <span className=''>{email}</span>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className='burgerMenu'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='burgerBtn'
          >
            <i className={`bi bi-${isMenuOpen ? 'x-lg' : 'list'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
