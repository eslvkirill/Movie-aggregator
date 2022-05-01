import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Registration from 'components/feature/Auth/Registration/Registration';
import { ROUTE } from './shared/constants/routes';
import HomePage from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AuthPage from './pages/AuthPage/AuthPage';
import AdminPage from './pages/AdminPage/AdminPage';
import GenreList from './components/feature/Genre/GenreList/GenreList';
import FilmForm from './components/feature/Film/FilmForm/FilmForm';
import { setupStore } from './redux/store/store';

const store = setupStore();

const App = () => (
  <Provider store={store}>
    <Routes>
      <Route path={ROUTE.HOME} element={<HomePage />} />
      <Route path={ROUTE.LOGIN} element={<AuthPage />} />
      <Route path={ROUTE.REGISTRATION} element={<Registration />} />
      <Route path={ROUTE.ADMIN} element={<AdminPage />}>
        <Route path={ROUTE.GENRES} element={<GenreList />} />
        <Route path={ROUTE.FILMS} element={<FilmForm />} />
      </Route>
      <Route path={ROUTE.ERROR} element={<ErrorPage />} />
    </Routes>
  </Provider>
);

export default App;
