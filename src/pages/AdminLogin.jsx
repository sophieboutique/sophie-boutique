import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Senha simples para impedir acesso casual ao painel.
// Isso NÃO é segurança real — qualquer pessoa que veja o código-fonte pode ler a senha.
// Não cadastre nada sigiloso aqui; serve só para afastar visitantes casuais.
const SENHA_ADMIN = 'sophie2026';

export default function AdminLogin() {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha === SENHA_ADMIN) {
      sessionStorage.setItem('sophie-admin-auth', 'true');
      navigate('/admin');
    } else {
      setErro('Senha incorreta.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--preto)',
        padding: '1.5rem',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--cream)',
          padding: '2.5rem 2rem',
          width: '100%',
          maxWidth: '360px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: '1.5rem',
            margin: '0 0 0.3rem',
          }}
        >
          Studio Sophie
        </h1>
        <p
          style={{
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--dourado)',
            margin: '0 0 2rem',
          }}
        >
          Painel administrativo
        </p>

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem',
            border: '1px solid var(--dourado-claro)',
            marginBottom: '1rem',
            fontSize: '0.9rem',
            background: 'var(--branco)',
          }}
        />

        {erro && (
          <p style={{ color: '#A64B3F', fontSize: '0.8rem', margin: '0 0 1rem' }}>{erro}</p>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            background: 'var(--preto)',
            color: 'var(--cream)',
            border: 'none',
            padding: '0.85rem',
            fontSize: '0.75rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
