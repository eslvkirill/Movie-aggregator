import { Link } from 'react-router-dom';
import { ROUTE } from 'shared/constants/routes';
import './HomePage.scss';

const HomePage = () => {
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
        <Link to={ROUTE.ADMIN}>Перейти на страницу администратора</Link>
      </div>
    </main>
  );
};

export default HomePage;
