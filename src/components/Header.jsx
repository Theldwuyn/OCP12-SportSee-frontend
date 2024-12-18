import { Link } from 'react-router-dom';
import Logo from '../assets/SportSee.svg';

// style
import '../scss/components/header.scss';

function Header() {
  return (
    <header className="flex_row appbar">
      <img src={Logo} alt="SportSee logo" className="appbar__logo" />
      <nav className="flex_row appbar__nav">
        <Link to="#">Accueil</Link>
        <Link to="#">Profil</Link>
        <Link to="#">Réglage</Link>
        <Link to="#">Communauté</Link>
      </nav>
    </header>
  );
}

export default Header;
