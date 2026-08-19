import { useState, useEffect } from 'react';

const CATEGORIAS_SUGERIDAS = ['Vestidos', 'Blazers', 'Saias', 'Blusas', 'Calças', 'Acessórios'];

const inputStyle = {
  width: '100%',
  padding: '0.7rem',
  border: '1px solid var(--dourado-claro)',
  fontSize: '0.88rem',
  background: 'var(--branco)',
  marginBottom: '1rem',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.7rem',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: 'var(--charcoal)',
  marginBottom: '0.4rem',
};

const vazio = {
  nome: '',
  descricao: '',
  preco: '',
  precoAntigo: '',
  categoria: '',
  tamanhos: '',
  imagem: '',
  destaque: false,
};

export default function ProductForm({ produtoEditando, onSalvar, onCancelar }) {
  const [form, setForm] = useState(vazio);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (produtoEditando) {
      setForm({
        ...produtoEditando,
        preco: String(produtoEditando.preco ?? ''),
        precoAntigo: produtoEditando.precoAntigo ? String(produtoEditando.precoAntigo) : '',
        tamanhos: (produtoEditando.tamanhos || []).join(', '),
      });
    } else {
      setForm(vazio);
    }
  }, [produtoEditando]);

  const handleImagem = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, imagem: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.preco) {
      setErro('Preencha ao menos o nome e o preço da peça.');
      return;
    }
    const precoNum = parseFloat(form.preco.replace(',', '.'));
    if (isNaN(precoNum) || precoNum <= 0) {
      setErro('Informe um preço válido.');
      return;
    }
    setErro('');

    onSalvar({
      ...form,
      preco: precoNum,
      precoAntigo: form.precoAntigo ? parseFloat(String(form.precoAntigo).replace(',', '.')) : null,
      categoria: form.categoria.trim() || 'Outros',
      tamanhos: form.tamanhos
        ? form.tamanhos.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    });

    setForm(vazio);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: 'var(--branco)', padding: '1.5rem', border: '1px solid var(--blush)' }}
    >
      <h3 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', marginTop: 0 }}>
        {produtoEditando ? 'Editar peça' : 'Nova peça'}
      </h3>

      <label style={labelStyle}>Nome da peça *</label>
      <input
        style={inputStyle}
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
        placeholder="Ex: Vestido Longo Seda Bege"
      />

      <label style={labelStyle}>Descrição</label>
      <textarea
        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
        value={form.descricao}
        onChange={(e) => setForm({ ...form, descricao: e.target.value })}
        placeholder="Tecido, caimento, ocasião de uso..."
      />

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Preço (R$) *</label>
          <input
            style={inputStyle}
            value={form.preco}
            onChange={(e) => setForm({ ...form, preco: e.target.value })}
            placeholder="890"
            inputMode="decimal"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Preço antigo (opcional)</label>
          <input
            style={inputStyle}
            value={form.precoAntigo}
            onChange={(e) => setForm({ ...form, precoAntigo: e.target.value })}
            placeholder="1090"
            inputMode="decimal"
          />
        </div>
      </div>

      <label style={labelStyle}>Categoria</label>
      <input
        style={inputStyle}
        value={form.categoria}
        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        placeholder="Ex: Vestidos"
        list="categorias-sugeridas"
      />
      <datalist id="categorias-sugeridas">
        {CATEGORIAS_SUGERIDAS.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <label style={labelStyle}>Tamanhos (separados por vírgula)</label>
      <input
        style={inputStyle}
        value={form.tamanhos}
        onChange={(e) => setForm({ ...form, tamanhos: e.target.value })}
        placeholder="P, M, G"
      />

      <label style={labelStyle}>Foto da peça</label>
      <input type="file" accept="image/*" onChange={handleImagem} style={{ marginBottom: '1rem' }} />
      {form.imagem && (
        <img
          src={form.imagem}
          alt="Pré-visualização"
          style={{ width: '100%', maxWidth: '160px', display: 'block', marginBottom: '1rem' }}
        />
      )}

      {erro && <p style={{ color: '#A64B3F', fontSize: '0.85rem' }}>{erro}</p>}

      <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
        <button
          type="submit"
          style={{
            background: 'var(--preto)',
            color: 'var(--cream)',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontSize: '0.75rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          {produtoEditando ? 'Salvar alterações' : 'Cadastrar peça'}
        </button>
        {produtoEditando && (
          <button
            type="button"
            onClick={onCancelar}
            style={{
              background: 'none',
              border: '1px solid var(--charcoal)',
              padding: '0.75rem 1.5rem',
              fontSize: '0.75rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
