import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(), 
      svgr({
        svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
        include: '**/*.svg',
      }),
      tsconfigPaths(),
    ],
    server: {
      port: Number(env.VITE_PORT),
      proxy: {
        '/api': {
          target: 'https://quotly.eu/',
          changeOrigin: false,
          ws: true,
        }
      }
    }
  };
})
