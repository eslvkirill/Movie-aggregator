import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import HomePage from './pages/Home/HomePage';
import ErrorPage from './pages/Error/ErrorPage';
import GenreList from './components/feature/Genre/GenreList/GenreList';

const App = () => (
  <Routes>
     <Route path={ROUTES.HOME} element={<HomePage />} />
     <Route path={ROUTES.ERROR} element={<ErrorPage />} />
     <Route path={ROUTES.ADMIN.GENRES} element={<GenreList />} />
  </Routes>
);

export default App;
