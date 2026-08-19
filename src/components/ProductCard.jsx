const WHATSAPP_NUMERO = '5511999999999'; // TODO: trocar pelo número real da loja

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function ProductCard({ product }) {
  const linkWhatsapp = () => {
    const texto = `Olá! Tenho interesse na peça "${product.nome}" (${formatarPreco(
      product.preco
    )}) que vi no site do Studio Sophie Boutique.`;
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        background: 'var(--branco)',
        border: '1px solid transparent',
        transition: 'border-color 0.25s ease, transform 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--dourado-claro)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        style={{
          aspectRatio: '3 / 4',
          background: 'var(--blush)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {product.imagem ? (
          <img
            src={product.imagem}
            alt={product.nome}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              color: 'var(--dourado)',
              fontSize: '0.9rem',
            }}
          >
            Studio Sophie
          </div>
        )}
        {product.precoAntigo && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: 'var(--dourado)',
              color: 'var(--branco)',
              fontSize: '0.65rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '4px 10px',
            }}
          >
            Promoção
          </span>
        )}
      </div>

      <div style={{ padding: '1.1rem 1rem 1.3rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p
          style={{
            fontSize: '0.65rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--dourado)',
            margin: '0 0 0.4rem',
          }}
        >
          {product.categoria}
        </p>
        <h3
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: '1.15rem',
            margin: '0 0 0.5rem',
            color: 'var(--preto)',
          }}
        >
          {product.nome}
        </h3>
        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--charcoal)',
            lineHeight: 1.6,
            margin: '0 0 0.9rem',
            flex: 1,
          }}
        >
          {product.descricao}
        </p>

        {product.tamanhos?.length > 0 && (
          <p style={{ fontSize: '0.75rem', color: 'var(--charcoal)', margin: '0 0 0.9rem' }}>
            Tamanhos: {product.tamanhos.join(', ')}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '1rem' }}>
          {product.precoAntigo && (
            <span
              style={{
                fontSize: '0.85rem',
                color: '#A79A8C',
                textDecoration: 'line-through',
              }}
            >
              {formatarPreco(product.precoAntigo)}
            </span>
          )}
          <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--dourado)' }}>
            {formatarPreco(product.preco)}
          </span>
        </div>

        <button
          onClick={linkWhatsapp}
          style={{
            background: 'var(--preto)',
            color: 'var(--cream)',
            border: '1px solid var(--preto)',
            padding: '0.8rem',
            fontSize: '0.72rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--dourado)';
            e.currentTarget.style.borderColor = 'var(--dourado)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--preto)';
            e.currentTarget.style.borderColor = 'var(--preto)';
          }}
        >
          Comprar pelo WhatsApp
        </button>
      </div>
    </div>
  );
}
