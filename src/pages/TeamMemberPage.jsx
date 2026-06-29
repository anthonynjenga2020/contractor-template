import { useParams, Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'

export default function TeamMemberPage({ config }) {
  const { memberId } = useParams()
  // Since we are matching by the route param (which is now called memberId inside the component, but the route might still pass trainerId if App.jsx was not updated). Let me check App.jsx route params just in case. 
  // Wait, I will use a fallback name like memberId.
  // Actually, wait, let's keep it robust:
  const teamMember = config.team?.find(t => t.id === memberId) || config.team?.find(t => t.id === useParams().trainerId)
  
  const heroRef = useReveal()
  const contentRef = useReveal()

  if (!teamMember) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <p className="text-white font-headline font-black text-4xl uppercase mb-4">Team member not found.</p>
        <Link to="/team" className="btn-primary px-6 py-3 rounded-sm text-sm">← Back to Team</Link>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      {/* Hero — full bleed cover image */}
      <section className="relative pt-40 pb-0 overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
        {/* Cover BG */}
        <div className="absolute inset-0">
          <img src={teamMember.coverImage || teamMember.image} alt={teamMember.name}
            className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, var(--surface) 80%)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-4 mb-12">
            <Link to="/" className="text-gray-600 text-xs uppercase tracking-widest hover:text-gray-400 transition-colors">Home</Link>
            <span className="text-gray-700">/</span>
            <Link to="/team" className="text-gray-600 text-xs uppercase tracking-widest hover:text-gray-400 transition-colors">Team</Link>
            <span className="text-gray-700">/</span>
            <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--primary)' }}>{teamMember.name}</span>
          </div>

          <div ref={heroRef} className="section-reveal grid lg:grid-cols-[1fr_auto] items-end gap-12 pb-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--primary)' }}>
                {teamMember.specialty}
              </p>
              <h1 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl text-white uppercase leading-tight mb-6">
                {teamMember.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
                  <span className="text-white font-bold text-sm uppercase tracking-widest">{teamMember.experience} Experience</span>
                </div>
              </div>
            </div>

            {/* Profile photo */}
            <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-sm overflow-hidden border-2 shrink-0"
              style={{ borderColor: 'var(--primary)' }}>
              <img src={teamMember.image} alt={teamMember.name}
                className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div ref={contentRef} className="section-reveal grid lg:grid-cols-[2fr_1fr] gap-12">
            {/* Left column */}
            <div className="space-y-12">
              {/* Quote */}
              <div className="relative p-8 rounded-sm border"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                <div className="font-headline font-black text-7xl leading-none absolute -top-4 left-6"
                  style={{ color: 'var(--primary)', opacity: 0.4 }}>
                  "
                </div>
                <p className="text-white text-xl font-medium leading-relaxed italic pt-4">
                  {teamMember.quote}
                </p>
              </div>

              {/* Bio */}
              <div>
                <h2 className="font-headline font-black text-2xl text-white uppercase mb-4">About {teamMember.name.split(' ')[0]}</h2>
                <p className="text-gray-400 text-base leading-relaxed">{teamMember.bio}</p>
              </div>
            </div>

            {/* Right column (Sidebar) */}
            <div>
              <div className="p-6 rounded-sm border sticky top-24"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                
                <h3 className="font-headline font-bold text-lg text-white uppercase mb-4">Want to work with {teamMember.name.split(' ')[0]}?</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Get in touch with us to schedule an on-site consultation and get a free estimate for your project.
                </p>
                <a href="/#contact" className="btn-primary w-full py-4 rounded-sm text-sm text-center block">
                  Get a Free Estimate
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
