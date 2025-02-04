import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;
  
  return (
    <nav>
    <ul className='nav nav-tabs'>
      <li className='nav-item'>
        <h2>
          <Link
            to='/'
            className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
          >
            HOME
          </Link>
        </h2>
      </li>
      <li className='nav-item'>
        <h2>
          <Link
            to='/WatchList'
            className={
              currentPage === '/WatchList' ? 'nav-link active' : 'nav-link'
            }
          >
            Potential Candidates
          </Link>
        </h2>
      </li>
    </ul>
  </nav>
);
};



export default Nav;

