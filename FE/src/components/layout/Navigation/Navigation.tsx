import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { reset } from 'redux/reducers/authReducer';
import { isUserLoggIn } from 'shared/utils/common';
import './Navigation.scss';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.authReducer);
  const authUser = isUserLoggIn(user);

  const links = [
    authUser && {
      to: '/',
      label: user.username,
      visible: false,
    },
    // { to: "/myFilms", label: "Мои фильмы", visible: true },
    authUser && {
      to: '/admin-panel',
      label: 'Панель администратора',
      visible: false,
    },
    authUser
      ? { to: '/logout', label: '➤  Выйти', visible: false }
      : { to: '/login', label: '➤  Войти', visible: true },
  ];

  const clickHandler = (linkTo: string) => {    
    if (linkTo === '/logout') {
      async () => {
        try {
          await axios.get('/logout').then(() => {
            dispatch(reset());
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  const renderLinks = () => {
    return links.map((link: any) => {
      const { to, label } = link;
      let { visible } = link;

      if (authUser) {
        visible = true;
      }

      if (visible) {
        return (
          <li key={Math.random()}>
            <NavLink
              className={({ isActive }) => isActive ? 'active' : 'link'}
              to={to === '/logout' ? '/' : to}
              style={
                to === '/login'
                  ? {
                      backgroundColor: '#318600',
                      boxShadow: '1px 5px 10px -5px black',
                      borderRadius: '10px 0 0 10px',
                    }
                  : to === '/logout'
                  ? {
                      backgroundColor: '#ac1a00',
                      boxShadow: '1px 5px 10px -5px black',
                      borderRadius: '10px 0 0 10px',
                    }
                  : to === '/'
                  ? {
                      textTransform: 'none',
                      backgroundColor: '#b101b1',
                      borderRadius: '50% 30% / 10% 30%',
                      boxShadow: '1px 5px 10px -5px black',
                    }
                  : {}
              }
              onClick={() => clickHandler(to)}
            >
              {label}
            </NavLink>
          </li>
        );
      }
      return null;
    });
  };

  return (
    <nav className="navigation">
      <ul>{renderLinks()}</ul>
    </nav>
  );
};

export default Navigation;
