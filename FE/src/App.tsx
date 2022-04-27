import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ROUTES } from './shared/constants/routes';
import HomePage from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AdminPage from './pages/AdminPage/AdminPage';
import GenreList from './components/feature/Genre/GenreList/GenreList';
import FilmForm from './components/feature/Film/FilmForm/FilmForm';
import { setupStore } from './redux/store/store';

const store = setupStore();

const App = () => (
  <Provider store={store}>
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ADMIN} element={<AdminPage />}>
        <Route path={ROUTES.GENRES} element={<GenreList />} />
        <Route path={ROUTES.FILMS} element={<FilmForm />} />
      </Route>
      <Route path={ROUTES.ERROR} element={<ErrorPage />} />
    </Routes>
  </Provider>
);

export default App;
