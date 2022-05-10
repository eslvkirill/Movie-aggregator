import { NavLink, Outlet } from 'react-router-dom';
import './AdminPage.scss';
import { ROUTE } from '../../shared/constants/routes';

const AdminPage = () => {
  const links = [
    { to: ROUTE.GENRES, label: 'Создание жанров' },
    { to: ROUTE.PERSONS, label: 'Создание актёров / режиссёров' },
    { to: ROUTE.MOVIES, label: 'Создание фильмов' },
  ];

  return (
    <div className="admin-page">
      <ul className="admin-page__menu">
        {links.map((link, index) => (
          <li key={link.to}>
            <NavLink 
              className={({ isActive }) => isActive ? 'active' : 'link'} 
              to={link.to}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      
      <Outlet/>
    </div>
  );
};

export default AdminPage;
