import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return {
    root: path.resolve(__dirname),

    plugins: [
      react(), // Enables React Fast Refresh and JSX support
      tailwindcss(), // Integrates TailwindCSS for utility-first CSS
      tsconfigPaths(), // Enables path aliases from tsconfig.json
      visualizer({
        filename: 'bundle-report.html', // Output filename for the bundle report
        open: true, // Automatically opens the report after build
        gzipSize: true, // Display the gzip-compressed bundle size
        brotliSize: true, // Display the Brotli-compressed bundle size
        template: 'sunburst', // Visualization template for the bundle report
        emitFile: true, // Include the report in the build output
      }),
    ],

    build: {
      outDir: 'dist/build',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'), // Main entry point for the application
        },
      },
    },

    server: {
      fs: {
        strict: false, // Allow serving files from outside the project root (useful for monorepos)
      },
      proxy: {
        '/proxy/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/proxy\/td\/api/, '/api'),
        },
      },
    },

    preview: {
      port: Number(env.VITE_PORT) || 3003,
      host: true, // Allow external connections
    },
  };
});
