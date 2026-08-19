import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: '/sophie-boutique/' precisa ser o mesmo nome do repositório GitHub.
// Se o nome do seu repositório for diferente, troque aqui antes de publicar.
export default defineConfig({
  plugins: [react()],
  base: '/sophie-boutique/',
});
