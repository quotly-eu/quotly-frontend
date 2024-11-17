import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

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
      VitePWA({
        registerType: 'autoUpdate',
        manifest: false,
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'service-worker.ts',
        injectManifest: {
          maximumFileSizeToCacheInBytes: 4000000
        }
      })
    ],
    server: {
      open: true,
      port: Number(env.VITE_PORT),
    }
  };
})
