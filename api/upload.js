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

    const fd = new FormData()
    fd.append('reqtype', 'fileupload')
    fd.append('fileToUpload', new Blob([buffer], { type: mimeType }), photo.)

    const catboxRes = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      body: fd
    })
    const url = (await catboxRes.text()).trim()
    if (!url.startsWith('http')) {
      throw new Error(url || 'Upload failed')
    }
    return res.status(200).json({ url })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
