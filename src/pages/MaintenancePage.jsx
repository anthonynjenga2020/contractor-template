import { useEffect } from 'react'

export default function MaintenancePage({ config }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const plans = [
    {
      name: 'Essential Yard Care',
      tagline: 'Ideal for standard residential lawns & gardens.',
      price: 'Ksh 25,000',
      period: '/ month',
      popular: false,
      features: [
        'Bi-weekly Lawn Mowing & Edging',
        'Debris & Leaf Clearance',
        'Seasonal Hedge Trimming',
        'Standard Weed Control',
        'Monthly Health Audit'
      ]
    },
    {
      name: 'Premier Estate Care',
      tagline: 'Comprehensive maintenance for high-end estate grounds.',
      price: 'Ksh 55,000',
      period: '/ month',
      popular: true,
      features: [
        'Weekly Precision Lawn Mowing',
        'Soil Fertilization & Aeration',
        'Irrigation System Audits & Repairs',
        'Plant & Flowerbed Nurturing',
        'Seasonal Tree & Shrub Pruning',
        'Priority Emergency Storm Cleanup'
      ]
    },
    {
      name: 'Commercial Groundskeeping',
      tagline: 'Customized grounds management for office parks & hotels.',
      price: 'Custom Quote',
      period: '',
      popular: false,
      features: [
        'Dedicated On-Site Gardening Crew',
        'Daily / Multi-Day Weekly Visits',
        'Water-Saving Automated Irrigation',
        'Seasonal Floral Replacements',
        'Hardscape Power Washing & Sealing',
        'Detailed Monthly Management Report'
      ]
    }
  ]

  const handleBookPlan = (planName) => {
    const text = `Hi ${config.businessName}! I'm interested in signing up for the "${planName}" recurring maintenance plan. Could we schedule a property walkthrough?`
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="pt-32 pb-28 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10" style={{ backgroundColor: 'var(--primary)' }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--primary)' }}>
              Recurring Care & Contracts
            </span>
          </div>
          <h1 className="font-headline font-black text-4xl sm:text-6xl text-white uppercase leading-tight mb-6">
            Garden & Lawn<br />
            <span style={{ color: 'var(--primary)' }}>Maintenance.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Keep your landscape thriving year-round. Our scheduled maintenance plans ensure your lawn stays green, hedges stay sharp, and irrigation systems run at peak efficiency.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`p-8 bg-[#0A0A0A] border rounded-sm flex flex-col justify-between relative transition-all ${
                plan.popular 
                  ? 'border-primary shadow-[0_0_30px_rgba(16,185,129,0.15)] lg:-mt-4 lg:mb-4' 
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  Most Popular for Estates
                </div>
              )}

              <div>
                <h3 className="text-white font-headline font-bold text-2xl uppercase mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-xs mb-6 leading-relaxed">
                  {plan.tagline}
                </p>

                <div className="mb-8">
                  <span className="font-headline font-black text-4xl text-white">{plan.price}</span>
                  <span className="text-gray-500 text-xs font-medium">{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">Plan Includes:</span>
                  {plan.features.map((feat, j) => (
                    <div key={j} className="flex items-start gap-3 text-xs text-gray-300">
                      <div className="w-4 h-4 rounded-sm bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleBookPlan(plan.name)}
                className={`w-full py-4 rounded-sm text-xs font-black uppercase tracking-widest transition-all ${
                  plan.popular ? 'btn-primary' : 'bg-surface border border-gray-800 text-gray-300 hover:text-white hover:border-primary'
                }`}
              >
                Inquire for Plan →
              </button>
            </div>
          ))}
        </div>

        {/* Why Choose Recurring Maintenance Banner */}
        <div className="p-10 bg-surface border border-gray-800 rounded-sm grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl mb-2">🌱</div>
            <h4 className="text-white font-bold text-base uppercase mb-1">Protect Your Investment</h4>
            <p className="text-gray-400 text-xs leading-relaxed">Prevent costly plant loss and turf deterioration with regular seasonal fertilization and soil audits.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">💧</div>
            <h4 className="text-white font-bold text-base uppercase mb-1">Water-Saving Audits</h4>
            <p className="text-gray-400 text-xs leading-relaxed">We test and calibrate sprinkler heads to prevent overwatering and reduce water utility bills.</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🛡️</div>
            <h4 className="text-white font-bold text-base uppercase mb-1">Fully Insured Crew</h4>
            <p className="text-gray-400 text-xs leading-relaxed">All groundskeeping staff are trained, uniformed, background-checked, and fully covered under worker liability.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
