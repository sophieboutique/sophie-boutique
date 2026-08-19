import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header
      style={{
        background: 'var(--preto)',
        padding: '1.8rem 1.5rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--dourado)',
      }}
    >
      <Link to="/">
        <img
          src={logo}
          alt="Studio Sophie Boutique"
          style={{
            width: 'clamp(110px, 18vw, 150px)',
            height: 'auto',
            display: 'inline-block',
          }}
        />
      </Link>
    </header>
  );
}
