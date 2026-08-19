import { useState, useMemo } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

export default function Home() {
  const { products } = useProducts();
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const categorias = useMemo(() => {
    const set = new Set(products.map((p) => p.categoria).filter(Boolean));
    return ['Todas', ...Array.from(set)];
  }, [products]);

  const produtosFiltrados = useMemo(() => {
    if (categoriaAtiva === 'Todas') return products;
    return products.filter((p) => p.categoria === categoriaAtiva);
  }, [products, categoriaAtiva]);

  return (
    <div>
      <Header />

      <section
        style={{
          background: 'var(--charcoal)',
          color: 'var(--cream)',
          textAlign: 'center',
          padding: '3rem 1.5rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.5,
          }}
        >
          Peças selecionadas para uma elegância atemporal.
        </p>
      </section>

      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.8rem',
          flexWrap: 'wrap',
          padding: '2rem 1.5rem 1rem',
        }}
      >
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom:
                categoriaAtiva === cat ? '2px solid var(--dourado)' : '2px solid transparent',
              padding: '0.3rem 0.1rem',
              fontSize: '0.78rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: categoriaAtiva === cat ? 'var(--preto)' : 'var(--charcoal)',
              fontWeight: categoriaAtiva === cat ? 700 : 400,
            }}
          >
            {cat}
          </button>
        ))}
      </nav>

      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1.5rem',
        }}
      >
        {produtosFiltrados.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              padding: '4rem 1rem',
              color: 'var(--charcoal)',
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
            }}
          >
            Nenhuma peça cadastrada nessa categoria ainda.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {produtosFiltrados.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <footer
        style={{
          background: 'var(--preto)',
          color: 'var(--blush)',
          textAlign: 'center',
          padding: '2.5rem 1.5rem',
          marginTop: '3rem',
          fontSize: '0.8rem',
        }}
      >
        <p style={{ margin: 0 }}>Studio Sophie Boutique</p>
        <p style={{ margin: '0.4rem 0 0', fontSize: '0.7rem', opacity: 0.7 }}>
          Peças com estoque limitado. Consulte disponibilidade pelo WhatsApp.
        </p>
      </footer>
    </div>
  );
}
