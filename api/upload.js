export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  },
  maxDuration: 30
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const image = body?.image
    if (!image) {
      return res.status(400).json({ error: 'No image provided' })
    }

    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    const mimeType = matches ? matches[1] : 'image/jpeg'
    const base64Data = matches ? matches[2] : image
    const buffer = Buffer.from(base64Data, 'base64')
    const ext = mimeType.includes('webp') ? 'webp' : mimeType.includes('png') ? 'png' : 'jpg'

    // --- Attempt 1: Catbox (free, permanent, no account needed) ---
    try {
      const fd = new FormData()
      fd.append('reqtype', 'fileupload')
      fd.append('fileToUpload', new Blob([buffer], { type: mimeType }), `photo.${ext}`)
      const catboxRes = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        body: fd
      })
      const url = (await catboxRes.text()).trim()
      if (url.startsWith('http')) {
        return res.status(200).json({ url })
      }
    } catch {}

    // --- Attempt 2: imgBB (free tier, 32MB limit, permanent) ---
    try {
      const imgbbKey = process.env.IMGBB_KEY || ''
      if (imgbbKey) {
        const form = new FormData()
        form.append('image', base64Data)
        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
          method: 'POST',
          body: form
        })
        const imgbbData = await imgbbRes.json()
        if (imgbbData?.data?.url) {
          return res.status(200).json({ url: imgbbData.data.url })
        }
      }
    } catch {}

    // --- Attempt 3: freeimage.host (no API key required) ---
    try {
      const form = new FormData()
      form.append('source', base64Data)
      form.append('type', 'base64')
      form.append('action', 'upload')
      const fiRes = await fetch('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5', {
        method: 'POST',
        body: form
      })
      const fiData = await fiRes.json()
      if (fiData?.image?.url) {
        return res.status(200).json({ url: fiData.image.url })
      }
    } catch {}

    return res.status(500).json({ error: 'All upload services failed. Please try a direct image link instead.' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
