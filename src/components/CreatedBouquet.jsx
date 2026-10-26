import React from 'react'
import { motion } from 'framer-motion'

/**
 * Geometric Florist Anchor Positions for Signature Blush Wrap (1420x2400):
 * Stems converge directly into the pink ribbon knot (~bottom: 27%-35%, left: 50%)
 * Every single bloom is 100% visible and strictly contained inside the pink paper wings.
 */
function getSlotsForBlush(total) {
  if (total <= 1) {
    return [
      { left: 50, bottom: 26, width: 54, height: 62, rotate: 0, zIndex: 14 }
    ]
  }
  if (total === 2) {
    return [
      { left: 43, bottom: 28, width: 50, height: 60, rotate: -10, zIndex: 12 },
      { left: 57, bottom: 28, width: 50, height: 60, rotate: 10, zIndex: 12 }
    ]
  }
  if (total === 3) {
    return [
      { left: 41, bottom: 28, width: 48, height: 58, rotate: -14, zIndex: 12 },
      { left: 50, bottom: 31, width: 52, height: 62, rotate: 0, zIndex: 14 },
      { left: 59, bottom: 28, width: 48, height: 58, rotate: 14, zIndex: 12 }
    ]
  }
  if (total === 4) {
    return [
      { left: 39, bottom: 28, width: 47, height: 58, rotate: -16, zIndex: 12 },
      { left: 47, bottom: 32, width: 49, height: 62, rotate: -6, zIndex: 13 },
      { left: 53, bottom: 32, width: 49, height: 62, rotate: 6, zIndex: 13 },
      { left: 61, bottom: 28, width: 47, height: 58, rotate: 16, zIndex: 12 }
    ]
  }
  if (total === 5) {
    return [
      { left: 44, bottom: 33, width: 48, height: 63, rotate: -12, zIndex: 11 },
      { left: 56, bottom: 33, width: 48, height: 63, rotate: 12, zIndex: 11 },
      { left: 38, bottom: 27, width: 47, height: 58, rotate: -17, zIndex: 13 },
      { left: 62, bottom: 27, width: 47, height: 58, rotate: 17, zIndex: 13 },
      { left: 50, bottom: 24, width: 54, height: 57, rotate: 0, zIndex: 15 }
    ]
  }
  return [
    { left: 44, bottom: 34, width: 49, height: 64, rotate: -11, zIndex: 11 },
    { left: 56, bottom: 34, width: 49, height: 64, rotate: 11, zIndex: 11 },
    { left: 37, bottom: 28, width: 47, height: 58, rotate: -17, zIndex: 13 },
    { left: 50, bottom: 30, width: 50, height: 60, rotate: 1, zIndex: 14 },
    { left: 63, bottom: 28, width: 47, height: 58, rotate: 17, zIndex: 13 },
    { left: 50, bottom: 24, width: 54, height: 57, rotate: -2, zIndex: 16 }
  ]
}

/**
 * Geometric Florist Anchor Positions for Vintage White & Newsprint Wrap (896x1194):
 * Stems converge directly into the olive ribbon knot (~bottom: 43%-50%, left: 50%)
 * Framing the vintage newsprint and staying strictly inside the white pleated wings.
 */
function getSlotsForWhite(total) {
  if (total <= 1) {
    return [
      { left: 50, bottom: 42, width: 48, height: 52, rotate: 0, zIndex: 14 }
    ]
  }
  if (total === 2) {
    return [
      { left: 44, bottom: 45, width: 45, height: 52, rotate: -10, zIndex: 12 },
      { left: 56, bottom: 45, width: 45, height: 52, rotate: 10, zIndex: 12 }
    ]
  }
  if (total === 3) {
    return [
      { left: 42, bottom: 44, width: 43, height: 50, rotate: -13, zIndex: 12 },
      { left: 50, bottom: 47, width: 46, height: 54, rotate: 0, zIndex: 14 },
      { left: 58, bottom: 44, width: 43, height: 50, rotate: 13, zIndex: 12 }
    ]
  }
  if (total === 4) {
    return [
      { left: 40, bottom: 44, width: 42, height: 50, rotate: -15, zIndex: 12 },
      { left: 47, bottom: 47, width: 44, height: 53, rotate: -6, zIndex: 13 },
      { left: 53, bottom: 47, width: 44, height: 53, rotate: 6, zIndex: 13 },
      { left: 60, bottom: 44, width: 42, height: 50, rotate: 15, zIndex: 12 }
    ]
  }
  if (total === 5) {
    return [
      { left: 44, bottom: 47, width: 43, height: 53, rotate: -10, zIndex: 11 },
      { left: 56, bottom: 47, width: 43, height: 53, rotate: 10, zIndex: 11 },
      { left: 39, bottom: 43, width: 42, height: 49, rotate: -15, zIndex: 13 },
      { left: 61, bottom: 43, width: 42, height: 49, rotate: 15, zIndex: 13 },
      { left: 50, bottom: 41, width: 47, height: 49, rotate: 0, zIndex: 15 }
    ]
  }
  return [
    { left: 44, bottom: 47, width: 44, height: 53, rotate: -10, zIndex: 11 },
    { left: 56, bottom: 47, width: 44, height: 53, rotate: 10, zIndex: 11 },
    { left: 39, bottom: 43, width: 41, height: 49, rotate: -15, zIndex: 13 },
    { left: 50, bottom: 45, width: 44, height: 51, rotate: 1, zIndex: 14 },
    { left: 61, bottom: 43, width: 41, height: 49, rotate: 15, zIndex: 13 },
    { left: 50, bottom: 41, width: 46, height: 49, rotate: -2, zIndex: 16 }
  ]
}

const WRAPPER_CONFIGS = {
  blush: {
    backImg: '/pink-wrapper.png',
    frontImg: '/wrapper_front.png',
    alt: 'Signature Blush Silk Wrapper',
    glow: 'bg-rose-200/40',
    emptyTop: 'top-[34%]',
    emptyBadge: 'bg-white/90 border-rose-200 text-[#841b2d]',
    sparkles: {
      s1: 'top-[21%] right-[18%] text-yellow-300',
      s2: 'top-[33%] left-[16%] text-pink-300',
      s3: 'top-[46%] right-[22%] text-amber-200'
    },
    sizeClasses: {
      hero: 'w-full max-w-[430px] sm:max-w-[480px] aspect-[1610/2400]',
      studio: 'w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[530px] aspect-[1610/2400]',
      compact: 'w-full max-w-[320px] sm:max-w-[360px] aspect-[1610/2400]',
      preview: 'h-full max-h-[460px] sm:max-h-[490px] aspect-[1610/2400] scale-115 sm:scale-125 origin-center',
      mini: 'h-full aspect-[1610/2400]'
    },
    getSlots: getSlotsBlushWrapper
  },
  white: {
    backImg: '/white_wrapper.png',
    frontImg: '/white_wrapper_front.png',
    alt: 'Vintage White & Newsprint Wrapper',
    glow: 'bg-emerald-100/40',
    emptyTop: 'top-[30%]',
    emptyBadge: 'bg-white/90 border-stone-200 text-stone-800',
    sparkles: {
      s1: 'top-[18%] right-[16%] text-amber-300',
      s2: 'top-[30%] left-[14%] text-emerald-300',
      s3: 'top-[42%] right-[20%] text-slate-200'
    },
    sizeClasses: {
      hero: 'w-full max-w-[440px] sm:max-w-[490px] aspect-[896/1194]',
      studio: 'w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[530px] aspect-[896/1194]',
      compact: 'w-full max-w-[330px] sm:max-w-[370px] aspect-[896/1194]',
      preview: 'h-full max-h-[460px] sm:max-h-[490px] aspect-[896/1194] scale-110 sm:scale-120 origin-center',
      mini: 'h-full aspect-[896/1194]'
    },
    getSlots: getSlotsWhiteWrapper
  }
}

function getSlotsBlushWrapper(total) {
  return getSlotsForBlush(total)
}

function getSlotsWhiteWrapper(total) {
  return getSlotsForWhite(total)
}

/**
 * CreatedBouquet Component
 * Masterpiece bouquet supporting both Signature Blush and Vintage White wrappers.
 * Displays all flowers distinctly, lushly, and fully inside the wrapper wings.
 */
export default function CreatedBouquet({
  flowers = [], // Array of up to 6 flower objects (.image, .name, .emoji, etc.)
  wrapStyle = 'blush', // 'blush' | 'white' | object with .id
  size = 'hero', // 'hero' | 'studio' | 'compact' | 'mini'
  showSparkles = true,
  animate = true,
  className = ''
}) {
  const visibleFlowers = flowers.slice(0, 6)
  
  // Resolve wrapper config (fallback to blush)
  const wrapKey = (typeof wrapStyle === 'string' ? wrapStyle : wrapStyle?.id) === 'white' ? 'white' : 'blush'
  const config = WRAPPER_CONFIGS[wrapKey]
  const slots = config.getSlots(visibleFlowers.length)
  const containerClass = config.sizeClasses[size] || config.sizeClasses.hero

  return (
    <div className={`relative mx-auto select-none ${containerClass} ${className}`}>
      {/* ============================================================== */}
      {/* LAYER 1: BACK WRAPPER & FOLIAGE                                 */}
      {/* Contains paper wings, foliage, baby's breath floral backing     */}
      {/* ============================================================== */}
      <img
        src={config.backImg}
        alt={`${config.alt} Back`}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-0"
        draggable="false"
      />

      {/* ============================================================== */}
      {/* LAYER 2: ALL FLOWERS (EMERGING FROM KNOT IN THE MIDDLE)        */}
      {/* Stems converge at the ribbon knot                              */}
      {/* Every bloom is fully visible and kept inside wrapper wings     */}
      {/* ============================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {visibleFlowers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute ${config.emptyTop} inset-x-0 mx-auto w-56 text-center p-4 rounded-2xl border shadow-md z-20 pointer-events-auto backdrop-blur-md ${config.emptyBadge}`}
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-rose-50 border border-rose-200/60 flex items-center justify-center text-xl shadow-xs">
              💐
            </div>
            <p className="text-xs font-serif-display font-bold text-[#841b2d] tracking-wide">
              Atelier Canvas Ready
            </p>
            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
              Select your favorite blooms from the workshop on the left
            </p>
          </motion.div>
        ) : (
          visibleFlowers.map((flower, idx) => {
            const slot = slots[idx] || slots[0]

            const flowerImg = (
              <div
                className="w-full h-full flex flex-col justify-end items-center transition-transform duration-300 pointer-events-none"
                style={{
                  filter: 'drop-shadow(0 14px 20px rgba(0, 0, 0, 0.35)) drop-shadow(0 4px 8px rgba(132, 27, 45, 0.18))'
                }}
              >
                {flower.image ? (
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="w-full h-full object-contain object-bottom select-none pointer-events-none"
                    draggable="false"
                  />
                ) : (
                  <span className="text-7xl sm:text-8xl select-none filter drop-shadow-md pb-4">
                    {flower.emoji || '🌸'}
                  </span>
                )}
              </div>
            )

            if (!animate) {
              return (
                <div
                  key={`flower-${flower.id}-${idx}`}
                  style={{
                    position: 'absolute',
                    left: `${slot.left}%`,
                    bottom: `${slot.bottom}%`,
                    width: `${slot.width}%`,
                    height: `${slot.height}%`,
                    transformOrigin: 'bottom center',
                    transform: `translateX(-50%) rotate(${slot.rotate}deg)`,
                    zIndex: slot.zIndex
                  }}
                >
                  {flowerImg}
                </div>
              )
            }

            return (
              <motion.div
                key={`flower-${flower.id}-${idx}`}
                initial={{ scale: 0.15, y: 40, opacity: 0 }}
                animate={{
                  scale: 1,
                  y: 0,
                  opacity: 1,
                  rotate: slot.rotate,
                  x: '-50%'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 22,
                  delay: 0.04 * idx
                }}
                style={{
                  position: 'absolute',
                  left: `${slot.left}%`,
                  bottom: `${slot.bottom}%`,
                  width: `${slot.width}%`,
                  height: `${slot.height}%`,
                  transformOrigin: 'bottom center',
                  zIndex: slot.zIndex
                }}
              >
                {flowerImg}
              </motion.div>
            )
          })
        )}
      </div>

      {/* ============================================================== */}
      {/* LAYER 3: FRONT WRAPPER COLLAR & KNOT                           */}
      {/* Hugs the lower stems so flower blooms are 100% visible         */}
      {/* ============================================================== */}
      <img
        src={config.frontImg}
        alt={`${config.alt} Front`}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-20"
        draggable="false"
      />

      {/* ============================================================== */}
      {/* LAYER 4: AMBIENT LUXURY SPARKLES                               */}
      {/* ============================================================== */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute ${config.sparkles.s1} text-sm filter drop-shadow-sm`}
          >
            ✦
          </motion.span>
          <motion.span
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.7, ease: 'easeInOut' }}
            className={`absolute ${config.sparkles.s2} text-xs filter drop-shadow-sm`}
          >
            ✨
          </motion.span>
          <motion.span
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1.2, ease: 'easeInOut' }}
            className={`absolute ${config.sparkles.s3} text-xs filter drop-shadow-sm`}
          >
            ✦
          </motion.span>
        </div>
      )}
    </div>
  )
}
