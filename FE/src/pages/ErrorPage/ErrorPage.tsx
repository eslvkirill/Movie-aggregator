import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <main className="error-page">
      <div className="error-page__description">
        Данная страница не найдена
      </div>
      <Link to={ROUTES.HOME}>Перейти на главную страницу</Link>
    </main>
  );
};

export default ErrorPage;
