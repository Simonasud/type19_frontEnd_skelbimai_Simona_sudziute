import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='header'>
      <div className='container headerContainer'>
        <Link to={'/'}>
          <h2 className='headerLogo'>
            skel<span className='headerSpan'>BI</span>mai
          </h2>
        </Link>
        <nav className={`${isMenuOpen ? 'mobileMenu' : 'close'} `}>
          <ul className='headerUl'>
            <li className='headerLi'>
              <NavLink className={'headerNavLink'} to='/ads'>
                Skelbimai
              </NavLink>
            </li>
            <li className='headerLi'>
              <NavLink className={'headerNavLink'} to='/ads/add'>
                Pridėti skelbimą
              </NavLink>
            </li>
            <li className='headerLi'>
              <NavLink className={'headerNavLink'} to='/login'>
                Login
              </NavLink>
            </li>
            <li className='headerLi'>
              <NavLink className={'headerNavLink'} to='/register'>
                Register
              </NavLink>
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
        </div>
      </div>
    </header>
  );
}

export default Header;
