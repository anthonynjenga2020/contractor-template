import { useEffect } from 'react'
import CostEstimator from '../sections/CostEstimator.jsx'
import FAQ from '../sections/FAQ.jsx'

export default function PricingPage({ config }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const tiers = [
    {
      name: 'Starter Garden Refresh',
      range: 'Ksh 180,000 – Ksh 320,000',
      description: 'Perfect for small yards, townhouses, or front lawn curb appeal upgrades.',
      items: [
        '3D Landscape Design & Plant Layout',
        'Premium Sod Installation (< 1,000 sq ft)',
        'Drip Irrigation for Flowerbeds',
        'Mulch & Decorative Gravel Pathways'
      ]
    },
    {
      name: 'Full Yard Overhaul',
      range: 'Ksh 450,000 – Ksh 850,000',
      description: 'Complete transformation combining sod, stone hardscaping, and lighting.',
      items: [
        'Full Backyard & Front Yard Redesign',
        'Custom Paver Patio or Walkway (up to 400 sq ft)',
        'Automated Smart Sprinkler & Irrigation',
        'Low-Voltage LED Landscape Lighting',
        'Native Plant Selection & Soil Prep'
      ]
    },
    {
      name: 'Luxury Estate Transformation',
      range: 'Ksh 950,000+',
      description: 'Comprehensive resort-style build for large private properties and commercial estates.',
      items: [
        'Complete Master Plan & Structural Engineering',
        'Travertine or Natural Cut Stone Hardscaping',
        'Custom Water Feature / Waterfall & Koi Pond',
        'Sunken Fire Pit & Outdoor Kitchen Bar',
        'Full Perimeter LED Architectural Ambiance'
      ]
    }
  ]

  return (
    <div className="pt-32 pb-28 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10" style={{ backgroundColor: 'var(--primary)' }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--primary)' }}>
              Investment Guide
            </span>
          </div>
          <h1 className="font-headline font-black text-4xl sm:text-6xl text-white uppercase leading-tight mb-6">
            Transparent<br />
            <span style={{ color: 'var(--primary)' }}>Pricing & Tiers.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            We believe in complete pricing transparency. Below are our typical investment tiers for residential and commercial projects in Kenya.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, i) => (
            <div key={i} className="p-8 bg-[#0A0A0A] border border-gray-800 rounded-sm flex flex-col justify-between hover:border-primary/50 transition-colors">
              <div>
                <h3 className="text-white font-headline font-bold text-2xl uppercase mb-2">
                  {tier.name}
                </h3>
                <div className="text-primary font-headline font-bold text-lg mb-4">
                  {tier.range}
                </div>
                <p className="text-gray-400 text-xs mb-6 leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">Typical Deliverables:</span>
                  {tier.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3 text-xs text-gray-300">
                      <span className="text-primary font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#calculator"
                className="w-full py-3.5 bg-surface border border-gray-800 hover:border-primary text-white text-xs font-bold uppercase tracking-widest rounded-sm block text-center transition-all"
              >
                Estimate This Scope →
              </a>
            </div>
          ))}
        </div>

      </div>

      {/* Embedded Cost Estimator Section */}
      <CostEstimator config={config} />

      {/* Sales FAQ Section */}
      <FAQ config={config} />
    </div>
  )
}
