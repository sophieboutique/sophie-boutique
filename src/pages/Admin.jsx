import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductForm from '../components/ProductForm';

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function Admin() {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, removeProduct } = useProducts();
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem('sophie-admin-auth') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleSalvar = (dados) => {
    if (editando) {
      updateProduct(editando.id, dados);
      setEditando(null);
    } else {
      addProduct(dados);
    }
  };

  const handleExcluir = (id, nome) => {
    if (window.confirm(`Excluir a peça "${nome}"? Essa ação não pode ser desfeita.`)) {
      removeProduct(id);
    }
  };

  const handleSair = () => {
    sessionStorage.removeItem('sophie-admin-auth');
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <header
        style={{
          background: 'var(--preto)',
          color: 'var(--cream)',
          padding: '1.2rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.8rem',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: '1.3rem',
            margin: 0,
          }}
        >
          Painel — Studio Sophie
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a
            href="/"
            style={{ fontSize: '0.78rem', letterSpacing: '1px', color: 'var(--dourado-claro)' }}
          >
            Ver site
          </a>
          <button
            onClick={handleSair}
            style={{
              background: 'none',
              border: '1px solid var(--dourado-claro)',
              color: 'var(--cream)',
              fontSize: '0.72rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '0.4rem 0.9rem',
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '2rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 380px) 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        <ProductForm
          produtoEditando={editando}
          onSalvar={handleSalvar}
          onCancelar={() => setEditando(null)}
        />

        <div>
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal)', marginTop: 0 }}>
            {products.length} peça(s) cadastrada(s)
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {products.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  background: 'var(--branco)',
                  border: '1px solid var(--blush)',
                  padding: '0.8rem',
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    flexShrink: 0,
                    background: 'var(--blush)',
                    overflow: 'hidden',
                  }}
                >
                  {p.imagem && (
                    <img
                      src={p.imagem}
                      alt={p.nome}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem' }}>{p.nome}</p>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: 'var(--charcoal)' }}>
                    {p.categoria} · {formatarPreco(p.preco)}
                  </p>
                </div>
                <button
                  onClick={() => setEditando(p)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--charcoal)',
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.7rem',
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluir(p.id, p.nome)}
                  style={{
                    background: 'none',
                    border: '1px solid #A64B3F',
                    color: '#A64B3F',
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.7rem',
                  }}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
