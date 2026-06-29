import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'

export default function TeamPage({ config }) {
  const heroRef = useReveal()
  const gridRef = useReveal()

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
              <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--primary)' }}>Team</span>
            </div>
            <h1 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl text-white uppercase leading-tight mb-6">
              Meet The<br />
              <span style={{ color: 'var(--primary)' }}>Experts.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mb-8">
              Our team of experienced landscape architects and builders are dedicated to bringing your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div ref={gridRef} className={`section-reveal grid gap-6 ${config.team?.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
            {config.team?.map((member, i) => (
              <Link
                key={i}
                to={`/team/${member.id}`}
                className="group card-hover rounded-sm overflow-hidden border relative block"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, var(--primary), transparent)` }}
                  />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-headline font-bold text-lg text-white uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--primary)' }}>
                    {member.specialty}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-px w-4 opacity-40" style={{ backgroundColor: 'var(--primary)' }} />
                    <span className="text-gray-600 text-xs uppercase tracking-widest">
                      {member.experience} experience
                    </span>
                  </div>
                </div>

                {/* View Profile CTA */}
                <div
                  className="absolute bottom-0 left-0 right-0 py-3 text-center text-xs font-black uppercase tracking-widest text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  View Profile →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section className="py-20" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-headline font-black text-4xl sm:text-5xl text-white uppercase mb-4">
            Ready to work with us?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Get in touch to schedule your free on-site consultation.
          </p>
          <a href="/#contact" className="btn-primary px-10 py-4 rounded-sm text-sm inline-block">
            Get a Free Estimate →
          </a>
        </div>
      </section>
    </div>
  )
}
