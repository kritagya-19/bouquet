import React, { useState, useEffect, useRef } from 'react'

/**
 * ScallopCard: A charming card with authentic scalloped (wavy cloud stamp) edges,
 * warm ivory parchment fill, soft drop shadow, and whimsical retro stickers.
 */
export default function ScallopCard({
  children,
  className = '',
  onClick,
  targetR = 14,
  fill = '#fffcf7',
  stroke = '#fecdd3',
  strokeWidth = 1.5,
  badgeContent = null,
  stickers = [],
  padding = null,
  shadow = 'drop-shadow(0 14px 30px rgba(132, 27, 45, 0.12)) drop-shadow(0 4px 10px rgba(244, 63, 94, 0.08))'
}) {
  const containerRef = useRef(null)
  const [size, setSize] = useState({ w: 420, h: 560 })

  useEffect(() => {
    if (!containerRef.current) return

    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current
        if (offsetWidth > 0 && offsetHeight > 0) {
          setSize({ w: offsetWidth, h: offsetHeight })
        }
      }
    }

    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(containerRef.current)

    return () => ro.disconnect()
  }, [])

  // Generate the scalloped perimeter path
  const { d, rx, ry } = React.useMemo(() => {
    const { w, h } = size
    if (!w || !h) return { d: '', rx: 14, ry: 14 }

    const step = targetR * 2
    const nx = Math.max(3, Math.round(w / step))
    const dx = w / nx
    const rX = dx / 2

    const ny = Math.max(3, Math.round(h / step))
    const dy = h / ny
    const rY = dy / 2

    let path = 'M 0 0 '
    // Top edge (left to right, bulging upward)
    for (let i = 0; i < nx; i++) {
      path += `A ${rX} ${rX} 0 0 1 ${(i + 1) * dx} 0 `
    }
    // Right edge (top to bottom, bulging rightward)
    for (let i = 0; i < ny; i++) {
      path += `A ${rY} ${rY} 0 0 1 ${w} ${(i + 1) * dy} `
    }
    // Bottom edge (right to left, bulging downward)
    for (let i = nx - 1; i >= 0; i--) {
      path += `A ${rX} ${rX} 0 0 1 ${i * dx} ${h} `
    }
    // Left edge (bottom to top, bulging leftward)
    for (let i = ny - 1; i >= 0; i--) {
      path += `A ${rY} ${rY} 0 0 1 0 ${i * dy} `
    }
    path += 'Z'

    return { d: path, rx: rX, ry: rY }
  }, [size, targetR])

  const maxR = Math.max(rx, ry, targetR)

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative select-none ${className}`}
      style={{
        padding: padding || `${Math.round(maxR + 18)}px ${Math.round(maxR + 22)}px`
      }}
    >
      {/* SVG Scalloped Background Shape */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300"
        style={{
          overflow: 'visible',
          filter: shadow
        }}
      >
        <path
          d={d}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          className="transition-colors duration-300"
        />
      </svg>

      {/* Retro Heart Stamp Sticker (Top Right corner) */}
      {badgeContent && (
        <div
          className="absolute -top-4 -right-3 z-20 pointer-events-none transform rotate-12 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
          style={{
            filter: 'drop-shadow(0 6px 12px rgba(132, 27, 45, 0.25))'
          }}
        >
          {badgeContent}
        </div>
      )}

      {/* Whimsical Scattered Stickers */}
      {stickers && stickers.map((sticker, idx) => (
        <div
          key={idx}
          className={`absolute z-20 pointer-events-none transform transition-transform duration-300 ${sticker.className || ''}`}
          style={sticker.style || {}}
        >
          {sticker.content}
        </div>
      ))}

      {/* Card Body Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {children}
      </div>
    </div>
  )
}
