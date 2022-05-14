import { NavLink, Outlet } from 'react-router-dom';
import './AdminPage.scss';
import { ROUTE } from '../../shared/constants/routes';
import { useAppSelector } from '../../hooks/redux';

const AdminPage = () => {
  const isMovieEdit = useAppSelector(state => state.movieReducer.isEdit);
  const isPersonEdit = useAppSelector(state => state.personReducer.isEdit);

  const links = [
    { to: ROUTE.GENRES, label: 'Создание жанров' },
    { to: ROUTE.PERSONS, label: `${isPersonEdit ? 'Редактирование актёра / режиссёра'  : 'Создание актёров / режиссёров'}` },
    { to: ROUTE.MOVIES, label: `${isMovieEdit ? 'Редактирование фильма'  : 'Создание фильмов'}` },
  ];

  return (
    <div className="admin-page">
      <ul className="admin-page__menu">
        {links.map((link) => (
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
