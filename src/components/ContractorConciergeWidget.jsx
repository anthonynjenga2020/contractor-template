import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function ContractorConciergeWidget({ config }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleAction = (route) => {
    setIsOpen(false)
    navigate(route)
  }

  const handleDirectWhatsApp = () => {
    const waMsg = encodeURIComponent(config?.whatsappMessage || 'Hi! I would like to book a site consultation or request a project estimate.')
    window.open(`https://wa.me/${config?.whatsappNumber}?text=${waMsg}`, '_blank')
  }

  const conciergeName = config?.businessName 
    ? `${config.businessName.split(' ')[0]} Concierge`
    : 'Project Concierge'

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Direct WhatsApp Client Portal Floating Button */}
      <motion.a
        href={`https://wa.me/${config?.whatsappNumber}?text=${encodeURIComponent(config?.whatsappMessage || 'Hi! I would like to access the client portal.')}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#25D366] text-white shadow-2xl px-4 py-3.5 rounded-full flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider border border-emerald-400/30 hover:bg-[#20ba5a] transition-all"
        title="Connect directly to client portal via WhatsApp"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span>WhatsApp</span>
      </motion.a>

      {/* Concierge Toggle Button */}
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="shadow-2xl px-5 py-3.5 rounded-full flex items-center gap-3 text-xs uppercase tracking-widest font-black border border-white/20 text-white transition-all bg-[#141414]"
          style={{ backgroundColor: 'var(--surface, #141414)', borderColor: 'var(--border, #222222)' }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>{isOpen ? 'Close Concierge' : '🌿 Concierge'}</span>
        </motion.button>

        {/* Slide-Up Concierge Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 bg-[#141414] border border-[#222222] shadow-2xl overflow-hidden mb-2 rounded-2xl"
              style={{ backgroundColor: 'var(--surface, #141414)', borderColor: 'var(--border, #222222)' }}
            >
              {/* Header */}
              <div 
                className="p-5 border-b flex items-center justify-between bg-[#0A0A0A]"
                style={{ backgroundColor: 'var(--bg, #0A0A0A)', borderColor: 'var(--border, #222222)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={config?.heroImageUrl || config?.aboutImageUrl || 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=200&q=80'}
                      alt="Project Concierge"
                      className="w-12 h-12 object-cover rounded-full border border-emerald-500/30"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0A0A0A] rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-headline text-base text-white font-bold leading-tight">
                      {conciergeName}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium">
                      Online · Direct Project Portal
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Quick Actions List */}
              <div className="p-5 space-y-2.5 text-xs font-medium">
                <p className="text-gray-400 uppercase tracking-widest text-[10px] mb-3 font-bold">
                  How may we assist your project?
                </p>

                {/* WhatsApp Action */}
                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full text-left p-3.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-all flex items-center justify-between font-bold rounded-xl group"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Direct WhatsApp Client Portal</span>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>

                {/* Projects Portfolio */}
                <button
                  onClick={() => handleAction('/projects')}
                  className="w-full text-left p-3.5 bg-black/40 hover:bg-white/5 border border-white/10 hover:border-emerald-400 transition-all flex items-center justify-between rounded-xl group"
                >
                  <span className="text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                    <span>🏡</span>
                    <span>Browse Completed Project Portfolio</span>
                  </span>
                  <span className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                </button>

                {/* Pricing & Packages */}
                <button
                  onClick={() => handleAction('/pricing')}
                  className="w-full text-left p-3.5 bg-black/40 hover:bg-white/5 border border-white/10 hover:border-emerald-400 transition-all flex items-center justify-between rounded-xl group"
                >
                  <span className="text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                    <span>💳</span>
                    <span>Transparent Pricing & Estimates</span>
                  </span>
                  <span className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                </button>

                {/* Maintenance */}
                <button
                  onClick={() => handleAction('/maintenance')}
                  className="w-full text-left p-3.5 bg-black/40 hover:bg-white/5 border border-white/10 hover:border-emerald-400 transition-all flex items-center justify-between rounded-xl group"
                >
                  <span className="text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                    <span>🌿</span>
                    <span>Year-Round Maintenance Plans</span>
                  </span>
                  <span className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                </button>
              </div>

              {/* Footer note */}
              <div 
                className="px-5 py-3 border-t text-[10px] text-gray-400 text-center font-medium bg-[#0A0A0A]"
                style={{ backgroundColor: 'var(--bg, #0A0A0A)', borderColor: 'var(--border, #222222)' }}
              >
                {config?.businessName || 'Landscaping & Contracting'} Concierge · Instant WhatsApp Portal
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
