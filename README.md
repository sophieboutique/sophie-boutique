# Studio Sophie Boutique — site

Vitrine de peças com painel de cadastro, feito para hospedar de graça no GitHub Pages.

## O que o site faz

- Vitrine pública com filtro por categoria
- Botão "Comprar pelo WhatsApp" em cada peça, que abre o WhatsApp já com a mensagem preenchida
- Painel administrativo em `/#/admin` (senha padrão: `sophie2026`, troque antes de publicar)
- Cadastro, edição e exclusão de peças pelo painel

## ⚠️ Limitação importante

Os produtos cadastrados ficam salvos no **navegador de quem cadastrou** (localStorage), não em um banco de dados compartilhado. Isso significa:

- Se você cadastrar peças no seu computador, elas aparecem pra você, mas **não aparecem automaticamente pros visitantes do site** — cada pessoa que abre o site vê o que está salvo no navegador dela, que por padrão é só o que veio pré-cadastrado no código (os 2 exemplos).
- Pra peças aparecerem pra todo mundo, você precisa: cadastrar no painel → exportar os dados → colar no arquivo `src/data/seedProducts.js` → publicar de novo no GitHub.

Isso é uma limitação de qualquer site 100% estático sem back-end. Se isso virar um problema no dia a dia, me avise — dá pra evoluir para usar um serviço gratuito de banco de dados (ex: Google Sheets como fonte, ou Firebase) para os cadastros aparecerem pra todo mundo automaticamente, sem precisar copiar e colar.

## Como rodar localmente

```bash
npm install
npm run dev
```

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub chamado `sophie-boutique` (se usar outro nome, troque em `vite.config.js`, no campo `base`).
2. Suba os arquivos deste projeto pro repositório.
3. Rode:

```bash
npm run build
npm run deploy
```

4. No GitHub, vá em **Settings > Pages** e confirme que a branch `gh-pages` está selecionada como fonte.
5. O site fica disponível em `https://SEU-USUARIO.github.io/sophie-boutique/`

## Trocar o número de WhatsApp

Edite `src/components/ProductCard.jsx`, linha 1, a constante `WHATSAPP_NUMERO` (formato: código do país + DDD + número, sem espaços ou símbolos).

## Trocar a senha do painel

Edite `src/pages/AdminLogin.jsx`, constante `SENHA_ADMIN`. Lembre-se: essa senha fica visível no código-fonte do site, então serve só para afastar visitantes casuais — não é segurança real.
