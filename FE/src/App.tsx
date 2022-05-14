import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from 'redux/store/store';
import { ROUTE } from 'shared/constants/routes';
import ContentLayout from 'components/layout/ContentLayout/ContentLayout';
import Header from 'components/layout/Header/Header';
import MoviePage from 'pages/MoviePage/MoviePage';
import PersonPage from 'pages/PersonPage/PersonPage';
import HomePage from 'pages/HomePage/HomePage';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import AuthPage from 'pages/AuthPage/AuthPage';
import AdminPage from 'pages/AdminPage/AdminPage';
import Registration from 'components/features/Auth/Registration/Registration';
import GenreList from 'components/features/Genre/GenreList/GenreList';
import PersonForm from 'components/features/Person/PersonForm/PersonForm';
import MovieForm from 'components/features/Movie/MovieForm/MovieForm';

const store = setupStore();

const App = () => (
  <ContentLayout>
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path={ROUTE.HOME} element={<HomePage />} />
        <Route path={ROUTE.LOGIN} element={<AuthPage />} />
        <Route path={ROUTE.REGISTRATION} element={<Registration />} />
        <Route path={ROUTE.MOVIE_PAGE} element={<MoviePage />} />
        <Route path={ROUTE.PERSON_PAGE} element={<PersonPage />} />
        <Route path={ROUTE.ADMIN} element={<AdminPage />}>
          <Route path={ROUTE.GENRES} element={<GenreList />} />
          <Route path={ROUTE.PERSONS} element={<PersonForm />} />
          <Route path={ROUTE.MOVIES} element={<MovieForm />} />
        </Route>
        <Route path={ROUTE.ERROR} element={<ErrorPage />} />
      </Routes>
    </Provider>
  </ContentLayout>
);

export default App;
