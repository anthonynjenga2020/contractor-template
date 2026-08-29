import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function CountUpNumber({ value }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayVal, setDisplayVal] = useState(0)

  // Extract numeric part and suffix/prefix (e.g., "150+" -> num: 150, suffix: "+", "5★" -> num: 5, suffix: "★")
  const numMatch = value.match(/\d+/)
  const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0
  const prefix = value.match(/^[^\d]+/)?.[0] || ''
  const suffix = value.replace(/^[^\d]+/, '').replace(/^\d+/, '') || ''

  useEffect(() => {
    if (!isInView || targetNum === 0) return

    let start = 0
    const duration = 2000 // 2 seconds
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(duration / frameDuration)
    let frame = 0

    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      // Ease out cubic
      const current = Math.round(targetNum * (1 - Math.pow(1 - progress, 3)))
      
      if (frame >= totalFrames) {
        setDisplayVal(targetNum)
        clearInterval(timer)
      } else {
        setDisplayVal(current)
      }
    }, frameDuration)

    return () => clearInterval(timer)
  }, [isInView, targetNum])

  return (
    <span ref={ref}>
      {prefix}{isInView ? displayVal : 0}{suffix}
    </span>
  )
}

export default function Stats({ config }) {
  if (!config.stats?.length) return null

  return (
    <section className="py-8 border-y relative overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
      {/* Background glow */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ backgroundColor: 'var(--primary)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-800/60">
          {config.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="px-4 lg:px-8 py-6 text-center group cursor-default"
            >
              <div
                className="font-headline font-black text-4xl lg:text-5xl mb-1 group-hover:scale-105 transition-transform duration-300"
                style={{ color: 'var(--primary)' }}
              >
                <CountUpNumber value={stat.value} />
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-[0.2em] font-medium group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
