import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const root = process.cwd()

function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

export default defineConfig(async ({ command, mode }: ConfigEnv) => {
  const { default: UnoCSS } = await import('unocss/vite')
  let env: any = null
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    plugins: [
      Vue(),
      VueJsx(),
      UnoCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    build: {
      outDir: env.VITE_OUT_DIR || 'dist'
    },
    server: {
      hmr: {
        overlay: false
      },
      host: '0.0.0.0',
      port: 9091,
      open: true
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
      alias: [
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    }
  }
})
