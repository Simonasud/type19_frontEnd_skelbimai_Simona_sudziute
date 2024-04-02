//

import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <div className='container'>
        <Link to={'/'}>
          <h2 className='headerLogo'>
            skel<span className='headerSpan'>BI</span>mai
          </h2>
        </Link>
        <nav className=''>
          <ul className='headerUl'>
            <li className='headerLi'>
              <NavLink to='/'>Skelbimai</NavLink>
            </li>
            <li className='headerLi'>
              <NavLink to='/login'>Login</NavLink>
            </li>
            <li className='headerLi'>
              <NavLink to='/register'>Register</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
