import { motion } from 'framer-motion'

export default function Hero({ config }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/scapervid.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      {/* Glowing orb */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 z-0 pointer-events-none"
        style={{ backgroundColor: 'var(--primary)' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12" style={{ backgroundColor: 'var(--primary)' }} />
            <span
              className="text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: 'var(--primary)' }}
            >
              {config.location}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h1 className="font-headline font-black uppercase leading-[0.9] tracking-tight mb-6">
              <span className="block text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl">
                {config.businessName.split(' ')[0]}
              </span>
              <span
                className="block text-6xl sm:text-8xl lg:text-9xl xl:text-[10rem]"
                style={{ color: 'var(--primary)' }}
              >
                {config.businessName.split(' ').slice(1).join(' ') || 'LANDSCAPING'}
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-gray-300 text-xl sm:text-2xl font-medium italic mb-3 pl-1">
              &ldquo;{config.tagline}&rdquo;
            </p>
            <p className="text-gray-500 text-base sm:text-lg font-light mb-10 pl-1 max-w-xl">
              {config.subTagline}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="btn-primary px-8 py-4 rounded-sm text-base inline-block"
            >
              {config.trialCTA}
            </a>
            <a
              href="#services"
              className="btn-outline px-8 py-4 rounded-sm text-base inline-block"
            >
              View Our Services
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap gap-6 mt-12 pt-10 border-t border-white/10"
          >
            {(config.stats ?? []).map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-headline font-black text-2xl" style={{ color: 'var(--primary)' }}>
                  {stat.value}
                </span>
                <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
                {i < config.stats.length - 1 && (
                  <div className="h-6 w-px bg-white/10 ml-3" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-gray-600 text-xs uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-12 relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '50%',
              backgroundColor: 'var(--primary)',
              animation: 'scrollLine 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { top: -50%; }
          100% { top: 150%; }
        }
      `}</style>
    </section>
  )
}
