import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

function uploadApiPlugin() {
  return {
    name: 'upload-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload', (req, res, next) => {
        if (req.method !== 'POST') return next()
        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body)
            const image = parsed.image
            if (!image) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ error: 'No image' }))
            }
            const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
            const mimeType = matches ? matches[1] : 'image/jpeg'
            const base64Data = matches ? matches[2] : image
            const buffer = Buffer.from(base64Data, 'base64')
            const ext = mimeType.includes('webp') ? 'webp' : mimeType.includes('png') ? 'png' : 'jpg'

            const fd = new FormData()
            fd.append('reqtype', 'fileupload')
            fd.append('fileToUpload', new Blob([buffer], { type: mimeType }), `photo.${ext}`)

            const catboxRes = await fetch('https://catbox.moe/user/api.php', {
              method: 'POST',
              headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
              body: fd
            })
            const url = (await catboxRes.text()).trim()
            if (!url.startsWith('http')) {
              throw new Error(url || 'Upload failed')
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ url }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })

      server.middlewares.use('/api/shorten', (req, res, next) => {
        if (req.method !== 'POST') return next()
        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body)
            const targetUrl = parsed.url
            if (!targetUrl) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ error: 'No url' }))
            }
            const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(targetUrl)}`)
            const data = await response.json()
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    uploadApiPlugin(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        garden: resolve(import.meta.dirname, 'garden.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion-vendor'
          }
        },
      },
    },
  },
})

