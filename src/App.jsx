import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Plus,
  Minus,
  Copy,
  RotateCcw,
  Play,
  Pause,
  Shuffle,
  ExternalLink,
  Eye,
  Send,
  MessageCircle,
  Music
} from 'lucide-react'
import confetti from 'canvas-confetti'
import CreatedBouquet from './components/CreatedBouquet'
import ScallopCard from './components/ScallopCard'
import { ROMANTIC_MELODIES, romanticAudio } from './utils/romanticAudio'

const MAX_FLOWERS = 6

// 4 Handcrafted Signature Masterpieces from the public/bouquet folder
const PRESET_BOUQUETS = [
  {
    id: 'preset-rose',
    name: 'Velvet Crimson Roses',
    badge: 'Romantic Classic',
    tagline: 'Deep velvet crimson roses tied with delicate dusty blush ribbon',
    meaning: 'Eternal passion, devotion & deepest love',
    flowers: ['Crimson Roses', 'Forest Ferns', 'Blush Silk Bow'],
    image: '/bouquet/rosebouquet.webp',
    glowColor: 'from-rose-400/30 to-red-300/10',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    accentEmoji: '🌹'
  },
  {
    id: 'preset-tulip',
    name: 'Blushing Dutch Tulips',
    badge: 'Gentle Sweetheart',
    tagline: 'Fresh pastel pink and coral tulips tied with artisan peach silk ribbon',
    meaning: 'Playful affection, charm & pure sweetness',
    flowers: ['Pastel Tulips', 'Coral Blooms', 'Peach Silk Ribbon'],
    image: '/bouquet/tulipbouquet.webp',
    glowColor: 'from-pink-400/30 to-rose-200/10',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    accentEmoji: '🌷'
  },
  {
    id: 'preset-lily',
    name: 'Pure Grace Stargazer Lilies',
    badge: 'Pure Devotion',
    tagline: 'Sweet fragrant lilies symbolizing sincere devotion and lifelong love',
    meaning: 'Purity, divine grace & heartfelt loyalty',
    flowers: ['Stargazer Lilies', 'White Petals', 'Satin Wrap'],
    image: '/bouquet/lilybouquet.webp',
    glowColor: 'from-fuchsia-300/30 to-pink-200/10',
    badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
    accentEmoji: '🌸'
  },
  {
    id: 'preset-sunflower',
    name: 'Golden Sunlight Blooms',
    badge: 'Joyful Warmth',
    tagline: 'Lush golden sunburst blooms with rustic botanical accents and organic wrap',
    meaning: 'Bright smiles, warmth & unconditional joy',
    flowers: ['Golden Blooms', 'Wild Bluebells', 'Artisan Twine'],
    image: '/bouquet/sunbouquet.webp',
    glowColor: 'from-amber-300/35 to-yellow-200/10',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    accentEmoji: '☀️'
  }
]

// The 4 Single Flowers from the public/flower folder
const CUSTOM_STEMS = [
  {
    id: 'flower-tulip',
    name: 'Blush Dutch Tulip',
    category: 'Gentle Grace',
    meaning: 'Caring affection, charm & pure romance',
    image: '/flower/tulip.webp',
    color: '#fb7185',
    emoji: '🌷'
  },
  {
    id: 'flower-lily',
    name: 'Pure Stargazer Lily',
    category: 'Divine Elegance',
    meaning: 'Purity, devotion & sincere grace',
    image: '/flower/lily.webp',
    color: '#f472b6',
    emoji: '🌸'
  },
  {
    id: 'flower-rose',
    name: 'Velvet Crimson Rose',
    category: 'Romantic Classic',
    meaning: 'Deep passion & eternal love',
    image: '/flower/rose.webp',
    color: '#e11d48',
    emoji: '🌹'
  },
  {
    id: 'flower-whiterose',
    name: 'Moonlight White Rose',
    category: 'Pure Devotion',
    meaning: 'True innocence, eternal loyalty & pure love',
    image: '/flower/whiterose.webp',
    color: '#f8fafc',
    emoji: '🤍'
  }
]

// The 2 Official Bouquet Wrappers
const WRAPPING_STYLES = [
  {
    id: 'blush',
    name: 'Signature Blush Silk Wrap',
    tagline: 'Flared blush origami folds, delicate eucalyptus & pink silk bow',
    badge: 'Blush Origami',
    image: '/pink-wrapper.webp',
    theme: 'rose',
    accentColor: '#841b2d',
    border: '#f43f5e'
  },
  {
    id: 'white',
    name: 'Vintage White & Newsprint Wrap',
    tagline: 'Vintage print parchment, crisp white pleated wings & olive silk ribbon',
    badge: 'Vintage Newsprint',
    image: '/white_wrapper.webp',
    theme: 'emerald',
    accentColor: '#166534',
    border: '#059669'
  }
]

// Romantic Reel Stories using pre-existing bouquets
const REEL_CARDS = [
  {
    id: 'reel-1',
    title: 'Surprising Her on Our Anniversary',
    subtitle: 'Her tearful smile when she opened the door to red roses',
    link: 'https://www.instagram.com/reels/',
    cover: '/bouquet/rosebouquet.webp',
    tag: 'Anniversary Surprise'
  },
  {
    id: 'reel-2',
    title: 'Morning Delivery Reaction',
    subtitle: 'Waking up to fresh Dutch pastel tulips and a handwritten letter',
    link: 'https://www.instagram.com/reels/',
    cover: '/bouquet/tulipbouquet.webp',
    tag: 'Sweet Moments'
  },
  {
    id: 'reel-3',
    title: 'Moonlight White Rose Date Night',
    subtitle: 'Her eyes lit up when she saw the pure white roses and handwritten letter',
    link: 'https://www.instagram.com/reels/',
    cover: '/flower/whiterose.webp',
    tag: 'Date Night'
  },
  {
    id: 'reel-4',
    title: 'Opening The Silk Love Letter',
    subtitle: 'She read every heartfelt word with tears of joy',
    link: 'https://www.instagram.com/reels/',
    cover: '/bouquet/lilybouquet.webp',
    tag: 'Love Letter'
  }
]

const LOVE_NOTE_PROMPTS = [
  {
    label: 'Rent-Free (10/10)',
    text: "Just a quick love letter because you've been living in my head rent-free since day one. You're my safe space, my biggest flex, and my favorite person all in one. I'm honestly so obsessed with everything about you. Thank you for being mine and for making everything feel so easy. You're a literal 10/10 and I'm never letting go."
  },
  {
    label: 'Forever Love',
    text: 'Every petal here carries a reason why I fell in love with you. Forever and always yours.'
  },
  {
    label: 'Just Because',
    text: 'No special reason needed—just wanted to remind you how deeply loved and cherished you are today.'
  },
  {
    label: 'Anniversary',
    text: 'Another unforgettable year of loving you more with every sunrise. Happy Anniversary, my love.'
  }
]

// Helper: process uploaded polaroid image in crystal-clear High Definition
// Retains the original full quality and resolution so the receiver sees a crisp, beautiful photo
function processPolaroidImage(file, callback) {
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const rawDataUrl = e.target.result

    // For images up to ~1.2MB, keep 100% original uncompressed quality directly
    if (file.size <= 1.2 * 1024 * 1024) {
      callback(rawDataUrl)
      return
    }

    // For very large camera files (e.g. 5MB-15MB from modern smartphone cameras),
    // downscale smoothly to a crisp 1280px HD canvas with high quality 0.92
    const img = new Image()
    img.onload = () => {
      const maxDim = 1280
      let w = img.width
      let h = img.height

      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w)
          w = maxDim
        } else {
          w = Math.round((w * maxDim) / h)
          h = maxDim
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        callback(rawDataUrl)
        return
      }

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, w, h)

      let dataUrl = ''
      try {
        dataUrl = canvas.toDataURL('image/webp', 0.92)
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', 0.92)
        }
      } catch {
        dataUrl = canvas.toDataURL('image/jpeg', 0.92)
      }
      callback(dataUrl || rawDataUrl)
    }
    img.onerror = () => callback(rawDataUrl)
    img.src = rawDataUrl
  }
  reader.onerror = () => {}
  reader.readAsDataURL(file)
}

// Parse URL query parameters for gift link delivery
function getInitialGiftData() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  let photo = params.get('photo') || params.get('photoUrl') || params.get('img') || params.get('pic')
  if (!photo && window.location.hash) {
    try {
      const hashStr = window.location.hash.substring(1)
      const hashParams = new URLSearchParams(hashStr)
      photo = hashParams.get('photo') || hashParams.get('photoUrl') || hashParams.get('img')
      if (!photo) {
        const hashMatch = window.location.hash.match(/[#&]photo=([^&]+)/)
        if (hashMatch && hashMatch[1]) {
          try { photo = decodeURIComponent(hashMatch[1]) } catch { photo = hashMatch[1] }
        }
      }
    } catch {}
  }
  const to = params.get('to')
  const note = params.get('note')
  if (!to && !note && !photo) return null
  const from = params.get('from')
  const wrap = params.get('wrap')
  const preset = params.get('preset')
  const music = params.get('music')
  const musicUrl = params.get('musicUrl') || params.get('song')
  const musicTitle = params.get('musicTitle')
  const stemsParam = params.get('stems')
  let parsedStems = null
  if (stemsParam) {
    try {
      const p = JSON.parse(decodeURIComponent(stemsParam))
      if (Array.isArray(p)) parsedStems = p
    } catch {}
  }
  return { to, from, note, wrap, preset, music, musicUrl, musicTitle, photo, stems: parsedStems }
}

const initialGiftData = getInitialGiftData()

export default function App() {
  // Navigation / Modal States
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(!!initialGiftData)
  
  // flowStep:
  // 'choice' (Select Mode)
  // 'preset-gallery' (4 signature bouquets)
  // 'custom-scratch' (Select up to 6 single flowers)
  // 'crafting' (Artisanal animation assembling flowers + wrapper + foliage)
  // 'write-note' (Show bouquet clearly + note form: for whom, by whom, content)
  // 'share-gift' (2 Options: See Preview OR Send Link)
  // 'recipient-view' (How the receiving person sees the website)
  const [flowStep, setFlowStep] = useState(initialGiftData ? 'recipient-view' : 'choice')

  // Selected preset bouquet if chosen from gallery
  const [selectedPreset, setSelectedPreset] = useState(() => {
    if (initialGiftData?.preset && initialGiftData.preset !== 'custom') {
      const match = PRESET_BOUQUETS.find(
        (p) => p.id === `preset-${initialGiftData.preset}` || p.id === initialGiftData.preset
      )
      return match || null
    }
    return null
  })

  // Custom Builder Stems: Default initialized to exactly 6 flowers or from URL
  const [customStems, setCustomStems] = useState(() => {
    if (initialGiftData?.stems) {
      return CUSTOM_STEMS.map((s) => {
        const found = initialGiftData.stems.find((p) => p.id === s.id)
        return { ...s, count: found ? found.count : 0 }
      })
    }
    return [
      { id: 'flower-tulip', name: 'Blush Dutch Tulip', count: 2, image: '/flower/tulip.webp', emoji: '🌷', color: '#fb7185' },
      { id: 'flower-lily', name: 'Pure Stargazer Lily', count: 2, image: '/flower/lily.webp', emoji: '🌸', color: '#f472b6' },
      { id: 'flower-rose', name: 'Velvet Crimson Rose', count: 1, image: '/flower/rose.webp', emoji: '🌹', color: '#e11d48' },
      { id: 'flower-whiterose', name: 'Moonlight White Rose', count: 1, image: '/flower/whiterose.webp', emoji: '🤍', color: '#f8fafc' }
    ]
  })

  // Selected Wrapper State ('blush' or 'white')
  const [selectedWrapId, setSelectedWrapId] = useState(initialGiftData?.wrap || 'blush')
  const selectedWrap = WRAPPING_STYLES.find((w) => w.id === selectedWrapId) || WRAPPING_STYLES[0]
  const [recipientName, setRecipientName] = useState(() => {
    if (initialGiftData?.to) return initialGiftData.to
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bouquet_recipient_name') || 'Trishna'
    }
    return 'Trishna'
  })
  const [senderName, setSenderName] = useState(() => {
    if (initialGiftData?.from) return initialGiftData.from
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bouquet_sender_name') || 'Radleigh'
    }
    return 'Radleigh'
  })
  const [loveNote, setLoveNote] = useState(() => {
    if (initialGiftData?.note) return initialGiftData.note
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bouquet_love_note')
      if (saved) return saved
    }
    return "Just a quick love letter because you've been living in my head rent-free since day one. You're my safe space, my biggest flex, and my favorite person all in one. I'm honestly so obsessed with everything about you. Thank you for being mine and for making everything feel so easy. You're a literal 10/10 and I'm never letting go."
  })
  // Single Memory Photo (Polaroid) for the Love Letter
  const [polaroidPhoto, setPolaroidPhoto] = useState(() => {
    if (initialGiftData?.photo) {
      try { localStorage.setItem('bouquet_custom_polaroid', initialGiftData.photo) } catch {}
      return initialGiftData.photo
    }
    // Only restore previous local upload if we are NOT viewing someone else's gift link
    if (typeof window !== 'undefined' && !initialGiftData) {
      return localStorage.getItem('bouquet_custom_polaroid') || null
    }
    return null
  })

  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    processPolaroidImage(file, (dataUrl) => {
      setPolaroidPhoto(dataUrl)
      try { localStorage.setItem('bouquet_custom_polaroid', dataUrl) } catch {}
    })
  }

  const handleRemovePhoto = () => {
    setPolaroidPhoto(null)
    setPhotoLinkUrl('')
    try { localStorage.removeItem('bouquet_custom_polaroid') } catch {}
  }

  const [photoInputMode, setPhotoInputMode] = useState('upload') // 'upload' | 'link'
  const [photoLinkUrl, setPhotoLinkUrl] = useState('')
  const [useWifiHost, setUseWifiHost] = useState(false)

  const handlePhotoLinkApply = (url) => {
    const trimmed = (url || '').trim()
    setPhotoLinkUrl(trimmed)
    if (trimmed) {
      setPolaroidPhoto(trimmed)
      try { localStorage.setItem('bouquet_custom_polaroid', trimmed) } catch {}
    }
  }

  // Background Romantic Melody Selection (defaults to blue.mp3)
  const [selectedMusic, setSelectedMusic] = useState(initialGiftData?.music || 'blue')
  const [previewPlayingMelody, setPreviewPlayingMelody] = useState(null)

  // Custom Background Music (from Link or Device)
  const [customMusicUrl, setCustomMusicUrl] = useState(() => {
    if (initialGiftData?.musicUrl) return initialGiftData.musicUrl
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bouquet_custom_music_url') || localStorage.getItem('bouquet_custom_audio') || ''
    }
    return ''
  })
  const [customMusicTitle, setCustomMusicTitle] = useState(() => {
    if (initialGiftData?.musicTitle) return initialGiftData.musicTitle
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bouquet_custom_music_title') || ''
    }
    return ''
  })
  const [customMusicSource, setCustomMusicSource] = useState('link') // 'link' | 'device'
  const [deviceMusicFileName, setDeviceMusicFileName] = useState('')

  useEffect(() => {
    if (customMusicUrl) {
      romanticAudio.setCustomAudio(customMusicUrl, customMusicTitle || 'Custom Romantic Song')
    }
  }, [customMusicUrl, customMusicTitle])

  const handleDeviceMusicUpload = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setDeviceMusicFileName(file.name)
    const suggestedTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
    setCustomMusicTitle(suggestedTitle)  // always set from file name
    const objectUrl = URL.createObjectURL(file)
    setCustomMusicUrl(objectUrl)
    setSelectedMusic('custom')
    // Use suggestedTitle directly (not stale state) so audio manager gets correct title immediately
    romanticAudio.setCustomAudio(objectUrl, suggestedTitle)
    // Auto-play preview immediately so user can hear it right away
    romanticAudio.playMelody('custom')
    setPreviewPlayingMelody('custom')

    if (file.size <= 4 * 1024 * 1024) {
      const reader = new FileReader()
      reader.onload = (uploadEvent) => {
        try {
          localStorage.setItem('bouquet_custom_audio', uploadEvent.target.result)
          localStorage.setItem('bouquet_custom_music_title', suggestedTitle)
        } catch {}
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMusicUrlChange = (val) => {
    setCustomMusicUrl(val)
    if (val) {
      setSelectedMusic('custom')
      romanticAudio.setCustomAudio(val, customMusicTitle || 'Custom Romantic Song')
      try {
        localStorage.setItem('bouquet_custom_music_url', val)
      } catch {}
    }
  }

  const handleToggleMusicPreview = (melodyId) => {
    if (previewPlayingMelody === melodyId) {
      romanticAudio.stop()
      setPreviewPlayingMelody(null)
    } else {
      if (melodyId === 'none') {
        romanticAudio.stop()
        setPreviewPlayingMelody(null)
      } else {
        if (melodyId === 'custom' && customMusicUrl) {
          romanticAudio.setCustomAudio(customMusicUrl, customMusicTitle || 'Custom Romantic Song')
        }
        romanticAudio.playMelody(melodyId)
        setPreviewPlayingMelody(melodyId)
      }
    }
  }

  // Stop preview music when switching views or unmounting
  useEffect(() => {
    return () => {
      romanticAudio.stop()
    }
  }, [])

  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [recipientTab, setRecipientTab] = useState('garden') // 'garden' or 'bouquet'
  const [copiedLink, setCopiedLink] = useState(false)
  const [craftingStepText, setCraftingStepText] = useState('Gathering your selected blooms...')

  // Trigger celebration confetti on mount if gift was received via link
  useEffect(() => {
    if (initialGiftData) {
      const timer = setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#f43f5e', '#fda4af', '#fbbf24', '#e11d48']
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  // Calculate total selected flowers
  const totalStemsCount = customStems.reduce((acc, curr) => acc + curr.count, 0)

  // Flattened array of individual flower objects for the CreatedBouquet component
  const flattenedFlowers = customStems.flatMap((s) =>
    Array.from({ length: s.count }).map(() => ({ ...s }))
  ).slice(0, MAX_FLOWERS)

  // Add stem with strict MAX_FLOWERS limit (max 6)
  const addCustomStem = (stem) => {
    if (totalStemsCount >= MAX_FLOWERS) return
    setCustomStems((prev) => {
      const match = prev.find((s) => s.id === stem.id)
      if (match) {
        return prev.map((s) => (s.id === stem.id ? { ...s, count: s.count + 1 } : s))
      }
      return [...prev, { ...stem, count: 1 }]
    })
  }

  // Remove stem
  const removeCustomStem = (stemId) => {
    setCustomStems((prev) => {
      const match = prev.find((s) => s.id === stemId)
      if (!match || match.count <= 0) return prev
      return prev.map((s) => (s.id === stemId ? { ...s, count: s.count - 1 } : s))
    })
  }

  // Surprise mix of 6 random harmonious stems
  const handleSurpriseMix = () => {
    const stemIds = CUSTOM_STEMS.map((s) => s.id)
    const counts = { 'flower-tulip': 0, 'flower-lily': 0, 'flower-rose': 0, 'flower-whiterose': 0 }
    for (let i = 0; i < MAX_FLOWERS; i++) {
      const randomId = stemIds[Math.floor(Math.random() * stemIds.length)]
      counts[randomId] = (counts[randomId] || 0) + 1
    }
    setCustomStems(
      CUSTOM_STEMS.map((s) => ({
        ...s,
        count: counts[s.id] || 0
      }))
    )
  }

  // Open modal at specific step
  const handleOpenStudio = (initialStep = 'choice') => {
    setFlowStep(initialStep)
    setIsPreviewMode(false)
    setIsSelectionModalOpen(true)
  }

  const handleSelectPreset = (bouquet) => {
    setSelectedPreset(bouquet)
    setFlowStep('write-note')
    setIsPreviewMode(false)
    setIsSelectionModalOpen(true)
  }

  // Handle "Create Bouquet" Action -> triggers crafting animation then opens write-note page directly
  const handleCraftBouquet = () => {
    if (totalStemsCount === 0) return
    setFlowStep('crafting')
    setCraftingStepText(`Gathering your ${totalStemsCount} handpicked blooms...`)

    setTimeout(() => {
      setCraftingStepText('Arranging stems into harmonious floral symmetry...')
    }, 600)

    setTimeout(() => {
      setCraftingStepText("Weaving botanical eucalyptus leaves & delicate baby's breath...")
    }, 1200)

    setTimeout(() => {
      setCraftingStepText(`Folding luxury ${selectedWrap.name} paper & tying silk ribbon...`)
    }, 1800)

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#fda4af', '#fbbf24', '#e11d48']
      })
      setFlowStep('write-note')
    }, 2400)
  }

  // Confirm Note & proceed to Share Options page
  const handleConfirmNote = () => {
    romanticAudio.stop()
    setPreviewPlayingMelody(null)
    try {
      localStorage.setItem('bouquet_recipient_name', recipientName || 'Trishna')
      localStorage.setItem('bouquet_sender_name', senderName || 'Radleigh')
      localStorage.setItem('bouquet_love_note', loveNote)
    } catch {}
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#e11d48', '#f43f5e', '#fda4af', '#fbbf24']
    })
    setFlowStep('share-gift')
  }

  // Generate shareable URL with parameters pointing to Type Garden
  const getShareUrl = (useNetwork = useWifiHost) => {
    if (typeof window === 'undefined') return ''
    const params = new URLSearchParams()
    params.set('to', recipientName || 'Trishna')
    params.set('from', senderName || 'Radleigh')
    params.set('note', loveNote)
    params.set('wrap', selectedWrapId)
    if (selectedMusic === 'custom') {
      params.set('music', 'custom')
      if (customMusicUrl && !customMusicUrl.startsWith('blob:') && !customMusicUrl.startsWith('data:')) {
        params.set('musicUrl', customMusicUrl)
      }
      if (customMusicTitle) {
        params.set('musicTitle', customMusicTitle)
      }
    } else {
      params.set('music', selectedMusic || 'blue')
    }

    if (selectedPreset) {
      // Signature Masterpiece Bouquet chosen from Gallery
      const presetClean = selectedPreset.id.replace('preset-', '')
      params.set('preset', presetClean)
    } else {
      // Custom Handcrafted Bouquet created in Atelier
      params.set('preset', 'custom')
      const stemsData = customStems.filter((s) => s.count > 0).map((s) => ({ id: s.id, count: s.count }))
      params.set('stems', JSON.stringify(stemsData))
      // Identify dominant flower in custom selection
      if (stemsData.length > 0) {
        let maxCount = -1
        let topStem = null
        stemsData.forEach((s) => {
          if (s.count > maxCount) {
            maxCount = s.count
            topStem = s
          }
        })
        if (topStem) {
          if (topStem.id.includes('sunflower') || topStem.id.includes('sun')) params.set('dominant', 'sunflower')
          else if (topStem.id.includes('lily')) params.set('dominant', 'lily')
          else if (topStem.id.includes('tulip')) params.set('dominant', 'tulip')
          else params.set('dominant', 'rose')
        }
      }
    }

    // Determine target host origin (switching to laptop's Wi-Fi LAN IP if testing on mobile phone over Wi-Fi)
    let origin = window.location.origin
    if (useNetwork && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      origin = `http://10.174.35.82:${window.location.port || '5173'}`
    }

    // Direct Image URL: If user provided a web URL (http/https), pass cleanly in query string (~40 bytes)
    if (polaroidPhoto && (polaroidPhoto.startsWith('http://') || polaroidPhoto.startsWith('https://'))) {
      params.set('photoUrl', polaroidPhoto)
    }

    const baseShareUrl = `${origin}/garden.html?${params.toString()}`

    // CRITICAL: Base64 data URLs MUST NEVER be placed in the HTTP query string!
    // Placing base64 in query strings causes HTTP 414 Request-URI Too Large,
    // truncates in WhatsApp/SMS, and breaks sharing completely.
    // Instead, append base64 to the URL Hash Fragment (#photo=...).
    // The HTTP specification (RFC 7230) dictates that hash fragments are NEVER transmitted
    // to the web server in HTTP requests, so Vercel/Nginx return 200 OK without any 414 error,
    // while client-side JavaScript reads it instantly!
    if (polaroidPhoto && polaroidPhoto.startsWith('data:')) {
      return `${baseShareUrl}#photo=${encodeURIComponent(polaroidPhoto)}`
    }

    return baseShareUrl
  }

  // Copy share URL to clipboard with cross-browser fallback
  const handleCopyShareUrl = async () => {
    const url = getShareUrl()
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url)
      } else {
        throw new Error('Clipboard API unavailable')
      }
    } catch {
      // Fallback for mobile and older browser contexts
      try {
        const textArea = document.createElement('textarea')
        textArea.value = url
        textArea.style.position = 'fixed'
        textArea.style.left = '-9999px'
        textArea.style.top = '0'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      } catch (err) {
        console.warn('Fallback copy failed:', err)
      }
    }
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  // Native Web Share API (WhatsApp, Messages, Instagram, AirDrop)
  const handleNativeShare = async () => {
    const url = getShareUrl()
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Handcrafted Botanical Gift for ${recipientName || 'You'} 💐`,
          text: `A special handcrafted bouquet is waiting for you, ${recipientName || 'my love'}! 💐 Open it here:`,
          url: url,
        })
        return
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopyShareUrl()
        }
        return
      }
    }
    handleCopyShareUrl()
  }

  return (
    <div className="relative min-h-screen text-[#3a141b] overflow-x-hidden selection:bg-[#841b2d] selection:text-white bg-transparent">
      {/* ============================================================== */}
      {/* 1. HERO SECTION (Pink Strip Wallpaper with Centerpiece Flowers) */}
      {/* ============================================================== */}
      <section
        className="relative z-10 w-full min-h-screen flex flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/pinkstrip-bg.webp')" }}
      >
        {/* Centered Hero Flowers from public/hero-flower.webp placed directly above pinkstripe background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <img
            src="/hero-flower.webp"
            alt="Hero Floral Centerpiece"
            decoding="async"
            fetchpriority="high"
            className="w-full h-full object-contain object-center scale-100 md:scale-105 pointer-events-none select-none transition-transform duration-1000"
          />
        </div>

        {/* Soft atmospheric gradient tint */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#f9ece6]/30 via-transparent to-[#f7e6df]/40 pointer-events-none" />

        {/* TOP BRAND HEADER */}
        <header className="relative z-20 w-full px-6 md:px-12 pt-8 pb-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif-display text-4xl md:text-5xl tracking-[0.35em] font-light text-[#841b2d] uppercase">
              FLÓR
            </h1>
            <span className="block text-[10px] tracking-[0.45em] uppercase text-[#841b2d]/70 mt-0.5 font-medium">
              Atelier d'Amour
            </span>
          </div>
        </header>

        {/* HERO MAIN BODY */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-between px-6 md:px-14 lg:px-20 pt-2 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2 md:pt-6">
            {/* Left Headline */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md"
            >
              <h2 className="font-serif-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-[#841b2d] uppercase">
                FLOWERS
              </h2>
              <p className="font-serif-display text-2xl md:text-4xl lg:text-5xl text-[#841b2d] font-light tracking-wide mt-2 lowercase leading-tight">
                that whisper what words cannot
              </p>
            </motion.div>

            {/* Right Side Headline */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="md:text-right max-w-md md:ml-auto pt-14 md:pt-32 lg:pt-36"
            >
              <h3 className="font-serif-display text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-[#841b2d] leading-snug">
                Create Her Dream Bouquet in the FLÓR Studio.
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#841b2d]/75 mt-2 font-medium">
                Pick up to 6 custom flowers or choose a signature arrangement
              </p>
            </motion.div>
          </div>

          {/* Action Row - Single Primary Button */}
          <div className="w-full flex justify-end items-center pb-24 md:pb-28 -mt-6 md:-mt-10">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 12px 25px -4px rgba(132, 27, 45, 0.35)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenStudio('choice')}
              className="w-full sm:w-auto cursor-pointer px-9 py-4 bg-gradient-to-r from-[#841b2d] via-[#9c2237] to-[#841b2d] text-white text-xs md:text-sm tracking-widest uppercase font-bold rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>Create Her Dream Bouquet</span>
              <Sparkles className="w-4 h-4 text-pink-300 transition-transform group-hover:rotate-12" />
            </motion.button>
          </div>
        </div>
      </section>



      {/* ============================================================== */}
      {/* 3. REAL COUPLE REELS & STORIES (Pink Strip Wallpaper)          */}
      {/* ============================================================== */}
      <section
        className="relative z-10 py-24 px-6 md:px-14 lg:px-20 bg-cover bg-center bg-no-repeat border-t border-rose-200/50"
        style={{ backgroundImage: "url('/pinkstrip-bg.webp')" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-[#841b2d] font-semibold">
              Cherished Reactions
            </span>
            <h2 className="font-serif-display text-3xl md:text-5xl text-[#841b2d] mt-2 mb-3">
              Couples Unboxing Memories
            </h2>
            <p className="text-sm text-[#841b2d]/75 font-light leading-relaxed">
              Watch real girlfriend unboxing reactions. Every bouquet carries a story that words cannot tell.
            </p>
          </div>

          {/* 4 Cards in 9:16 Aspect Ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REEL_CARDS.map((reel) => (
              <motion.a
                key={reel.id}
                href={reel.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group block w-full h-full cursor-pointer transition-all duration-300"
              >
                <ScallopCard
                  fill="#fffdfa"
                  stroke="#fbcfe8"
                  strokeWidth={1.8}
                  targetR={14}
                  padding="12px"
                  className="h-full flex flex-col justify-between text-left aspect-[9/16]"
                  badgeContent={
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 p-1 shadow-md border-2 border-white flex items-center justify-center text-white">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  }
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#fcefed] to-[#ebd3c7] flex flex-col justify-between p-4 border border-rose-200/60 shadow-xs">
                    {/* Background Bouquet Art inside Reel Card */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 pb-16">
                      <img
                        src={reel.cover}
                        alt={reel.title}
                        className="max-w-[90%] max-h-[75%] object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Atmospheric Dark Overlay for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 group-hover:from-black/90 transition-colors" />

                    {/* Top Badge: Tag & Reel icon */}
                    <div className="relative flex items-center justify-between z-10">
                      <span className="text-[10px] uppercase tracking-wider font-bold bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20">
                        {reel.tag}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#841b2d] transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-13 h-13 rounded-full bg-white/90 backdrop-blur-md text-[#841b2d] flex items-center justify-center shadow-lg group-hover:bg-[#841b2d] group-hover:text-white transition-all duration-300 pl-0.5">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                    </div>

                    {/* Bottom Card Information */}
                    <div className="relative z-10 text-white">
                      <h3 className="font-serif-display text-base sm:text-lg font-bold leading-snug group-hover:text-rose-200 transition-colors">
                        {reel.title}
                      </h3>
                      <p className="text-[11px] text-white/80 mt-1 line-clamp-2 font-light">
                        {reel.subtitle}
                      </p>
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-rose-300 group-hover:text-white transition-colors">
                        <span>Watch Story</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </ScallopCard>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. FOOTER                                                      */}
      {/* ============================================================== */}
      <footer className="relative z-10 bg-[#4a0e17]/95 backdrop-blur-md text-[#fce7ec] py-14 px-6 md:px-14 lg:px-20 border-t border-[#841b2d]/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="font-serif-display text-2xl tracking-[0.25em] font-light text-white uppercase mb-1">
              FLÓR
            </h2>
            <p className="text-xs text-[#fce7ec]/70">
              The premier bespoke bouquet studio for thoughtful boyfriends.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#fce7ec]/70">
            <span>Handcrafted with</span>
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
            <span>exclusively for her</span>
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* 5. FULL-SCREEN BOUQUET ATELIER STUDIO PAGE                     */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isSelectionModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 w-full h-full min-h-screen overflow-y-auto flex flex-col"
            style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fef4f5 15%, #feebef 35%, #fae1e7 65%, #fbd3dc 100%)' }}
          >
            {/* Sticky Studio Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-[#fffbf9]/95 backdrop-blur-md border-b border-[#841b2d]/15 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs shrink-0">
              <div className="flex items-center gap-3 sm:gap-4">
                {flowStep !== 'choice' && flowStep !== 'recipient-view' && (
                  <button
                    onClick={() => {
                      if (flowStep === 'share-gift') {
                        setFlowStep('write-note')
                      } else if (flowStep === 'write-note') {
                        setFlowStep(selectedPreset ? 'preset-gallery' : 'custom-scratch')
                      } else if (flowStep === 'custom-scratch' || flowStep === 'preset-gallery' || flowStep === 'crafting') {
                        setFlowStep('choice')
                      } else {
                        setFlowStep('choice')
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#841b2d]/20 bg-white hover:bg-[#841b2d]/10 text-[#841b2d] text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                    title="Back to previous step"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back</span>
                  </button>
                )}
                <div>
                  <h2 className="font-serif-display text-xl sm:text-2xl text-[#841b2d] flex items-center gap-2">
                    <span>FLÓR Atelier Studio</span>
                    <Sparkles className="w-4 h-4 text-pink-500 inline" />
                  </h2>
                  <p className="text-[11px] text-[#841b2d]/70 hidden sm:block">
                    {flowStep === 'choice' && 'How would you like to create her floral surprise?'}
                    {flowStep === 'preset-gallery' && 'Select from our 4 signature master bouquets: Roses, Tulips, Lilies & Sunbursts'}
                    {flowStep === 'custom-scratch' && `Handpick up to 6 blooms & select your wrapper (${totalStemsCount}/6 chosen)`}
                    {flowStep === 'crafting' && 'Assembling blooms, wrapping paper & botanical foliage...'}
                    {flowStep === 'write-note' && `Write your heartfelt love letter for ${recipientName || 'her'}`}
                    {flowStep === 'share-gift' && `Your bespoke bouquet is ready to share with ${recipientName || 'her'}`}
                    {flowStep === 'recipient-view' && `Viewing the special floral delivery for ${recipientName || 'her'}`}
                  </p>
                </div>
              </div>

              {/* Right: Exit to Landing Page */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSelectionModalOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#841b2d]/10 hover:bg-[#841b2d] text-[#841b2d] hover:text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  <span className="hidden sm:inline">Exit Studio</span>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* FULL-SCREEN STUDIO PAGE CONTENT */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10 flex flex-col justify-center">
                {/* -------------------------------------------------------- */}
                {/* STAGE 1: HOW WOULD YOU LIKE TO SURPRISE HER?            */}
                {/* -------------------------------------------------------- */}
                {flowStep === 'choice' && (
                  <div className="py-4 sm:py-8 max-w-5xl mx-auto w-full">
                    {/* Atmospheric Cute Header */}
                    <div className="text-center mb-10 sm:mb-14">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 border border-rose-300/60 shadow-xs mb-4"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                        <span className="text-[11px] uppercase font-bold tracking-[0.3em] text-[#841b2d]">
                          Atelier Experience • Design Her Moment
                        </span>
                      </motion.div>

                      <h3 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#841b2d] font-normal tracking-wide">
                        How Would You Like to Surprise Her?
                      </h3>
                    </div>

                    {/* The 2 Scalloped Retro Cards Grid (matching reference image style) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
                      {/* CARD 1: Handpick Blooms & Craft From Scratch */}
                      <motion.div
                        whileHover={{ y: -6, scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className="group cursor-pointer transition-all duration-300"
                        onClick={() => {
                          setSelectedPreset(null)
                          setFlowStep('custom-scratch')
                        }}
                      >
                        <ScallopCard
                          fill="#fffdfa"
                          stroke="#fbcfe8"
                          strokeWidth={1.8}
                          targetR={15}
                          className="h-full flex flex-col justify-between text-center"
                        >
                          <div className="pt-2 sm:pt-3">

                            {/* Pink Pill Highlight Banner (like reference image) */}
                            <div className="mb-3.5 sm:mb-4">
                              <span className="inline-block bg-[#fed7e2] text-[#9f1239] font-bold text-[10px] sm:text-[11px] tracking-[0.25em] px-3.5 py-1.5 rounded-sm uppercase shadow-2xs">
                                BESPOKE 6-FLOWER WORKSHOP
                              </span>
                            </div>

                            {/* Retro Serif Headline */}
                            <h4 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#841b2d] tracking-wide leading-snug mb-2 sm:mb-2.5 group-hover:text-[#681322] transition-colors">
                              Create Her Bouquet
                            </h4>

                            {/* Bold Price / Highlight */}
                            <div className="font-serif-display text-lg sm:text-xl text-[#841b2d] font-bold mb-5 sm:mb-6">
                              Pick Up to 6 Blooms
                            </div>

                            {/* Scalloped Inner Display Matching Main Card Border */}
                            <div className="mb-5 sm:mb-6">
                              <ScallopCard
                                fill="#fff3f6"
                                stroke="#fbcfe8"
                                strokeWidth={1.5}
                                targetR={9}
                                padding="14px 18px"
                                shadow="drop-shadow(0 4px 12px rgba(244, 63, 94, 0.08))"
                                className="w-full text-left"
                              >
                                <div className="flex items-center justify-between mb-3 px-0.5">
                                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#841b2d] flex items-center gap-1.5 uppercase font-serif-display">
                                    <span>🌸</span>
                                    <span>CHOICE OF FRESH BLOOMS</span>
                                  </span>
                                  <span className="text-[10px] font-bold text-rose-600 bg-white px-2.5 py-0.5 rounded-full border border-rose-200/80 shadow-2xs">
                                    6 Stems Max
                                  </span>
                                </div>

                                {/* 4 White Cards with Exact Labels */}
                                <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                                  {CUSTOM_STEMS.map((stem) => {
                                    const shortName =
                                      stem.id === 'flower-tulip'
                                        ? 'Blush'
                                        : stem.id === 'flower-lily'
                                        ? 'Pure'
                                        : stem.id === 'flower-rose'
                                        ? 'Velvet'
                                        : 'Moonlight'
                                    return (
                                      <div
                                        key={stem.id}
                                        className="flex flex-col items-center justify-between p-2 rounded-2xl bg-white border border-rose-200/80 hover:border-[#841b2d] shadow-2xs hover:shadow-md hover:-translate-y-1 hover:scale-105 transition-all duration-300 group/stem"
                                      >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center overflow-hidden my-1">
                                          <img
                                            src={stem.image}
                                            alt={stem.name}
                                            className="max-w-full max-h-full object-contain group-hover/stem:scale-115 transition-transform duration-300 drop-shadow-xs"
                                          />
                                        </div>
                                        <span className="text-[10px] sm:text-[11px] font-bold text-[#841b2d] truncate max-w-full font-serif-display">
                                          {shortName}
                                        </span>
                                      </div>
                                    )
                                  })}
                                </div>

                                {/* Bottom Wrapper Row */}
                                <div className="mt-3 pt-2.5 border-t border-rose-200/70 flex items-center justify-between text-[11px] text-[#841b2d]">
                                  <span className="font-semibold flex items-center gap-1.5">
                                    <span>🎀</span>
                                    <span>2 Luxury Wrappers:</span>
                                  </span>
                                  <span className="font-bold text-rose-700 bg-rose-100/90 border border-rose-200/60 px-3 py-0.5 rounded-lg text-[10px] sm:text-[11px] shadow-2xs">
                                    Blush & White
                                  </span>
                                </div>
                              </ScallopCard>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-3 sm:pt-4">
                            <button
                              type="button"
                              className="w-full py-3 px-6 rounded-full bg-[#841b2d] hover:bg-[#681322] text-white text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <span>Start Building Stems</span>
                              <span>🪄</span>
                            </button>
                          </div>
                        </ScallopCard>
                      </motion.div>

                      {/* CARD 2: Pre-Existing Masterpieces */}
                      <motion.div
                        whileHover={{ y: -6, scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className="group cursor-pointer transition-all duration-300"
                        onClick={() => setFlowStep('preset-gallery')}
                      >
                        <ScallopCard
                          fill="#fffdfa"
                          stroke="#fbcfe8"
                          strokeWidth={1.8}
                          targetR={15}
                          className="h-full flex flex-col justify-between text-center"
                        >
                          <div className="pt-2 sm:pt-3">

                            {/* Pink Pill Highlight Banner (like reference image) */}
                            <div className="mb-3.5 sm:mb-4">
                              <span className="inline-block bg-[#fed7e2] text-[#9f1239] font-bold text-[10px] sm:text-[11px] tracking-[0.25em] px-3.5 py-1.5 rounded-sm uppercase shadow-2xs">
                                4 CURATED MASTER BOUQUETS
                              </span>
                            </div>

                            {/* Retro Serif Headline */}
                            <h4 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#841b2d] tracking-wide leading-snug mb-2 sm:mb-2.5 group-hover:text-[#681322] transition-colors">
                              Select From Signatures
                            </h4>

                            {/* Bold Price / Highlight */}
                            <div className="font-serif-display text-lg sm:text-xl text-[#841b2d] font-bold mb-5 sm:mb-6">
                              Instant Floral Perfection
                            </div>

                            {/* Scalloped Inner Display Matching Main Card Border */}
                            <div className="mb-5 sm:mb-6">
                              <ScallopCard
                                fill="#fff3f6"
                                stroke="#fbcfe8"
                                strokeWidth={1.5}
                                targetR={9}
                                padding="14px 18px"
                                shadow="drop-shadow(0 4px 12px rgba(244, 63, 94, 0.08))"
                                className="w-full text-left"
                              >
                                <div className="flex items-center justify-between mb-3 px-0.5">
                                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#841b2d] flex items-center gap-1.5 uppercase font-serif-display">
                                    <span>✨</span>
                                    <span>PRE-EXISTING ARRANGEMENTS</span>
                                  </span>
                                  <span className="text-[10px] font-bold text-rose-600 bg-white px-2.5 py-0.5 rounded-full border border-rose-200/80 shadow-2xs">
                                    Ready to Send
                                  </span>
                                </div>

                                {/* 4 White Cards for 4 Signature Bouquets */}
                                <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                                  {PRESET_BOUQUETS.map((b) => {
                                    const shortName =
                                      b.id === 'preset-rose'
                                        ? 'Velvet'
                                        : b.id === 'preset-tulip'
                                        ? 'Blush'
                                        : b.id === 'preset-lily'
                                        ? 'Grace'
                                        : 'Golden'
                                    return (
                                      <div
                                        key={b.id}
                                        className="flex flex-col items-center justify-between p-2 rounded-2xl bg-white border border-rose-200/80 hover:border-[#841b2d] shadow-2xs hover:shadow-md hover:-translate-y-1 hover:scale-105 transition-all duration-300 group/b"
                                      >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center overflow-hidden my-1 relative">
                                          <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${b.glowColor} opacity-40 blur-xs`} />
                                          <img
                                            src={b.image}
                                            alt={b.name}
                                            className="relative z-10 max-w-full max-h-full object-contain group-hover/b:scale-115 transition-transform duration-300 drop-shadow-xs"
                                          />
                                        </div>
                                        <span className="text-[10px] sm:text-[11px] font-bold text-[#841b2d] truncate max-w-full font-serif-display">
                                          {shortName}
                                        </span>
                                      </div>
                                    )
                                  })}
                                </div>

                                {/* Bottom Masterpiece Row */}
                                <div className="mt-3 pt-2.5 border-t border-rose-200/70 flex items-center justify-between text-[11px] text-[#841b2d]">
                                  <span className="font-semibold flex items-center gap-1.5">
                                    <span>💐</span>
                                    <span>Master Arrangements:</span>
                                  </span>
                                  <span className="font-bold text-rose-700 bg-rose-100/90 border border-rose-200/60 px-3 py-0.5 rounded-lg text-[10px] sm:text-[11px] shadow-2xs">
                                    4 Iconic Styles
                                  </span>
                                </div>
                              </ScallopCard>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-3 sm:pt-4">
                            <button
                              type="button"
                              className="w-full py-3 px-6 rounded-full bg-[#841b2d] hover:bg-[#681322] text-white text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <span>Browse 4 Masterpieces</span>
                              <span>💐</span>
                            </button>
                          </div>
                        </ScallopCard>
                      </motion.div>
                    </div>

                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* STAGE 2A: PRE-EXISTING BOUQUETS (ALL 4 MASTERPIECES)     */}
                {/* -------------------------------------------------------- */}
                {flowStep === 'preset-gallery' && (
                  <div className="py-2 max-w-7xl mx-auto w-full">
                    <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
                      <span className="text-[11px] uppercase font-bold tracking-[0.35em] text-[#841b2d] bg-[#841b2d]/10 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
                        <span>✨</span>
                        <span>All 4 Pre-Existing Masterpieces</span>
                        <span>✨</span>
                      </span>
                      <h3 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#841b2d] font-normal tracking-wide mt-3">
                        Choose From Our 4 Signature Bouquets
                      </h3>
                      <p className="text-xs sm:text-sm text-[#841b2d]/75 mt-2 font-light leading-relaxed">
                        Every bouquet is artistically assembled, lush with fresh greenery and hand-tied silk ribbon. Tap on any bouquet to write her love note & present it to her:
                      </p>
                    </div>

                    {/* 4 Bouquet Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                      {PRESET_BOUQUETS.map((bouquet) => (
                        <motion.div
                          key={bouquet.id}
                          whileHover={{ scale: 1.02, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectPreset(bouquet)}
                          className="group cursor-pointer transition-all duration-300 h-full"
                        >
                          <ScallopCard
                            fill="#fffdfa"
                            stroke="#fbcfe8"
                            strokeWidth={1.8}
                            targetR={15}
                            badgeContent={
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 p-1 shadow-md border-2 border-white flex items-center justify-center text-white text-base">
                                {bouquet.accentEmoji}
                              </div>
                            }
                            className="h-full flex flex-col justify-between text-left"
                          >
                            {/* Top Row: Cute Badge & Heart */}
                            <div className="flex items-center justify-between gap-2 z-10 pt-1">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${bouquet.badgeColor} shadow-2xs`}>
                                <span>{bouquet.accentEmoji}</span>
                                <span>{bouquet.badge}</span>
                              </span>
                              <div className="w-8 h-8 rounded-full bg-white border border-[#841b2d]/15 flex items-center justify-center text-rose-400 group-hover:text-rose-600 group-hover:scale-110 group-hover:bg-rose-50 transition-all shadow-2xs">
                                <Heart className="w-4 h-4 fill-rose-100 group-hover:fill-rose-500 transition-colors" />
                              </div>
                            </div>

                            {/* Bouquet Showcase Image with Ambient Glow Pedestal */}
                            <div className="relative w-full h-56 sm:h-64 flex items-center justify-center my-3">
                              <div className={`absolute inset-4 rounded-full bg-gradient-to-tr ${bouquet.glowColor} blur-2xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`} />
                              <img
                                src={bouquet.image}
                                alt={bouquet.name}
                                className="relative z-10 max-w-full max-h-full object-contain drop-shadow-[0_12px_24px_rgba(132,27,45,0.18)] group-hover:scale-108 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
                              />
                            </div>

                            {/* Tagline & Meaning */}
                            <p className="text-xs text-[#841b2d]/70 italic line-clamp-1 mb-2 px-0.5">
                              &ldquo;{bouquet.meaning}&rdquo;
                            </p>

                            {/* Bottom Row: Name & Choose Bouquet Button */}
                            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#841b2d]/10 z-10">
                              <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#841b2d] group-hover:text-[#681322] transition-colors text-center sm:text-left">
                                {bouquet.name}
                              </h4>
                              <button
                                type="button"
                                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#841b2d] via-[#9e2035] to-[#841b2d] text-white text-xs uppercase tracking-widest font-bold shadow-md group-hover:shadow-lg group-hover:shadow-rose-900/30 flex items-center justify-center gap-2 group-hover:from-[#961e33] group-hover:to-[#681322] transition-all duration-300 pointer-events-none shrink-0"
                              >
                                <span>Choose Bouquet</span>
                                <span className="group-hover:scale-125 transition-transform">💖</span>
                              </button>
                            </div>
                          </ScallopCard>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* STAGE 2B: CREATE BOUQUET (MAX 6 FLOWERS SELECTION)       */}
                {/* -------------------------------------------------------- */}
                {flowStep === 'custom-scratch' && (
                  <div className="py-2 max-w-6xl mx-auto w-full">
                    {/* Atmospheric Cute Header */}
                    <div className="text-center mb-8 sm:mb-10">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 border border-rose-300/60 shadow-xs mb-3"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                        <span className="text-[11px] uppercase font-bold tracking-[0.3em] text-[#841b2d]">
                          Atelier Workshop • Handcraft Her Dream
                        </span>
                      </motion.div>
                      <h3 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#841b2d] font-normal tracking-wide">
                        Create Her Custom Bouquet
                      </h3>
                      <p className="text-xs sm:text-sm text-[#841b2d]/75 mt-2 font-light max-w-xl mx-auto leading-relaxed">
                        Handpick up to 6 fresh botanical blooms, style with luxury wrapping, and watch her bespoke arrangement assemble live in real-time.
                      </p>
                    </div>

                    {/* Equal-Width Twin Cards Grid: Choice Workshop (Left) | Live Preview (Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-6xl mx-auto">
                      {/* ======================================================== */}
                      {/* CARD 1: SELECTION WORKBENCH (50% Width)                  */}
                      {/* ======================================================== */}
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="h-full"
                      >
                        <ScallopCard
                          fill="#fffdfa"
                          stroke="#fbcfe8"
                          strokeWidth={1.8}
                          targetR={15}
                          badgeContent={
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 p-1 shadow-md border-2 border-white flex flex-col items-center justify-center text-white">
                              <Heart className="w-3.5 h-3.5 fill-white" />
                              <span className="text-[7px] font-bold uppercase tracking-wider mt-0.5">PARIS №6</span>
                            </div>
                          }
                          className="h-full flex flex-col justify-between text-center"
                        >
                          <div className="pt-1 sm:pt-2">
                            {/* Pink Pill Highlight Banner (matching choice card style) */}
                            <div className="mb-3 sm:mb-3.5">
                              <span className="inline-block bg-[#fed7e2] text-[#9f1239] font-bold text-[10px] sm:text-[11px] tracking-[0.25em] px-3.5 py-1.5 rounded-sm uppercase shadow-2xs">
                                BESPOKE 6-FLOWER WORKSHOP
                              </span>
                            </div>

                            {/* Retro Serif Headline */}
                            <h4 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#841b2d] tracking-wide leading-snug mb-1.5 group-hover:text-[#681322] transition-colors">
                              Handpick Her Stems
                            </h4>

                            {/* Bold Price / Highlight */}
                            <div className="font-serif-display text-lg sm:text-xl text-[#841b2d] font-bold mb-3.5 sm:mb-4">
                              {totalStemsCount === MAX_FLOWERS ? (
                                <span className="text-emerald-700">6 of 6 Blooms Chosen ✨</span>
                              ) : (
                                <span>Choose Up to 6 Blooms ({totalStemsCount}/6)</span>
                              )}
                            </div>

                            {/* Scalloped Inner Display 1: FRESH BLOOMS */}
                            <div className="mb-3.5 sm:mb-4">
                              <ScallopCard
                                fill="#fff3f6"
                                stroke="#fbcfe8"
                                strokeWidth={1.5}
                                targetR={9}
                                padding="14px 18px"
                                shadow="drop-shadow(0 4px 12px rgba(244, 63, 94, 0.08))"
                                className="w-full text-left"
                              >
                                <div className="flex items-center justify-between mb-2.5 px-0.5">
                                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#841b2d] flex items-center gap-1.5 uppercase font-serif-display">
                                    <span>🌸</span>
                                    <span>CHOICE OF FRESH BLOOMS</span>
                                  </span>
                                  <span
                                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${
                                      totalStemsCount === MAX_FLOWERS
                                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                        : 'bg-white text-rose-600 border-rose-200/80'
                                    }`}
                                  >
                                    {totalStemsCount} / {MAX_FLOWERS} Stems
                                  </span>
                                </div>

                                {/* 4 White Cards for the 4 Flowers */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-2.5">
                                  {CUSTOM_STEMS.map((stem) => {
                                    const count = customStems.find((s) => s.id === stem.id)?.count || 0
                                    const isMaxReached = totalStemsCount >= MAX_FLOWERS
                                    const shortName =
                                      stem.id === 'flower-tulip'
                                        ? 'Blush Tulip'
                                        : stem.id === 'flower-lily'
                                        ? 'Pure Lily'
                                        : stem.id === 'flower-rose'
                                        ? 'Velvet Rose'
                                        : 'Moonlight Rose'

                                    return (
                                      <div
                                        key={stem.id}
                                        className={`flex flex-col items-center justify-between p-2 rounded-2xl bg-white border transition-all duration-300 group/stem ${
                                          count > 0
                                            ? 'border-[#841b2d] ring-1 ring-[#841b2d]/25 shadow-md bg-rose-50/25'
                                            : 'border-rose-200/80 hover:border-[#841b2d] shadow-2xs hover:shadow-xs'
                                        }`}
                                      >
                                        {/* Image */}
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center overflow-hidden my-0.5">
                                          <img
                                            src={stem.image}
                                            alt={stem.name}
                                            className="max-w-full max-h-full object-contain group-hover/stem:scale-115 transition-transform duration-300 drop-shadow-xs"
                                          />
                                        </div>

                                        {/* Name & Meaning */}
                                        <span className="text-[10.5px] sm:text-[11px] font-bold text-[#841b2d] truncate max-w-full font-serif-display text-center">
                                          {shortName}
                                        </span>
                                        <span className="text-[9px] text-[#841b2d]/60 italic truncate max-w-full text-center">
                                          {stem.category}
                                        </span>

                                        {/* Stepper / Add button */}
                                        <div className="mt-1.5 w-full pt-1.5 border-t border-rose-100 flex items-center justify-center">
                                          {count === 0 ? (
                                            <button
                                              type="button"
                                              onClick={() => addCustomStem(stem)}
                                              disabled={isMaxReached}
                                              className="w-full py-1 rounded-lg bg-rose-100/80 hover:bg-[#841b2d] hover:text-white text-[#841b2d] font-bold text-[10px] transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                              <Plus className="w-3 h-3" />
                                              <span>Add</span>
                                            </button>
                                          ) : (
                                            <div className="flex items-center justify-between w-full bg-rose-100/60 rounded-lg p-0.5">
                                              <button
                                                type="button"
                                                onClick={() => removeCustomStem(stem.id)}
                                                className="w-5 h-5 flex items-center justify-center rounded-md bg-white text-[#841b2d] hover:bg-rose-100 transition-colors shadow-2xs cursor-pointer font-bold"
                                              >
                                                <Minus className="w-2.5 h-2.5" />
                                              </button>
                                              <span className="text-[11px] font-bold text-[#841b2d] px-1">
                                                {count}
                                              </span>
                                              <button
                                                type="button"
                                                onClick={() => addCustomStem(stem)}
                                                disabled={isMaxReached}
                                                className="w-5 h-5 flex items-center justify-center rounded-md bg-[#841b2d] text-white hover:bg-[#681322] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer font-bold"
                                              >
                                                <Plus className="w-2.5 h-2.5" />
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>

                                {/* Bottom Quick Actions Row */}
                                <div className="pt-2 border-t border-rose-200/70 flex items-center justify-between text-[11px] text-[#841b2d]">
                                  <button
                                    type="button"
                                    onClick={handleSurpriseMix}
                                    className="font-semibold text-rose-700 bg-white hover:bg-rose-50 border border-rose-200/80 px-3 py-1 rounded-lg text-[10px] sm:text-[11px] shadow-2xs flex items-center gap-1 cursor-pointer transition-colors"
                                  >
                                    <Shuffle className="w-3 h-3" />
                                    <span>Surprise Mix (6 Stems)</span>
                                  </button>
                                  {totalStemsCount > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => setCustomStems((prev) => prev.map((s) => ({ ...s, count: 0 })))}
                                      className="text-[10px] sm:text-[11px] text-[#841b2d]/70 hover:text-[#841b2d] hover:underline cursor-pointer flex items-center gap-1 font-medium"
                                    >
                                      <RotateCcw className="w-2.5 h-2.5" />
                                      <span>Clear</span>
                                    </button>
                                  )}
                                </div>
                              </ScallopCard>
                            </div>

                            {/* Scalloped Inner Display 2: 2 LUXURY WRAPPERS */}
                            <div className="mb-3.5 sm:mb-4">
                              <ScallopCard
                                fill="#fff3f6"
                                stroke="#fbcfe8"
                                strokeWidth={1.5}
                                targetR={9}
                                padding="14px 18px"
                                shadow="drop-shadow(0 4px 12px rgba(244, 63, 94, 0.08))"
                                className="w-full text-left"
                              >
                                <div className="flex items-center justify-between mb-2 px-0.5">
                                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#841b2d] flex items-center gap-1.5 uppercase font-serif-display">
                                    <span>🎀</span>
                                    <span>2 LUXURY WRAPPERS</span>
                                  </span>
                                  <span className="font-bold text-rose-700 bg-rose-100/90 border border-rose-200/60 px-2.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] shadow-2xs">
                                    {selectedWrap.badge}
                                  </span>
                                </div>

                                {/* 2 White Cards for 2 Wrappers */}
                                <div className="grid grid-cols-2 gap-2.5">
                                  {WRAPPING_STYLES.map((wrap) => {
                                    const isSelected = selectedWrapId === wrap.id
                                    return (
                                      <button
                                        key={wrap.id}
                                        type="button"
                                        onClick={() => setSelectedWrapId(wrap.id)}
                                        className={`flex items-center gap-2.5 p-2 rounded-2xl bg-white border text-left transition-all duration-300 cursor-pointer ${
                                          isSelected
                                            ? 'border-[#841b2d] ring-1 ring-[#841b2d] shadow-sm bg-rose-50/30'
                                            : 'border-rose-200/80 hover:border-[#841b2d] shadow-2xs hover:shadow-xs'
                                        }`}
                                      >
                                        <div className="w-10 h-13 rounded-lg bg-white p-0.5 border border-rose-200/60 flex items-center justify-center shrink-0 overflow-hidden">
                                          <img
                                            src={wrap.image}
                                            alt={wrap.name}
                                            className="max-w-full max-h-full object-contain"
                                          />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-bold text-[#841b2d] uppercase truncate">
                                              {wrap.badge}
                                            </span>
                                            {isSelected && (
                                              <span className="w-3.5 h-3.5 rounded-full bg-[#841b2d] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                                                ✓
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-[11px] font-bold text-[#841b2d] truncate font-serif-display mt-0.5">
                                            {wrap.name}
                                          </p>
                                          <p className="text-[9px] text-[#841b2d]/60 truncate">
                                            {wrap.id === 'blush' ? 'Silk Origami Folds' : 'Vintage Italian Print'}
                                          </p>
                                        </div>
                                      </button>
                                    )
                                  })}
                                </div>
                              </ScallopCard>
                            </div>
                          </div>

                          {/* Action Button directly below wrappers (no huge gap) */}
                          <div className="pt-1 sm:pt-2">
                            <button
                              type="button"
                              onClick={handleCraftBouquet}
                              disabled={totalStemsCount === 0}
                              className="w-full py-3.5 px-6 rounded-full bg-[#841b2d] hover:bg-[#681322] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <span>
                                {totalStemsCount === 0
                                  ? 'Pick Blooms to Craft Bouquet'
                                  : `Assemble Her Bouquet (${totalStemsCount} Stems)`}
                              </span>
                              <span>🪄</span>
                            </button>
                          </div>
                        </ScallopCard>
                      </motion.div>

                      {/* ======================================================== */}
                      {/* CARD 2: LIVE BOUQUET PREVIEW (Matching Twin Card)        */}
                      {/* ======================================================== */}
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.08 }}
                        className="h-full"
                      >
                        <ScallopCard
                          fill="#fffdfa"
                          stroke="#fbcfe8"
                          strokeWidth={1.8}
                          targetR={15}
                          padding="20px 14px 20px 14px"
                          badgeContent={
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-1 shadow-md border-2 border-white flex flex-col items-center justify-center text-white">
                              <span className="text-xs">💐</span>
                              <span className="text-[7px] font-bold uppercase tracking-wider mt-0.5">LIVE</span>
                            </div>
                          }
                          className="h-full flex flex-col items-center justify-between text-center sticky top-20"
                        >
                          {/* Text to mention live preview */}
                          <div className="pt-1 sm:pt-2">
                            <div className="mb-2">
                              <span className="inline-block bg-[#fed7e2] text-[#9f1239] font-bold text-[10px] sm:text-[11px] tracking-[0.25em] px-4 py-1.5 rounded-sm uppercase shadow-2xs">
                                LIVE BOUQUET PREVIEW
                              </span>
                            </div>
                            <h4 className="font-serif-display text-2xl sm:text-3xl text-[#841b2d] font-normal tracking-wide">
                              Live Preview
                            </h4>
                          </div>

                          {/* Bouquet Display (fills matching card height with generous size) */}
                          <div className="flex-1 w-full flex items-center justify-center py-2 min-h-[460px] sm:min-h-[540px] lg:min-h-[600px]">
                            <CreatedBouquet
                              flowers={flattenedFlowers}
                              wrapStyle={selectedWrap}
                              size="preview"
                              showSparkles={true}
                              animate={true}
                            />
                          </div>

                        </ScallopCard>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* STAGE 2C: ARTISANAL CRAFTING ANIMATION                   */}
                {/* -------------------------------------------------------- */}
                {flowStep === 'crafting' && (
                  <div className="py-16 max-w-md mx-auto text-center space-y-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-200 to-amber-100 flex items-center justify-center text-3xl shadow-lg border border-[#841b2d]/20"
                    >
                      💐
                    </motion.div>

                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#841b2d]">
                        FLÓR Atelier Studio
                      </span>
                      <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-[#841b2d] mt-1">
                        Crafting Her Bouquet...
                      </h3>
                      <motion.p
                        key={craftingStepText}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-[#841b2d]/80 mt-2 font-medium"
                      >
                        {craftingStepText}
                      </motion.p>
                    </div>

                    {/* Progress dots */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                        className="w-2.5 h-2.5 rounded-full bg-[#841b2d]"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                        className="w-2.5 h-2.5 rounded-full bg-[#841b2d]/60"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                        className="w-2.5 h-2.5 rounded-full bg-[#841b2d]/30"
                      />
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* STAGE 2D: WRITE HER LOVE NOTE & DEDICATION (Clean & Pure) */}
                {/* -------------------------------------------------------- */}
                {flowStep === 'write-note' && (
                  <div className="max-w-5xl mx-auto py-2">
                    {/* Header: Clean & minimal */}
                    <div className="text-center mb-6">
                      <span className="inline-block bg-[#fed7e2] text-[#9f1239] font-bold text-[10px] sm:text-[11px] tracking-[0.25em] px-4 py-1.5 rounded-sm uppercase shadow-2xs mb-2">
                        HER HANDWRITTEN LETTER
                      </span>
                      <h3 className="font-serif-display text-3xl sm:text-4xl text-[#841b2d] font-normal tracking-wide">
                        Write a Note for Her
                      </h3>
                    </div>

                    {/* 2-Column Grid: Bouquet Clearly on Left | Note Form on Right */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left: The Bouquet Image Clearly Displayed */}
                      <div className="lg:col-span-6 flex flex-col items-center justify-center p-2 sm:p-4">
                        {selectedPreset ? (
                          <div className="w-full max-w-[380px] flex items-center justify-center">
                            <img
                              src={selectedPreset.image}
                              alt={selectedPreset.name}
                              className="max-h-[460px] object-contain drop-shadow-xl"
                            />
                          </div>
                        ) : (
                          <div className="w-full max-w-[420px] flex items-center justify-center">
                            <CreatedBouquet
                              flowers={flattenedFlowers}
                              wrapStyle={selectedWrap}
                              size="studio"
                              showSparkles={true}
                              animate={true}
                            />
                          </div>
                        )}
                      </div>

                      {/* Right: The Note Form */}
                      <div className="lg:col-span-6">
                        <ScallopCard
                          fill="#fffdfa"
                          stroke="#fbcfe8"
                          strokeWidth={1.8}
                          targetR={14}
                          badgeContent={
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 p-1 shadow-md border-2 border-white flex flex-col items-center justify-center text-white">
                              <Heart className="w-4 h-4 fill-white" />
                              <span className="text-[7px] font-bold uppercase tracking-wider mt-0.5">NOTE</span>
                            </div>
                          }
                          className="w-full text-left"
                        >
                          <div className="space-y-4 pt-1">
                            {/* For Whom */}
                            <div>
                              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#841b2d] mb-1 font-serif-display">
                                For Whom (Recipient)
                              </label>
                              <input
                                type="text"
                                value={recipientName}
                                onChange={(e) => {
                                  const val = e.target.value
                                  setRecipientName(val)
                                  try { localStorage.setItem('bouquet_recipient_name', val) } catch {}
                                }}
                                placeholder="e.g. My Sweetheart, Trishna"
                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-rose-200 bg-[#fffbfc] focus:outline-none focus:ring-2 focus:ring-[#841b2d]/20 text-[#3a141b] font-medium"
                              />
                            </div>

                            {/* By Whom */}
                            <div>
                              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#841b2d] mb-1 font-serif-display">
                                By Whom (Sender)
                              </label>
                              <input
                                type="text"
                                value={senderName}
                                onChange={(e) => {
                                  const val = e.target.value
                                  setSenderName(val)
                                  try { localStorage.setItem('bouquet_sender_name', val) } catch {}
                                }}
                                placeholder="e.g. Yours Forever, Radleigh"
                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-rose-200 bg-[#fffbfc] focus:outline-none focus:ring-2 focus:ring-[#841b2d]/20 text-[#3a141b] font-medium"
                              />
                            </div>

                            {/* Content */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#841b2d] font-serif-display">
                                  Letter Content
                                </label>
                                <span className="text-[10px] text-pink-700 italic">Calligraphed with love</span>
                              </div>
                              <textarea
                                rows={4}
                                value={loveNote}
                                onChange={(e) => {
                                  const val = e.target.value
                                  setLoveNote(val)
                                  try { localStorage.setItem('bouquet_love_note', val) } catch {}
                                }}
                                placeholder="Pour your heart out to her..."
                                className="w-full text-xs p-3.5 rounded-xl border border-rose-200 bg-[#fffbfc] focus:outline-none focus:ring-2 focus:ring-[#841b2d]/20 text-[#3a141b] leading-relaxed font-serif"
                              />

                              {/* Inspiration Prompts */}
                              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                <span className="text-[10px] font-bold text-[#841b2d]/60">Prompts:</span>
                                {LOVE_NOTE_PROMPTS.map((prompt) => (
                                  <button
                                    key={prompt.label}
                                    type="button"
                                    onClick={() => {
                                      setLoveNote(prompt.text)
                                      try { localStorage.setItem('bouquet_love_note', prompt.text) } catch {}
                                    }}
                                    className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-100/70 hover:bg-[#841b2d] hover:text-white text-[#841b2d] font-semibold transition-colors cursor-pointer"
                                  >
                                    {prompt.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* 1. Add Couple Memory Photo (Single Polaroid) */}
                            <div className="pt-2 border-t border-rose-200/60">
                              <div className="flex items-center justify-between mb-2">
                                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#841b2d] font-serif-display">
                                  Attach Memory Photo 📸
                                </label>
                                <span className="text-[10px] text-pink-700 italic">Displayed on her love letter polaroid</span>
                              </div>

                              {/* Source Selector: From Device vs From Link */}
                              <div className="flex items-center gap-1.5 mb-2.5">
                                <button
                                  type="button"
                                  onClick={() => setPhotoInputMode('upload')}
                                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                    photoInputMode === 'upload'
                                      ? 'bg-[#841b2d] text-white shadow-2xs'
                                      : 'bg-rose-100/60 text-[#841b2d] hover:bg-rose-150'
                                  }`}
                                >
                                  <span>From Device 📁</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPhotoInputMode('link')}
                                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                    photoInputMode === 'link'
                                      ? 'bg-[#841b2d] text-white shadow-2xs'
                                      : 'bg-rose-100/60 text-[#841b2d] hover:bg-rose-150'
                                  }`}
                                >
                                  <span>From Link 🔗</span>
                                </button>
                              </div>

                              <div className="flex items-center gap-4 p-3 rounded-xl border border-rose-200/80 bg-[#fffbfc] hover:border-[#841b2d] transition-all">
                                <div className="relative w-18 h-22 rounded-lg overflow-hidden border border-rose-200/90 shadow-2xs group bg-rose-50 flex-shrink-0 flex items-center justify-center">
                                  <img
                                    src={polaroidPhoto || '/letter-assets/photo_polaroid.webp'}
                                    alt="Polaroid preview"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                  />
                                  {photoInputMode === 'upload' && (
                                    <label className="absolute inset-0 bg-black/60 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity cursor-pointer text-center p-1">
                                      <span>{polaroidPhoto ? 'Change' : 'Upload'}</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                      />
                                    </label>
                                  )}
                                </div>
                                <div className="flex-1 space-y-1.5">
                                  {photoInputMode === 'upload' ? (
                                    <div className="flex items-center gap-2">
                                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100/80 hover:bg-[#841b2d] hover:text-white text-[#841b2d] text-[11px] font-bold cursor-pointer transition-colors shadow-2xs">
                                        <span>📸</span>
                                        <span>{polaroidPhoto ? 'Change Photo' : 'Upload Couple Photo'}</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handlePhotoUpload}
                                          className="hidden"
                                        />
                                      </label>
                                      {polaroidPhoto && (
                                        <button
                                          type="button"
                                          onClick={handleRemovePhoto}
                                          className="text-[10px] text-[#841b2d]/60 hover:text-rose-800 underline cursor-pointer"
                                        >
                                          Reset to Default
                                        </button>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="space-y-1.5">
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="url"
                                          placeholder="Paste image URL (https://...)"
                                          value={photoLinkUrl}
                                          onChange={(e) => setPhotoLinkUrl(e.target.value)}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              e.preventDefault()
                                              handlePhotoLinkApply(photoLinkUrl)
                                            }
                                          }}
                                          className="flex-1 px-2.5 py-1 text-[11px] border border-rose-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#841b2d] bg-white text-[#841b2d]"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => handlePhotoLinkApply(photoLinkUrl)}
                                          className="px-3 py-1 rounded-lg bg-[#841b2d] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#681322] cursor-pointer"
                                        >
                                          Apply
                                        </button>
                                      </div>
                                      {polaroidPhoto && (
                                        <button
                                          type="button"
                                          onClick={handleRemovePhoto}
                                          className="text-[10px] text-[#841b2d]/60 hover:text-rose-800 underline cursor-pointer"
                                        >
                                          Reset to Default
                                        </button>
                                      )}
                                    </div>
                                  )}
                                  <p className="text-[10px] text-stone-500 leading-tight">
                                    {polaroidPhoto
                                      ? 'Custom memory photo attached to her polaroid.'
                                      : 'Using the romantic vintage memory illustration by default.'}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* 2. Romantic Background Music Selection */}
                            <div className="pt-2 border-t border-rose-200/60">
                              <div className="flex items-center justify-between mb-2">
                                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#841b2d] font-serif-display flex items-center gap-1.5">
                                  <Music className="w-3.5 h-3.5 text-[#841b2d]" />
                                  <span>Background Music 🎶</span>
                                </label>
                                <span className="text-[10px] text-pink-700 italic">Plays softly when she opens the gift</span>
                              </div>

                              {/* === YOUR OWN MUSIC (always visible at top) === */}
                              <div className="mb-3 p-3 rounded-2xl bg-gradient-to-br from-[#fdf4f7] to-[#fef0f4] border-2 border-[#841b2d]/25 shadow-xs">
                                <div className="flex items-center gap-2 mb-2.5">
                                  <span className="text-base">🎵</span>
                                  <span className="text-[11px] font-bold text-[#841b2d] uppercase tracking-wider">Add Your Own Song</span>
                                  {selectedMusic === 'custom' && customMusicUrl && (
                                    <span className="ml-auto text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <span>✓</span> Added
                                    </span>
                                  )}
                                </div>

                                {/* Two clear options: Upload or Link */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {/* Device Upload */}
                                  <div className={`rounded-xl border transition-all overflow-hidden ${
                                    customMusicSource === 'device' && selectedMusic === 'custom'
                                      ? 'border-[#841b2d] bg-rose-50/80 shadow-sm ring-1 ring-[#841b2d]/20'
                                      : 'border-rose-200/60 bg-white/80'
                                  }`}>
                                    <div className="p-2.5">
                                      <div className="flex items-center gap-1.5 mb-2">
                                        <span className="text-sm">📱</span>
                                        <span className="text-[11px] font-bold text-[#841b2d]">Upload from Device</span>
                                      </div>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#841b2d] hover:bg-[#681322] text-white text-[11px] font-bold cursor-pointer transition-all shadow-xs shrink-0">
                                          <span>📁</span>
                                          <span>{deviceMusicFileName ? 'Change File' : 'Choose Music'}</span>
                                          <input
                                            type="file"
                                            accept="audio/*"
                                            onChange={(e) => {
                                              setCustomMusicSource('device')
                                              handleDeviceMusicUpload(e)
                                            }}
                                            className="hidden"
                                          />
                                        </label>
                                        {deviceMusicFileName && selectedMusic === 'custom' && (
                                          <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/80 flex items-center gap-1 flex-1 min-w-0 max-w-full overflow-hidden">
                                            <span className="shrink-0">✓</span>
                                            <span className="truncate">{deviceMusicFileName}</span>
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[9px] text-stone-500 mt-1.5 leading-tight">
                                        mp3, wav, m4a, ogg etc.
                                      </p>
                                    </div>
                                  </div>

                                  {/* Music Link */}
                                  <div className={`rounded-xl border transition-all overflow-hidden ${
                                    customMusicSource === 'link' && selectedMusic === 'custom'
                                      ? 'border-[#841b2d] bg-rose-50/80 shadow-sm ring-1 ring-[#841b2d]/20'
                                      : 'border-rose-200/60 bg-white/80'
                                  }`}>
                                    <div className="p-2.5">
                                      <div className="flex items-center gap-1.5 mb-2">
                                        <span className="text-sm">🔗</span>
                                        <span className="text-[11px] font-bold text-[#841b2d]">Paste Music Link</span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <input
                                          type="url"
                                          value={customMusicUrl && !customMusicUrl.startsWith('blob:') ? customMusicUrl : ''}
                                          onChange={(e) => {
                                            setCustomMusicSource('link')
                                            handleMusicUrlChange(e.target.value)
                                          }}
                                          placeholder="https://…/song.mp3"
                                          className="flex-1 min-w-0 px-2.5 py-1.5 text-[11px] rounded-lg border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#841b2d]/20 text-stone-800"
                                        />
                                        {customMusicUrl && !customMusicUrl.startsWith('blob:') && selectedMusic === 'custom' && (
                                          <button
                                            type="button"
                                            onClick={() => handleToggleMusicPreview('custom')}
                                            title={previewPlayingMelody === 'custom' ? 'Pause' : 'Test link'}
                                            className="p-1.5 rounded-lg bg-rose-100 hover:bg-[#841b2d] hover:text-white text-[#841b2d] transition-all cursor-pointer flex-shrink-0"
                                          >
                                            {previewPlayingMelody === 'custom'
                                              ? <Pause className="w-3 h-3 fill-current" />
                                              : <Play className="w-3 h-3 fill-current ml-0.5" />
                                            }
                                          </button>
                                        )}
                                      </div>
                                      <p className="text-[9px] text-stone-500 mt-1.5 leading-tight">
                                        Direct .mp3 / .wav links work best
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Song title + preview/remove row when custom music set */}
                                {selectedMusic === 'custom' && customMusicUrl && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 pt-2 border-t border-rose-200/50 flex items-center gap-2"
                                  >
                                    <div className="flex-1">
                                      <input
                                        type="text"
                                        value={customMusicTitle}
                                        onChange={(e) => {
                                          setCustomMusicTitle(e.target.value)
                                          try { localStorage.setItem('bouquet_custom_music_title', e.target.value) } catch {}
                                        }}
                                        placeholder="Song name (shown on player badge)"
                                        className="w-full px-2.5 py-1.5 text-[11px] rounded-lg border border-rose-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#841b2d] text-stone-800"
                                      />
                                    </div>
                                    {customMusicUrl && customMusicUrl.startsWith('blob:') && (
                                      <button
                                        type="button"
                                        onClick={() => handleToggleMusicPreview('custom')}
                                        className="px-2.5 py-1.5 rounded-lg bg-rose-100 hover:bg-[#841b2d] hover:text-white text-[#841b2d] text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0"
                                      >
                                        {previewPlayingMelody === 'custom'
                                          ? <><Pause className="w-3 h-3 fill-current" /><span>Pause</span></>
                                          : <><Play className="w-3 h-3 fill-current ml-0.5" /><span>Preview</span></>
                                        }
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        romanticAudio.stop()
                                        setPreviewPlayingMelody(null)
                                        setCustomMusicUrl('')
                                        setDeviceMusicFileName('')
                                        setCustomMusicTitle('')
                                        setSelectedMusic('piano')
                                        try {
                                          localStorage.removeItem('bouquet_custom_music_url')
                                          localStorage.removeItem('bouquet_custom_audio')
                                          localStorage.removeItem('bouquet_custom_music_title')
                                        } catch {}
                                      }}
                                      title="Remove custom song"
                                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 transition-all cursor-pointer shrink-0"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </motion.div>
                                )}

                                {/* Warning for device-uploaded blob URLs */}
                                {selectedMusic === 'custom' && customMusicUrl && customMusicUrl.startsWith('blob:') && (
                                  <p className="mt-1.5 text-[9.5px] text-amber-700 bg-amber-50 border border-amber-200/60 rounded-lg px-2.5 py-1.5 leading-tight">
                                    ⚠️ Device music plays locally. To share with the receiver over a link, paste a direct audio URL in the &ldquo;Paste Music Link&rdquo; box.
                                  </p>
                                )}
                              </div>

                              {/* Divider */}
                              <div className="flex items-center gap-2 mb-2.5">
                                <div className="h-px flex-1 bg-rose-200/50" />
                                <span className="text-[10px] text-[#841b2d]/50 font-semibold uppercase tracking-wider">or choose a preset melody</span>
                                <div className="h-px flex-1 bg-rose-200/50" />
                              </div>

                              {/* === PRESET MELODIES GRID (excludes 'custom' since it's handled above) === */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {ROMANTIC_MELODIES.filter(m => m.id !== 'custom').map((melody) => {
                                  const isSelected = selectedMusic === melody.id
                                  const isPlaying = previewPlayingMelody === melody.id

                                  return (
                                    <div
                                      key={melody.id}
                                      onClick={() => setSelectedMusic(melody.id)}
                                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                        isSelected
                                          ? 'border-[#841b2d] bg-rose-50/70 shadow-xs ring-1 ring-[#841b2d]/30'
                                          : 'border-rose-200/60 bg-white hover:border-rose-300'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span className="text-base flex-shrink-0">{melody.emoji}</span>
                                        <div className="min-w-0">
                                          <div className="flex items-center gap-1.5">
                                            <span className="text-[11px] font-bold text-[#841b2d] truncate">
                                              {melody.name}
                                            </span>
                                            {isSelected && (
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#841b2d] flex-shrink-0" />
                                            )}
                                          </div>
                                          <p className="text-[9.5px] text-stone-500 truncate">{melody.tagline}</p>
                                        </div>
                                      </div>

                                      {/* Listen Preview Button */}
                                      {melody.id !== 'none' && (
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleToggleMusicPreview(melody.id)
                                          }}
                                          title={isPlaying ? 'Pause preview' : 'Listen to preview'}
                                          className={`p-1.5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
                                            isPlaying
                                              ? 'bg-[#841b2d] text-white shadow-xs'
                                              : 'bg-rose-100/80 text-[#841b2d] hover:bg-rose-200'
                                          }`}
                                        >
                                          {isPlaying ? (
                                            <Pause className="w-3 h-3 fill-current" />
                                          ) : (
                                            <Play className="w-3 h-3 fill-current ml-0.5" />
                                          )}
                                        </button>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>

                              {/* (Custom song handled by the 'Add Your Own Song' block above) */}
                            </div>

                            {/* Action Button: Confirm & Proceed */}
                            <div className="pt-2">
                              <button
                                type="button"
                                onClick={handleConfirmNote}
                                className="w-full py-3.5 px-6 rounded-full bg-[#841b2d] hover:bg-[#681322] text-white text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <span>Confirm Note & Proceed</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </ScallopCard>
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* STAGE 2E: SHARE OPTIONS (Preview OR Send Link)           */}
                {/* -------------------------------------------------------- */}
                {flowStep === 'share-gift' && (
                  <div className="max-w-4xl mx-auto py-2 space-y-6">
                    {/* Header */}
                    <div className="text-center">
                      <span className="inline-block bg-[#fed7e2] text-[#9f1239] font-bold text-[10px] sm:text-[11px] tracking-[0.25em] px-4 py-1.5 rounded-sm uppercase shadow-2xs mb-2">
                        BOUQUET & LETTER PREPARED
                      </span>
                      <h3 className="font-serif-display text-3xl sm:text-4xl text-[#841b2d] font-normal tracking-wide">
                        Choose How to Share
                      </h3>
                      <p className="text-xs sm:text-sm text-[#841b2d]/70 mt-1 max-w-md mx-auto font-light">
                        Your handcrafted bouquet and personal note for {recipientName} are ready to be unveiled.
                      </p>
                    </div>

                    {/* 2 Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                      {/* OPTION 1: SEE PREVIEW */}
                      <ScallopCard
                        fill="#fffdfa"
                        stroke="#fbcfe8"
                        strokeWidth={1.8}
                        targetR={14}
                        badgeContent={
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 p-1 shadow-md border-2 border-white flex flex-col items-center justify-center text-white">
                            <Eye className="w-4 h-4" />
                            <span className="text-[7px] font-bold uppercase tracking-wider mt-0.5">VIEW</span>
                          </div>
                        }
                        className="h-full flex flex-col justify-between text-center"
                      >
                        <div className="pt-2">
                          <span className="inline-block bg-[#fed7e2] text-[#9f1239] font-bold text-[9px] sm:text-[10px] tracking-[0.2em] px-3 py-1 rounded-sm uppercase shadow-2xs mb-2">
                            OPTION 1
                          </span>
                          <h4 className="font-serif-display text-2xl text-[#841b2d] font-bold mb-2">
                            See Preview
                          </h4>
                          <p className="text-xs text-[#841b2d]/70 leading-relaxed mb-6">
                            Experience the live interactive Type Garden where roses grow from {recipientName}&apos;s name, plus her love letter and bouquet.
                          </p>

                          {/* Visual Illustration */}
                          <div className="py-5 px-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center justify-center gap-3 text-2xl mb-6">
                            <span>🌿</span>
                            <span className="text-rose-400">→</span>
                            <span>🌹</span>
                            <span className="text-rose-400">→</span>
                            <span>💌</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => {
                              setRecipientTab('garden')
                              setIsPreviewMode(true)
                              setFlowStep('recipient-view')
                              confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } })
                            }}
                            className="w-full py-3.5 px-6 rounded-full bg-[#841b2d] text-white hover:bg-[#681322] text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                            <span>See Live Preview</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => window.open(getShareUrl(), '_blank')}
                            className="w-full py-2 px-4 rounded-full bg-white border border-[#841b2d]/30 text-[#841b2d] hover:bg-rose-50 text-[11px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Open Fullscreen in New Tab</span>
                          </button>
                        </div>
                      </ScallopCard>

                      {/* OPTION 2: SEND LINK */}
                      <ScallopCard
                        fill="#fffdfa"
                        stroke="#fbcfe8"
                        strokeWidth={1.8}
                        targetR={14}
                        badgeContent={
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-1 shadow-md border-2 border-white flex flex-col items-center justify-center text-white">
                            <Send className="w-4 h-4" />
                            <span className="text-[7px] font-bold uppercase tracking-wider mt-0.5">LINK</span>
                          </div>
                        }
                        className="h-full flex flex-col justify-between text-center"
                      >
                        <div className="pt-2">
                          <span className="inline-block bg-[#fed7e2] text-[#9f1239] font-bold text-[9px] sm:text-[10px] tracking-[0.2em] px-3 py-1 rounded-sm uppercase shadow-2xs mb-2">
                            OPTION 2
                          </span>
                          <h4 className="font-serif-display text-2xl text-[#841b2d] font-bold mb-2">
                            Send Link to {recipientName}
                          </h4>
                          <p className="text-xs text-[#841b2d]/70 leading-relaxed mb-4">
                            Copy your private interactive gift link to send directly to her via WhatsApp, iMessage, or Instagram.
                          </p>

                          {/* Cross-Device / Localhost Helper */}
                          {typeof window !== 'undefined' &&
                            (window.location.hostname === 'localhost' ||
                              window.location.hostname === '127.0.0.1') && (
                              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 mb-3 text-[11px] text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-left">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="text-sm">📱</span>
                                  <span className="leading-tight">
                                    {useWifiHost ? (
                                      <span>
                                        <strong>Mobile Wi-Fi mode ON:</strong> Using laptop IP (<code>10.174.35.82</code>)
                                      </span>
                                    ) : (
                                      <span>
                                        <strong>On Localhost:</strong> Switch to Wi-Fi IP to test on mobile phone!
                                      </span>
                                    )}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setUseWifiHost(!useWifiHost)}
                                  className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#841b2d] text-white hover:bg-[#681322] cursor-pointer whitespace-nowrap shadow-2xs"
                                >
                                  {useWifiHost ? 'Switch to Localhost' : 'Use Phone Wi-Fi Link 📱'}
                                </button>
                              </div>
                            )}

                          {/* Link Preview Box */}
                          <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/80 mb-3 flex items-center gap-2 text-left">
                            <input
                              type="text"
                              readOnly
                              value={getShareUrl()}
                              className="w-full bg-transparent text-[11px] text-[#841b2d] font-mono select-all focus:outline-none truncate"
                            />
                          </div>

                          {/* WhatsApp Direct Share Button */}
                          <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                              `A special handcrafted bouquet is waiting for you, ${recipientName || 'my love'}! 💐 Open it here: ${getShareUrl()}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 mb-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#25D366]/30"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Send via WhatsApp</span>
                          </a>
                          {/* Native Share Button (for mobile share sheet: WhatsApp, iMessage, Instagram, AirDrop) */}
                          {typeof navigator !== 'undefined' && !!navigator.share && (
                            <button
                              type="button"
                              onClick={handleNativeShare}
                              className="w-full py-2.5 px-4 mb-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                            >
                              <Send className="w-4 h-4" />
                              <span>Share via Any App 📱</span>
                            </button>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={handleCopyShareUrl}
                          className="w-full py-3.5 px-6 rounded-full bg-[#841b2d] hover:bg-[#681322] text-white text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Private Gift Link'}</span>
                        </button>
                      </ScallopCard>
                    </div>

                    {/* Back to Edit Note button */}
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => setFlowStep('write-note')}
                        className="text-xs font-semibold text-[#841b2d]/70 hover:text-[#841b2d] hover:underline cursor-pointer"
                      >
                        ← Back to Edit Note
                      </button>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* STAGE 2F: RECIPIENT EXPERIENCE (How She Sees It)         */}
                {/* -------------------------------------------------------- */}
                {flowStep === 'recipient-view' && (
                  <div className="max-w-5xl mx-auto py-2 space-y-6">
                    {/* Top Preview Banner (Shown only when in preview mode) */}
                    {isPreviewMode && (
                      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 px-5 rounded-2xl bg-[#841b2d] text-white shadow-md">
                        <div className="flex items-center gap-2.5 text-xs font-medium">
                          <Eye className="w-4 h-4 text-rose-300 flex-shrink-0" />
                          <span>
                            <strong>Preview Mode:</strong> Experiencing the Type Garden as {recipientName} will receive it
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => window.open(getShareUrl(), '_blank')}
                            className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-[#841b2d] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Open Fullscreen</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFlowStep('share-gift')}
                            className="px-3.5 py-1.5 rounded-lg bg-rose-200 hover:bg-white text-[#841b2d] text-xs font-bold transition-all cursor-pointer"
                          >
                            ← Exit Preview
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Recipient Header */}
                    <div className="text-center">
                      <span className="inline-block bg-[#fed7e2] text-[#9f1239] font-bold text-[10px] sm:text-[11px] tracking-[0.25em] px-4 py-1.5 rounded-sm uppercase shadow-2xs mb-2">
                        SPECIAL BOTANICAL DELIVERY
                      </span>
                      <h3 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#841b2d] font-normal tracking-wide">
                        For {recipientName}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#841b2d]/70 mt-1 font-light">
                        Handcrafted with eternal love by <strong className="font-medium text-[#841b2d]">{senderName}</strong>
                      </p>

                      {/* Interactive Section Switcher */}
                      <div className="flex items-center justify-center gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => setRecipientTab('garden')}
                          className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                            recipientTab === 'garden'
                              ? 'bg-[#841b2d] text-white shadow-md'
                              : 'bg-rose-100/70 text-[#841b2d] hover:bg-rose-200/80'
                          }`}
                        >
                          <span>🌸 Type Garden (Live)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRecipientTab('bouquet')}
                          className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                            recipientTab === 'bouquet'
                              ? 'bg-[#841b2d] text-white shadow-md'
                              : 'bg-rose-100/70 text-[#841b2d] hover:bg-rose-200/80'
                          }`}
                        >
                          <span>💐 Bouquet & Love Letter</span>
                        </button>
                      </div>
                    </div>

                    {/* ---------------------------------------------------- */}
                    {/* 1. TYPE GARDEN COMPONENT (Visible by default!)      */}
                    {/* ---------------------------------------------------- */}
                    {(recipientTab === 'garden' || recipientTab === 'both') && (
                      <div className="space-y-3">
                        {/* Interactive Garden Instructions Banner */}
                        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-rose-50/80 border border-rose-200/60 text-[#841b2d] text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-base">🌸</span>
                            <span className="font-medium">
                              <strong>Botanical Experience:</strong> Tap &ldquo;Trishna&rdquo; to watch the cinematic transition and unveil the bouquet!
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-[#841b2d]/80 font-medium">
                            <span>💌 Tap &ldquo;Read Love Letter&rdquo; to unveil your note</span>
                          </div>
                        </div>

                        {/* Standalone Type Garden Canvas Container */}
                        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-[#841b2d]/20 bg-black" style={{ height: 'min(82vh, 760px)', minHeight: '680px' }}>
                          <iframe
                            src={getShareUrl()}
                            className="w-full h-full border-0"
                            title="Type Garden Botanical Generator"
                            allow="clipboard-write"
                          />
                        </div>
                      </div>
                    )}

                    {/* ---------------------------------------------------- */}
                    {/* 2. BOUQUET & LOVE LETTER DISPLAY                     */}
                    {/* ---------------------------------------------------- */}
                    {(recipientTab === 'bouquet' || recipientTab === 'both') && (
                      <div className="space-y-10 pt-4 relative">
                        {/* Bouquet Hero Presentation (Grand Size) */}
                        <div id="recipient-bouquet-stage" className="py-6 flex flex-col items-center justify-center relative min-h-[88vh]">
                          {/* Heading from attached image */}
                          <motion.h2
                            initial={{ opacity: 0, y: -14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="font-cute-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#722834] text-center mb-3 sm:mb-6 tracking-wide select-none drop-shadow-2xs relative z-10 px-4"
                            style={{ fontFamily: "'Patrick Hand', cursive, sans-serif" }}
                          >
                            A beautiful bouquet for a beautiful person{' '}
                            <span className="text-[#841b2d] inline-block ml-1">♥</span>
                          </motion.h2>

                          <div className="absolute w-[620px] sm:w-[920px] h-[620px] sm:h-[920px] rounded-full bg-gradient-to-tr from-rose-300/40 via-pink-200/30 to-transparent blur-3xl pointer-events-none animate-pulse" />
                          {selectedPreset ? (
                            <div className="w-full max-w-[1050px] flex items-center justify-center relative z-10">
                              <img
                                src={selectedPreset.image}
                                alt={selectedPreset.name}
                                className="max-h-[980px] sm:max-h-[1150px] w-auto max-w-[98vw] object-contain drop-shadow-[0_40px_75px_rgba(132,27,45,0.36)] transition-transform duration-500 hover:scale-105"
                              />
                            </div>
                          ) : (
                            <div className="w-full max-w-[1050px] flex items-center justify-center relative z-10">
                              <CreatedBouquet
                                flowers={flattenedFlowers}
                                wrapStyle={selectedWrap}
                                size="studio"
                                showSparkles={true}
                                animate={true}
                              />
                            </div>
                          )}

                          {/* Cute Tap Banner Option (Placed above bottom of wrapper - Enlarged) */}
                          <button
                            type="button"
                            onClick={() => {
                              document.getElementById('recipient-love-letter')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="relative -mt-32 sm:-mt-44 z-20 cursor-pointer flex flex-col items-center group transition-transform duration-300 hover:scale-105 active:scale-95"
                            title="Tap to discover a surprise"
                          >
                            <div className="relative flex items-center justify-center">
                              {/* Left Doodles */}
                              <div className="absolute -left-8 -top-1 flex flex-col items-center gap-1 text-[#722834] opacity-80 pointer-events-none">
                                <span className="text-sm">✦</span>
                                <span className="text-sm">💕</span>
                              </div>

                              {/* Ribbon Body */}
                              <div className="relative px-9 py-3.5 rounded-full bg-gradient-to-r from-[#df8992] via-[#cf7782] to-[#bd6773] border-[2.5px] border-[#5f1d27] shadow-[0_10px_24px_rgba(160,50,65,0.3)] flex items-center gap-3">
                                <span className="text-white font-bold tracking-wider text-base sm:text-lg font-serif drop-shadow-[0_1px_2px_rgba(85,18,28,0.5)]">
                                  TAP HERE
                                </span>
                                <span className="text-[#651f2a] text-base sm:text-lg animate-pulse">♥</span>
                              </div>

                              {/* Right Doodles */}
                              <div className="absolute -right-8 -top-1 flex flex-col items-center gap-1 text-[#722834] opacity-80 pointer-events-none">
                                <span className="text-sm">💕</span>
                                <span className="text-sm">✦</span>
                              </div>
                            </div>
                            <p className="mt-2.5 text-sm sm:text-base font-serif italic text-[#843f4a] font-medium tracking-wide">
                              to discover a surprise ✨
                            </p>
                          </button>
                        </div>

                        {/* Her Love Letter Display with 1 Back to Bouquet Button */}
                        <div id="recipient-love-letter" className="max-w-xl mx-auto pt-4 space-y-3">
                          <div>
                            <button
                              type="button"
                              onClick={() => {
                                document.getElementById('recipient-bouquet-stage')?.scrollIntoView({ behavior: 'smooth' })
                              }}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#fffcf8] to-[#faece6] border border-[#d4af37]/40 text-[#841b2d] font-serif text-xs font-semibold hover:bg-[#841b2d] hover:text-white transition-all shadow-sm cursor-pointer"
                            >
                              ← Fold & Return to Bouquet 💌
                            </button>
                          </div>
                          <ScallopCard
                            fill="#fdfaf4"
                            stroke="#e8b8c2"
                            strokeWidth={1.8}
                            targetR={14}
                            badgeContent={
                              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 p-1 shadow-md border-2 border-white flex flex-col items-center justify-center text-white">
                                <Heart className="w-4 h-4 fill-white" />
                                <span className="text-[7px] font-bold uppercase tracking-wider mt-0.5">LOVE</span>
                              </div>
                            }
                            className="w-full text-left p-6 sm:p-8 shadow-[0_20px_50px_rgba(132,27,45,0.12)]"
                          >
                            <div className="space-y-4">
                              <div className="border-b border-rose-200/60 pb-3 flex items-center justify-between">
                                <span className="font-serif-display text-sm sm:text-base font-bold text-[#841b2d]">
                                  Dearest {recipientName},
                                </span>
                                <span className="text-xs">💌</span>
                              </div>

                              <div className="flex flex-col sm:flex-row items-center gap-5 my-2">
                                <div className="relative w-36 sm:w-44 p-2.5 pb-4 bg-white border border-rose-200/80 rounded-sm shadow-md rotate-[-2deg] flex-shrink-0">
                                  <div className="aspect-[4/5] w-full overflow-hidden rounded-xs bg-rose-50">
                                    <img
                                      src={polaroidPhoto || '/letter-assets/photo_polaroid.webp'}
                                      alt="Couple memory"
                                      decoding="async"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                                <p className="font-serif italic text-sm sm:text-base text-[#3a141b] leading-relaxed whitespace-pre-wrap flex-1">
                                  &ldquo;{loveNote}&rdquo;
                                </p>
                              </div>

                              <div className="border-t border-rose-200/60 pt-3 text-right">
                                <p className="text-xs text-[#841b2d]/70 font-light">With all my love,</p>
                                <p className="font-serif-display text-sm sm:text-base font-bold text-[#841b2d]">
                                  {senderName}
                                </p>
                              </div>
                            </div>
                          </ScallopCard>

                          {/* Bottom Fold Action */}
                          <div className="pt-2 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                document.getElementById('recipient-bouquet-stage')?.scrollIntoView({ behavior: 'smooth' })
                              }}
                              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#fdf8f4] via-[#faece8] to-[#f6ddd8] border border-[#d4af37]/45 text-[#841b2d] font-serif text-xs font-bold hover:bg-[#841b2d] hover:text-white transition-all shadow-sm cursor-pointer"
                            >
                              <span>💌 Fold Letter & Return to Bouquet ✨</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bottom Action */}
                    <div className="text-center pt-4">
                      {isPreviewMode ? (
                        <button
                          type="button"
                          onClick={() => setFlowStep('share-gift')}
                          className="py-3 px-8 rounded-full bg-[#841b2d] hover:bg-[#681322] text-white text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                          ← Return to Share Options
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setFlowStep('choice')
                            setIsSelectionModalOpen(true)
                          }}
                          className="py-3 px-8 rounded-full bg-[#841b2d] hover:bg-[#681322] text-white text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
                        >
                          <span>Craft a Bouquet in Return</span>
                          <span>💐</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
