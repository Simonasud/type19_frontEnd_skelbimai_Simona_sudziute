import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeSwitcher from '../UI/ThemeSwitcher';
import { useAuthCtx } from '../../store/AuthProvieder';

type NavItemProps = {
  to: string;
  children: string;
  subItem?: boolean;
};

export function NavItem({ to, children, subItem }: NavItemProps) {
  return (
    <NavLink
      className={`headerNavLink ${subItem ? 'smaller' : 'larger'} `}
      to={to}
    >
      {children}
    </NavLink>
  );
}

function Header() {
  const { isUserLooggedIn } = useAuthCtx();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [theme, setTheme] = useState('light');

  const handleLightThemeClick = () => {
    setTheme('light');
    document.body.classList.remove('darkMode');
  };

  const handleDarkThemeClick = () => {
    setTheme('dark');
    document.body.classList.add('darkMode');
  };

  return (
    <header className={`header ${theme === 'dark' ? 'darkMode' : ''}`}>
      <div className='container headerContainer'>
        <Link to={'/'}>
          <h2 className='headerLogo'>
            skel<span className='headerSpan'>BI</span>mai
          </h2>
        </Link>
        <nav className={`${isMenuOpen ? 'mobileMenu' : 'close'}`}>
          <ul className='headerUl'>
            <li className='headerLi'>
              <NavItem to='/'>Ads</NavItem>
              <ul className='subMenu'>
                <li className=''>
                  <NavItem subItem to='/add'>
                    New add
                  </NavItem>
                </li>
              </ul>
            </li>

            {/* <li className='headerLi'>
              <NavItem to='/user'>User</NavItem>
              </li> */}
            {isUserLoggedIn && (
              <li>
                <NavItem to='/user/login'>Logout</NavItem>
              </li>
            )}
            {isUserLoggedIn && (
              <>
                <li>
                  <NavItem to='/user/register'>Register</NavItem>
                </li>
                <li>
                  <NavItem to='/user/login'>Login</NavItem>
                </li>
              </>
            )}

            <li className='headerLi'>
              <NavItem to='/town'>Town</NavItem>
            </li>
          </ul>
        </nav>
        <div className='burgerMenu'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='burgerBtn'
          >
            <i className={`bi bi-${isMenuOpen ? 'x-lg' : 'list'}`}></i>
          </button>
          <ThemeSwitcher
            onLightThemeClick={handleLightThemeClick}
            onDarkThemeClick={handleDarkThemeClick}
            theme={theme}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
