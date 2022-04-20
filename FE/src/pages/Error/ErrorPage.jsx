import { useNavigate } from "react-router-dom";
import { ROUTES } from './../../constants/routes';
import "./ErrorPage.scss";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => navigate(ROUTES.HOME);

  return (
    <main className="error-page">
      <div className="error-page__description">
        Данная страница не найдена
      </div>
      <button onClick={goToHomePage}>Перейти на главную страницу</button>
    </main>
  );
};

export default ErrorPage;
