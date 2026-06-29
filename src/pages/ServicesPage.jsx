import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'

export default function ServicesPage({ config }) {
  const heroRef = useReveal()
  const servicesRef = useReveal()

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 60px)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div ref={heroRef} className="section-reveal">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/" className="text-gray-600 text-xs uppercase tracking-widest hover:text-gray-400 transition-colors">
                Home
              </Link>
              <span className="text-gray-700">/</span>
              <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--primary)' }}>Services</span>
            </div>
            <h1 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl text-white uppercase leading-tight mb-6">
              Our<br />
              <span style={{ color: 'var(--primary)' }}>Expertise.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mb-8">
              From full garden redesigns to reliable maintenance, we have the skills and experience to bring your outdoor vision to life.
            </p>
            <a href="#services-list" className="btn-primary px-8 py-4 rounded-sm text-sm inline-block"
              onClick={e => { e.preventDefault(); document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' }) }}>
              View All Services ↓
            </a>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section id="services-list" className="py-24" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div ref={servicesRef} className="section-reveal">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10" style={{ backgroundColor: 'var(--primary)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--primary)' }}>
                What We Offer
              </span>
            </div>
            <h2 className="font-headline font-black text-4xl sm:text-5xl text-white uppercase leading-tight mb-12">
              Landscaping & Hardscaping
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {config.services.map((service, i) => (
                <div key={i}
                  className="relative overflow-hidden rounded-sm border group card-hover"
                  style={{ borderColor: 'var(--border)' }}
                >
                  {/* Background image */}
                  {service.image && (
                    <div className="absolute inset-0">
                      <img src={service.image} alt={service.name}
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg) 10%, transparent)' }} />
                    </div>
                  )}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[300px]">
                    <h3 className="font-headline font-bold text-white uppercase text-2xl mb-3">{service.name}</h3>
                    <p className="text-gray-300 text-base leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-headline font-black text-4xl sm:text-5xl text-white uppercase mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Contact us today for a free on-site consultation and quote. We'll work with you to build the perfect outdoor space.
          </p>
          <a href="/#contact" className="btn-primary px-10 py-4 rounded-sm text-sm inline-block">
            Get a Free Estimate →
          </a>
        </div>
      </section>
    </div>
  )
}
