export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const targetUrl = body?.url
    if (!targetUrl) {
      return res.status(400).json({ error: 'No url provided' })
    }
    const response = await fetch(https://is.gd/create.php?format=json&url=)
    const data = await response.json()
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
