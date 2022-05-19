import './Header.scss';
import Search from 'components/features/Search/Search';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const Header = () => (
  <header className="header">
    <Logo />
    <Search />
    <Navigation />
  </header>
);

export default Header;
