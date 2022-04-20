import { useNavigate } from "react-router-dom";
import { ROUTES } from './../../constants/routes';
import "./HomePage.scss";

const HomePage = () => {
  const navigate = useNavigate();

  const goToAdminPage = () => navigate(ROUTES.ADMIN.GENRES);

  return (
    <main className="home-page">
      <div className="home-page__description-wrapper description-wrapper">
        <hr className="description-wrapper_first-line" />
        <div className="description-wrapper__description">
          Хотите посмотреть хороший фильм, но не знаете, какой выбрать? На
          данной странице собраны одни из лучших фильмов по различным жанрам, Вы
          сможете выбрать именно ту кинокартину, которая Вам действительно
          понравится и запомнится надолго.
        </div>
        <hr className="description-wrapper_second-line" />
      </div>
      <button onClick={goToAdminPage}>Перейти к жанрам</button>
    </main>
  );
};

export default HomePage;
