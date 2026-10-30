// =========================================================================
// ROMANTIC WEB AUDIO SYNTHESIZER ENGINE
// Zero dependencies, offline-ready, studio-quality romantic background music
// =========================================================================

export const ROMANTIC_MELODIES = [
  {
    id: 'piano',
    name: 'Golden Hour Piano',
    tagline: 'Gentle, emotional romantic piano waltz',
    emoji: '🎹',
    accent: '#f43f5e',
  },
  {
    id: 'musicbox',
    name: 'Vintage Music Box',
    tagline: 'Sweet, delicate tinkling lullaby',
    emoji: '🧸',
    accent: '#fb7185',
  },
  {
    id: 'acoustic',
    name: 'Acoustic Sunset',
    tagline: 'Warm, intimate romantic guitar chords',
    emoji: '🎸',
    accent: '#e11d48',
  },
  {
    id: 'harp',
    name: 'Dreamy Fairy Harp',
    tagline: 'Ethereal, sparkling bell & harp melody',
    emoji: '🌸',
    accent: '#ec4899',
  },
  {
    id: 'custom',
    name: 'Custom Song',
    tagline: 'From link or device music',
    emoji: '🎵',
    accent: '#8b5cf6',
  },
  {
    id: 'none',
    name: 'No Music (Silent)',
    tagline: 'Quiet peaceful reading experience',
    emoji: '🔇',
    accent: '#94a3b8',
  }
]

const FREQS = {
  C2: 65.41, F2: 87.31, G2: 98.00, A2: 110.00,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50, D6: 1174.66, E6: 1318.51, G6: 1567.98, A6: 1760.00
}

class RomanticAudioManager {
  constructor() {
    this.ctx = null
    this.masterGain = null
    this.isPlaying = false
    this.currentMelodyId = null
    this.loopTimer = null
    this.activeNodes = []
    this.customAudio = null
    this.customUrl = null
    this.customTitle = null
  }

  setCustomAudio(url, title = 'Custom Romantic Song') {
    this.customUrl = url
    this.customTitle = title
    if (this.customAudio && url) {
      this.customAudio.src = url
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        this.masterGain = this.ctx.createGain()
        this.masterGain.gain.setValueAtTime(0.20, this.ctx.currentTime)
        this.masterGain.connect(this.ctx.destination)
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
  }

  playNote(freq, startTime, duration = 1.2, type = 'piano', velocity = 0.5) {
    if (!this.ctx || !this.masterGain || !freq) return

    const now = startTime || this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()

    if (type === 'piano') {
      osc.type = 'triangle'
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1600, now)
      filter.frequency.exponentialRampToValueAtTime(600, now + duration)

      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.linearRampToValueAtTime(0.32 * velocity, now + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.12 * velocity, now + 0.3)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    } else if (type === 'musicbox') {
      osc.type = 'sine'
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(3200, now)

      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.linearRampToValueAtTime(0.28 * velocity, now + 0.008)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    } else if (type === 'acoustic') {
      osc.type = 'triangle'
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1200, now)

      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.linearRampToValueAtTime(0.35 * velocity, now + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.05 * velocity, now + 0.4)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    } else {
      // Harp
      osc.type = 'sine'
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(1800, now)
      filter.Q.setValueAtTime(1.2, now)

      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.linearRampToValueAtTime(0.3 * velocity, now + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.3)
    }

    osc.frequency.setValueAtTime(freq, now)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    osc.start(now)
    osc.stop(now + duration + 0.1)

    this.activeNodes.push({ osc, gain, stopTime: now + duration + 0.1 })
  }

  playMelody(melodyId = 'piano') {
    this.stop()
    if (melodyId === 'none') return

    if (melodyId === 'custom') {
      if (this.customUrl) {
        if (!this.customAudio && typeof window !== 'undefined') {
          this.customAudio = new Audio()
          this.customAudio.loop = true
        }
        if (this.customAudio) {
          this.customAudio.src = this.customUrl
          this.customAudio.volume = 0.20 // Low gentle background volume
          this.customAudio.play().catch(() => {})
          this.isPlaying = true
          this.currentMelodyId = 'custom'
        }
      }
      return
    }

    this.init()
    if (!this.ctx) return

    this.isPlaying = true
    this.currentMelodyId = melodyId

    const scheduleLoop = () => {
      if (!this.isPlaying || this.currentMelodyId !== melodyId) return

      const base = this.ctx.currentTime + 0.05
      let loopDuration = 10.0

      if (melodyId === 'piano') {
        loopDuration = 9.6
        // Bar 1: Cmaj7
        this.playNote(FREQS.C3, base + 0.0, 2.4, 'piano', 0.6)
        this.playNote(FREQS.G3, base + 0.05, 2.4, 'piano', 0.5)
        this.playNote(FREQS.B3, base + 0.1, 2.4, 'piano', 0.45)
        this.playNote(FREQS.E4, base + 0.15, 2.4, 'piano', 0.55)

        this.playNote(FREQS.G4, base + 0.0, 1.2, 'piano', 0.7)
        this.playNote(FREQS.C5, base + 0.6, 1.2, 'piano', 0.8)
        this.playNote(FREQS.B4, base + 1.2, 1.2, 'piano', 0.65)
        this.playNote(FREQS.G4, base + 1.8, 1.2, 'piano', 0.55)

        // Bar 2: Am7
        this.playNote(FREQS.A2, base + 2.4, 2.4, 'piano', 0.6)
        this.playNote(FREQS.E3, base + 2.45, 2.4, 'piano', 0.5)
        this.playNote(FREQS.G3, base + 2.5, 2.4, 'piano', 0.45)
        this.playNote(FREQS.C4, base + 2.55, 2.4, 'piano', 0.55)

        this.playNote(FREQS.E4, base + 2.4, 1.2, 'piano', 0.65)
        this.playNote(FREQS.A4, base + 3.0, 1.2, 'piano', 0.75)
        this.playNote(FREQS.C5, base + 3.6, 1.2, 'piano', 0.85)
        this.playNote(FREQS.E5, base + 4.2, 1.2, 'piano', 0.75)

        // Bar 3: Fmaj7
        this.playNote(FREQS.F2, base + 4.8, 2.4, 'piano', 0.6)
        this.playNote(FREQS.C3, base + 4.85, 2.4, 'piano', 0.5)
        this.playNote(FREQS.E3, base + 4.9, 2.4, 'piano', 0.45)
        this.playNote(FREQS.A3, base + 4.95, 2.4, 'piano', 0.55)

        this.playNote(FREQS.F4, base + 4.8, 1.2, 'piano', 0.65)
        this.playNote(FREQS.A4, base + 5.4, 1.2, 'piano', 0.75)
        this.playNote(FREQS.C5, base + 6.0, 1.2, 'piano', 0.8)
        this.playNote(FREQS.D5, base + 6.6, 1.2, 'piano', 0.7)

        // Bar 4: G -> C resolution
        this.playNote(FREQS.G2, base + 7.2, 2.2, 'piano', 0.6)
        this.playNote(FREQS.D3, base + 7.25, 2.2, 'piano', 0.5)
        this.playNote(FREQS.G3, base + 7.3, 2.2, 'piano', 0.45)
        this.playNote(FREQS.B3, base + 7.35, 2.2, 'piano', 0.55)

        this.playNote(FREQS.D5, base + 7.2, 1.2, 'piano', 0.75)
        this.playNote(FREQS.E5, base + 7.8, 1.2, 'piano', 0.85)
        this.playNote(FREQS.D5, base + 8.4, 1.2, 'piano', 0.65)
        this.playNote(FREQS.C5, base + 9.0, 1.4, 'piano', 0.8)
      } else if (melodyId === 'musicbox') {
        loopDuration = 8.4
        const notes = [
          { f: FREQS.E5, t: 0.0 }, { f: FREQS.G5, t: 0.35 }, { f: FREQS.C6, t: 0.7 }, { f: FREQS.B5, t: 1.05 },
          { f: FREQS.G5, t: 1.4 }, { f: FREQS.A5, t: 1.75 }, { f: FREQS.C6, t: 2.1 }, { f: FREQS.E6, t: 2.8 },
          { f: FREQS.D6, t: 3.5 }, { f: FREQS.B5, t: 4.2 }, { f: FREQS.G5, t: 4.55 }, { f: FREQS.A5, t: 4.9 },
          { f: FREQS.C6, t: 5.6 }, { f: FREQS.E5, t: 6.3 }, { f: FREQS.G5, t: 6.65 }, { f: FREQS.C6, t: 7.2 }
        ]
        notes.forEach(n => this.playNote(n.f, base + n.t, 1.1, 'musicbox', 0.75))
      } else if (melodyId === 'acoustic') {
        loopDuration = 8.0
        // Arpeggiated fingerstyle pattern
        const pattern = [
          FREQS.C3, FREQS.G3, FREQS.E4, FREQS.G3,
          FREQS.A2, FREQS.E3, FREQS.C4, FREQS.E3,
          FREQS.F2, FREQS.C3, FREQS.A3, FREQS.C3,
          FREQS.G2, FREQS.D3, FREQS.B3, FREQS.D3
        ]
        pattern.forEach((f, idx) => {
          this.playNote(f, base + idx * 0.5, 0.9, 'acoustic', 0.7)
        })
      } else if (melodyId === 'harp') {
        loopDuration = 8.8
        // Cascading romantic harp glissando
        const harpNotes = [
          FREQS.C4, FREQS.E4, FREQS.G4, FREQS.B4, FREQS.C5, FREQS.E5, FREQS.G5, FREQS.B5,
          FREQS.A5, FREQS.G5, FREQS.E5, FREQS.C5, FREQS.B4, FREQS.G4, FREQS.E4, FREQS.C4
        ]
        harpNotes.forEach((f, idx) => {
          this.playNote(f, base + idx * 0.52, 1.8, 'harp', 0.65)
        })
      }

      this.loopTimer = setTimeout(scheduleLoop, (loopDuration - 0.1) * 1000)
    }

    scheduleLoop()
  }

  stop() {
    this.isPlaying = false
    this.currentMelodyId = null
    if (this.customAudio) {
      try {
        this.customAudio.pause()
        this.customAudio.currentTime = 0
      } catch {}
    }
    if (this.loopTimer) {
      clearTimeout(this.loopTimer)
      this.loopTimer = null
    }
    if (this.activeNodes.length > 0) {
      this.activeNodes.forEach(({ osc, gain }) => {
        try {
          gain.gain.setValueAtTime(gain.gain.value, this.ctx?.currentTime || 0)
          gain.gain.exponentialRampToValueAtTime(0.0001, (this.ctx?.currentTime || 0) + 0.08)
          osc.stop((this.ctx?.currentTime || 0) + 0.1)
        } catch {}
      })
      this.activeNodes = []
    }
  }
}

export const romanticAudio = new RomanticAudioManager()
