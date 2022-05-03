import './Header.scss';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const Header = () => (
  <header className="header">
    <Logo />
    <Navigation />
  </header>
);

export default Header;
