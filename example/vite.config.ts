import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'

import { getNames } from './src/api/fakeApi'

const config = defineConfig({
  plugins: [
    Vue(),
    Pages(),
  ],
  ssgOptions: {
    dirStyle: 'nested',
    async onFinished() {
      const names = await getNames()
      const dynamicRoutes = names.map(name => `/names/${name}`)
      generateSitemap({
        hostname: 'https://mywebsite.com/',
        dynamicRoutes,
        readable: true,
      })
    },
  },
})

export default config
