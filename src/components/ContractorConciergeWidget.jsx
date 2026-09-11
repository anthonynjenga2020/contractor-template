import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DEFAULT_MESSAGES = [
  {
    sender: 'bot',
    text: "Jambo & Karibu! 🔨 I'm your virtual construction & renovation receptionist. How can I help with your building project today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
]

export default function ContractorConciergeWidget({ config }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(DEFAULT_MESSAGES)
  const [inputQuery, setInputQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isOpen, isTyping])

  const handleSend = (userText) => {
    const text = userText || inputQuery
    if (!text.trim()) return

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newMessages = [...messages, { sender: 'user', text, timestamp: time }]
    setMessages(newMessages)
    if (!userText) setInputQuery('')
    setIsTyping(true)

    setTimeout(() => {
      let botResponse = ""
      const q = text.toLowerCase()

      if (q.includes('quote') || q.includes('estimate') || q.includes('project') || q.includes('cost')) {
        botResponse = `Karibu! You can request a free project estimate online or chat directly with our head project contractor on WhatsApp!`
      } else if (q.includes('service') || q.includes('renovation') || q.includes('build') || q.includes('roof')) {
        botResponse = `We specialize in Full Home Remodeling, Roofing, Kitchen & Bath Renovations, and Commercial Contracting. View our project portfolio online!`
      } else if (q.includes('whatsapp') || q.includes('contact') || q.includes('phone')) {
        botResponse = `You can connect directly with our site supervisor on WhatsApp at +${config?.whatsappNumber}!`
      } else {
        botResponse = `Karibu! I can assist with site inspection scheduling, project estimates, or connecting you directly with our contractor team on WhatsApp.`
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setIsTyping(false)
    }, 850)
  }

  const handleAction = (type) => {
    setIsOpen(false)
    if (type === 'whatsapp') {
      const waMsg = encodeURIComponent(config?.whatsappMessage || 'Hi Karibu Receptionist! I would like to request a project estimate.')
      window.open(`https://wa.me/${config?.whatsappNumber}?text=${waMsg}`, '_blank')
    } else {
      window.location.href = '/#services'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3">
      {/* Floating Karibu Desk Button */}
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="shadow-2xl px-4 py-3 sm:px-5 sm:py-3.5 rounded-full flex items-center gap-2 sm:gap-3 text-xs uppercase tracking-widest font-black border border-white/20 text-white transition-all bg-[#141414]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
          </span>
          <span>{isOpen ? 'Close' : '🔨 Karibu AI'}</span>
        </motion.button>

        {/* AI Receptionist Slide-Up Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-14 sm:bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-96 max-w-sm h-[500px] flex flex-col bg-[#141414] border border-[#222222] shadow-2xl mb-2 rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between bg-[#0A0A0A] border-[#222222]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={config?.heroImageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&q=80'}
                      alt="Karibu Receptionist"
                      className="w-10 h-10 object-cover rounded-full border border-orange-400/30"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0A0A0A] rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-headline text-base text-white font-bold leading-tight">
                      Karibu AI Receptionist
                    </h4>
                    <p className="text-[11px] text-orange-400 font-medium">
                      {config?.businessName || 'Contracting'} Builds
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

              {/* Quick Action Chips */}
              <div className="p-2.5 bg-[#0A0A0A] border-b border-[#222222] flex gap-2 overflow-x-auto text-[10px] font-bold no-scrollbar">
                <button
                  onClick={() => handleAction('services')}
                  className="px-3 py-1.5 bg-[#1C1C1C] border border-[#333333] text-white hover:border-orange-400 shrink-0 transition-colors rounded-lg"
                >
                  🔨 Contracting Services
                </button>
                <button
                  onClick={() => handleAction('whatsapp')}
                  className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 shrink-0 transition-colors rounded-lg"
                >
                  💬 WhatsApp Quote
                </button>
              </div>

              {/* Chat Log */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs font-medium bg-[#0A0A0A]">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[82%] p-3 text-xs leading-relaxed rounded-xl ${
                        m.sender === 'user'
                          ? 'bg-orange-600 text-white'
                          : 'bg-[#1C1C1C] border border-[#333333] text-gray-200'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-gray-500 mt-1 px-1">
                      {m.timestamp}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1 text-xs text-gray-400 bg-[#1C1C1C] border border-[#333333] p-3 rounded-xl w-16">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-100">●</span>
                    <span className="animate-bounce delay-200">●</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-[#141414] border-t border-[#222222]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask Karibu AI receptionist..."
                    className="flex-1 px-3 py-2.5 bg-[#0A0A0A] border border-[#333333] text-white text-xs placeholder-gray-500 outline-none focus:border-orange-400 rounded-xl"
                  />
                  <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shrink-0 rounded-xl transition-colors"
                  >
                    Send
                  </button>
                </form>
                <div className="mt-2 flex justify-between text-[10px] text-gray-500 px-1 font-medium">
                  <span>Powered by Jenga Karibu AI</span>
                  <button
                    onClick={() => handleAction('whatsapp')}
                    className="text-emerald-400 hover:underline"
                  >
                    WhatsApp Chat →
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
