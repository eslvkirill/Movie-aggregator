import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ROUTES } from './shared/constants/routes';
import HomePage from './pages/Home/HomePage';
import ErrorPage from './pages/Error/ErrorPage';
import GenreList from './components/feature/Genre/GenreList/GenreList';
import { setupStore } from './redux/store/store';

const store = setupStore();

const App = () => (
  <Provider store={store}>
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ERROR} element={<ErrorPage />} />
      <Route path={ROUTES.ADMIN.GENRES} element={<GenreList />} />
    </Routes>
  </Provider>
);

export default App;
