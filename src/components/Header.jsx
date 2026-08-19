import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header
      style={{
        background: 'var(--preto)',
        padding: '2.5rem 1.5rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--dourado)',
      }}
    >
      <Link to="/">
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            color: 'var(--cream)',
            letterSpacing: '1px',
          }}
        >
          Studio Sophie
        </h1>
        <p
          style={{
            margin: '0.3rem 0 0',
            fontFamily: 'var(--sans)',
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--dourado-claro)',
          }}
        >
          Boutique
        </p>
      </Link>
    </header>
  );
}
