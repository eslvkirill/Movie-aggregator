import { NavLink, Outlet } from 'react-router-dom';
import './AdminPage.scss';
import { ROUTES } from '../../shared/constants/routes';

const AdminPage = () => {
  const links = [
    { to: ROUTES.GENRES, label: 'Создание жанров' },
    // { to: '/adminPage/persons', label: 'Создание людей' },
    { to: ROUTES.FILMS, label: 'Создание фильмов' },
  ];

  return (
    <div className="admin-page">
      <ul className="admin-page__menu">
        {links.map((link, index) => (
          <li key={link.to}>
            <NavLink className={({ isActive }) => isActive ? 'active' : 'link'} 
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
