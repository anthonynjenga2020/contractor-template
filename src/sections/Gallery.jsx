import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../hooks/useReveal.js'

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'hardscape', label: 'Hardscaping & Patios' },
  { id: 'lawn', label: 'Lawn & Turf' },
  { id: 'lighting', label: 'Lighting & Features' }
]

const GALLERY_ITEMS = [
  { id: 1, src: '/scaper (1).jpeg', title: 'Estate Lawn Transformation', category: 'lawn', span: 'col-span-2 row-span-2' },
  { id: 2, src: '/scaper (2).jpeg', title: 'Custom Stone Patio & Seating', category: 'hardscape', span: 'col-span-1 row-span-1' },
  { id: 3, src: '/scaper (3).png', title: 'Modern Walkway Pavers', category: 'hardscape', span: 'col-span-1 row-span-1' },
  { id: 4, src: '/scaper (4).png', title: 'LED Night Ambiance Lighting', category: 'lighting', span: 'col-span-1 row-span-1' },
  { id: 5, src: '/scaper (5).png', title: 'Suburban Lawn & Garden Bed', category: 'lawn', span: 'col-span-1 row-span-1' },
  { id: 6, src: '/scaper (6).png', title: 'Water Feature & Rockery', category: 'lighting', span: 'col-span-2 row-span-1' }
]

export default function Gallery({ config }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const headerRef = useReveal()

  // Support both config images and fallback item metadata
  const images = (config.galleryImages && config.galleryImages.length > 0)
    ? config.galleryImages.map((img, i) => ({
        id: i,
        src: img,
        title: GALLERY_ITEMS[i]?.title || `Project Showcase ${i + 1}`,
        category: GALLERY_ITEMS[i]?.category || (i % 2 === 0 ? 'hardscape' : 'lawn')
      }))
    : GALLERY_ITEMS

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory)

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
  }, [lightboxIndex, filteredImages.length])

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)
  }, [lightboxIndex, filteredImages.length])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, nextImage, prevImage])

  return (
    <section
      id="gallery"
      className="py-28 lg:py-40 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Ambient background glow */}
      <div 
        className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full blur-[180px] opacity-10 pointer-events-none"
        style={{ backgroundColor: 'var(--primary)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="section-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10" style={{ backgroundColor: 'var(--primary)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--primary)' }}>
                Our Portfolio
              </span>
            </div>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-tight">
              Our Work
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm lg:text-right text-sm leading-relaxed">
            Expert craftsmanship. Premium materials. Outdoor spaces built to last.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-800 pb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all relative ${
                activeCategory === cat.id 
                  ? 'text-white bg-primary shadow-md' 
                  : 'text-gray-400 hover:text-white bg-surface border border-gray-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[450px]"
        >
          <AnimatePresence>
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-sm cursor-pointer group relative h-64 sm:h-72 border border-gray-800 hover:border-primary/50 transition-colors"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                    {img.category}
                  </span>
                  <h3 className="text-white font-headline font-bold text-base uppercase">
                    {img.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-xs text-white/80 font-medium">
                    <span>View Photo</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox with Navigation */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Main Image */}
          <div 
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-sm shadow-2xl border border-white/10"
            />
            
            {/* Caption bar */}
            <div className="mt-4 text-center">
              <h3 className="text-white font-headline font-bold text-lg uppercase tracking-wide">
                {filteredImages[lightboxIndex].title}
              </h3>
              <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">
                Image {lightboxIndex + 1} of {filteredImages.length}
              </p>
            </div>

            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center border border-white/20 transition-all shadow-lg"
              aria-label="Previous Image"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center border border-white/20 transition-all shadow-lg"
              aria-label="Next Image"
            >
              ›
            </button>

            {/* Close Button */}
            <button
              className="absolute -top-10 right-0 text-white hover:text-primary text-xl font-bold transition-colors"
              onClick={closeLightbox}
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
