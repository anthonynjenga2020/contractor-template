import { useState, useMemo } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const SIZES = [
  {
    id: 'small',
    title: 'Courtyard / Small Yard',
    subtitle: '< 1,000 sq ft',
    basePrice: 180000,
    icon: '🏡'
  },
  {
    id: 'medium',
    title: 'Medium Suburban Yard',
    subtitle: '1,000 – 3,500 sq ft',
    basePrice: 380000,
    icon: '🌳'
  },
  {
    id: 'large',
    title: 'Large Estate / Commercial',
    subtitle: '> 3,500 sq ft',
    basePrice: 750000,
    icon: '🏰'
  }
]

const CORE_SERVICES = [
  { id: 'design', title: '3D Landscape Design & Planning', price: 50000, desc: 'Complete 3D renders before build' },
  { id: 'hardscape', title: 'Hardscaping & Patios', price: 120000, desc: 'Stone pavers, walkways, walls' },
  { id: 'turf', title: 'Lawn & Turf Installation', price: 80000, desc: 'Premium sod or artificial turf' },
  { id: 'irrigation', title: 'Smart Irrigation System', price: 65000, desc: 'Automated water-saving setup' }
]

const ADDONS = [
  { id: 'lighting', title: 'LED Landscape Lighting', price: 45000, desc: 'Custom outdoor night ambiance' },
  { id: 'water', title: 'Water Feature / Waterfall', price: 150000, desc: 'Koi pond, fountain, or waterfall' },
  { id: 'firepit', title: 'Custom Outdoor Fire Pit', price: 90000, desc: 'Built-in stone seating & pit' },
  { id: 'pergola', title: 'Pergola / Shade Structure', price: 110000, desc: 'Custom timber or steel pergola' }
]

export default function CostEstimator({ config }) {
  const headerRef = useReveal()
  const calculatorRef = useReveal()

  const [activeStep, setActiveStep] = useState(1)
  const [selectedSize, setSelectedSize] = useState(SIZES[1]) // Default Medium
  const [selectedServices, setSelectedServices] = useState(['hardscape', 'turf'])
  const [selectedAddons, setSelectedAddons] = useState(['lighting'])

  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const toggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const budget = useMemo(() => {
    let min = selectedSize.basePrice
    
    selectedServices.forEach(sId => {
      const s = CORE_SERVICES.find(item => item.id === sId)
      if (s) min += s.price
    })

    selectedAddons.forEach(aId => {
      const a = ADDONS.find(item => item.id === aId)
      if (a) min += a.price
    })

    const max = Math.round(min * 1.25)
    return { min, max }
  }, [selectedSize, selectedServices, selectedAddons])

  const formatCurrency = (val) => {
    return `Ksh ${val.toLocaleString()}`
  }

  const handleWhatsAppSend = () => {
    const serviceNames = selectedServices
      .map(sId => CORE_SERVICES.find(s => s.id === sId)?.title)
      .filter(Boolean)
      .join(', ') || 'None selected'

    const addonNames = selectedAddons
      .map(aId => ADDONS.find(a => a.id === aId)?.title)
      .filter(Boolean)
      .join(', ') || 'None selected'

    const text = `Hi ${config.businessName}! I used your online Cost Estimator tool:

📏 Property Size: ${selectedSize.title} (${selectedSize.subtitle})
🛠️ Services: ${serviceNames}
✨ Upgrades: ${addonNames}

💰 Estimated Range: ${formatCurrency(budget.min)} – ${formatCurrency(budget.max)}

I'd like to confirm this estimate and schedule an on-site consultation.`

    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <section id="calculator" className="py-28 lg:py-40 relative overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
      {/* Background accent */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[220px] opacity-10 pointer-events-none"
        style={{ backgroundColor: 'var(--primary)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="section-reveal text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10" style={{ backgroundColor: 'var(--primary)' }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--primary)' }}>
              Instant Pricing Transparency
            </span>
            <div className="h-px w-10" style={{ backgroundColor: 'var(--primary)' }} />
          </div>
          <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-tight mb-4">
            Project Cost<br />
            <span style={{ color: 'var(--primary)' }}>Estimator.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Get an instant estimated budget range for your project in under 60 seconds. Choose your property scope, services, and desired upgrades.
          </p>
        </div>

        {/* Estimator Container */}
        <div ref={calculatorRef} className="section-reveal grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Controls (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step Tabs Navigation */}
            <div className="flex border-b border-gray-800 pb-4 justify-between gap-2 overflow-x-auto">
              {[
                { num: 1, label: 'Property Size' },
                { num: 2, label: 'Core Services' },
                { num: 3, label: 'Upgrades' }
              ].map(step => (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(step.num)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeStep === step.num 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-black/30 text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    activeStep === step.num ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {step.num}
                  </span>
                  {step.label}
                </button>
              ))}
            </div>

            {/* Step 1: Property Size */}
            {activeStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-white font-headline font-bold text-lg uppercase tracking-wide flex items-center justify-between">
                  <span>1. Select Property Size</span>
                  <span className="text-xs text-gray-500 font-normal">Step 1 of 3</span>
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {SIZES.map(s => {
                    const isSelected = selectedSize.id === s.id
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedSize(s)}
                        className={`p-6 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected 
                            ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                            : 'border-gray-800 bg-[#0A0A0A] hover:border-gray-700'
                        }`}
                      >
                        <div>
                          <div className="text-3xl mb-3">{s.icon}</div>
                          <h4 className="text-white font-bold text-base mb-1">{s.title}</h4>
                          <p className="text-gray-500 text-xs">{s.subtitle}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs text-gray-400">Base</span>
                          <span className="text-xs font-bold text-primary">{formatCurrency(s.basePrice)}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => setActiveStep(2)} 
                    className="btn-primary px-6 py-3 rounded-sm text-xs"
                  >
                    Next: Choose Services →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Core Services */}
            {activeStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-white font-headline font-bold text-lg uppercase tracking-wide flex items-center justify-between">
                  <span>2. Select Core Services</span>
                  <span className="text-xs text-gray-500 font-normal">Step 2 of 3</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {CORE_SERVICES.map(s => {
                    const isSelected = selectedServices.includes(s.id)
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`p-5 rounded-sm border cursor-pointer transition-all flex items-start gap-4 ${
                          isSelected 
                            ? 'border-primary bg-primary/10' 
                            : 'border-gray-800 bg-[#0A0A0A] hover:border-gray-700'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-sm flex items-center justify-center shrink-0 mt-0.5 border ${
                          isSelected ? 'bg-primary border-primary text-white' : 'border-gray-700 bg-black/40'
                        }`}>
                          {isSelected && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-white font-bold text-sm">{s.title}</h4>
                            <span className="text-xs font-bold text-primary shrink-0">+{formatCurrency(s.price)}</span>
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-between items-center pt-4">
                  <button 
                    onClick={() => setActiveStep(1)} 
                    className="text-xs text-gray-400 hover:text-white uppercase tracking-wider font-bold"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={() => setActiveStep(3)} 
                    className="btn-primary px-6 py-3 rounded-sm text-xs"
                  >
                    Next: Add-ons →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Upgrades */}
            {activeStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-white font-headline font-bold text-lg uppercase tracking-wide flex items-center justify-between">
                  <span>3. Optional Premium Upgrades</span>
                  <span className="text-xs text-gray-500 font-normal">Step 3 of 3</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {ADDONS.map(a => {
                    const isSelected = selectedAddons.includes(a.id)
                    return (
                      <div
                        key={a.id}
                        onClick={() => toggleAddon(a.id)}
                        className={`p-5 rounded-sm border cursor-pointer transition-all flex items-start gap-4 ${
                          isSelected 
                            ? 'border-primary bg-primary/10' 
                            : 'border-gray-800 bg-[#0A0A0A] hover:border-gray-700'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-sm flex items-center justify-center shrink-0 mt-0.5 border ${
                          isSelected ? 'bg-primary border-primary text-white' : 'border-gray-700 bg-black/40'
                        }`}>
                          {isSelected && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-white font-bold text-sm">{a.title}</h4>
                            <span className="text-xs font-bold text-primary shrink-0">+{formatCurrency(a.price)}</span>
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed">{a.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-start pt-4">
                  <button 
                    onClick={() => setActiveStep(2)} 
                    className="text-xs text-gray-400 hover:text-white uppercase tracking-wider font-bold"
                  >
                    ← Back to Services
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Budget Summary Card (Right 5 cols) */}
          <div className="lg:col-span-5 border border-primary/40 rounded-sm p-8 bg-[#0A0A0A] relative shadow-2xl space-y-6">
            <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-bl-sm">
              Live Estimate
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1">
                Estimated Investment Range
              </span>
              <div className="font-headline font-black text-3xl sm:text-4xl text-white tracking-tight">
                <span className="text-primary">{formatCurrency(budget.min)}</span>
                <span className="text-gray-600 font-light mx-2">–</span>
                <span>{formatCurrency(budget.max)}</span>
              </div>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                Includes labor, premium materials, on-site supervision, and project warranty.
              </p>
            </div>

            <div className="h-px bg-gray-800 w-full" />

            {/* Scope Summary */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block">
                Selected Scope Summary:
              </span>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center justify-between">
                  <span className="text-gray-500">Property:</span>
                  <span className="font-bold text-white">{selectedSize.title}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-500">Services ({selectedServices.length}):</span>
                  <span className="font-bold text-white truncate max-w-[200px] text-right">
                    {selectedServices.map(id => CORE_SERVICES.find(s=>s.id===id)?.title).join(', ') || 'None'}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-500">Upgrades ({selectedAddons.length}):</span>
                  <span className="font-bold text-white truncate max-w-[200px] text-right">
                    {selectedAddons.map(id => ADDONS.find(a=>a.id===id)?.title).join(', ') || 'None'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleWhatsAppSend}
                className="w-full py-4 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black uppercase tracking-widest rounded-sm flex items-center justify-center gap-3 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Send Estimate to WhatsApp
              </button>

              <a
                href="#contact"
                className="w-full py-3.5 px-4 bg-transparent border border-gray-800 hover:border-primary text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest rounded-sm block text-center transition-all"
              >
                Schedule Site Visit & Quote →
              </a>
            </div>

            <p className="text-[10px] text-gray-600 text-center">
              🔒 No commitment required. Final estimates provided during free on-site consultation.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
