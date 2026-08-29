import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx'

const PROJECTS_DATA = {
  'karen-estate-redesign': {
    name: 'The Karen Estate Redesign',
    tagline: 'Complete front and backyard overhaul including custom stone patio & fire pit.',
    duration: '4 Weeks',
    budget: 'Ksh 850,000',
    location: 'Karen, Nairobi',
    imageBefore: '/scaper (2).jpeg',
    imageAfter: '/scaper (3).png',
    clientName: 'Sarah & Mark K.',
    quote: 'The team at Oasis completely changed how we use our home. We went from never going in the backyard to hosting braais every weekend. Highly professional crew.',
    description: 'This residential estate project required transforming a muddy, unusable 2,500 sq ft backyard into an outdoor living retreat. We excavated the terrain, laid custom stone pavers, built a sunken fire pit, and installed a smart drip irrigation system with native plants.',
    deliverables: [
      '3D Landscape Master Plan',
      'Excavation & Grade Drainage Setup',
      '400 sq ft Custom Stone Patio',
      'Sunken Stone Fire Pit & Seating Wall',
      'Automatic Drip Irrigation & Sod'
    ]
  },
  'lavington-modern-garden': {
    name: 'Lavington Modern Garden',
    tagline: 'Minimalist, low-maintenance garden design with artificial turf and sleek planters.',
    duration: '2 Weeks',
    budget: 'Ksh 450,000',
    location: 'Lavington, Nairobi',
    imageBefore: '/scaper (4).png',
    imageAfter: '/scaper (5).png',
    clientName: 'Michael N.',
    quote: 'We hired Oasis for a modern, low-maintenance setup. The artificial turf and clean concrete planters look incredible and save us hours of work every week.',
    description: 'Designed for a modern urban home in Lavington. The client wanted a lush look without constant lawn mowing. We integrated premium high-density synthetic turf, gravel pathways, and minimalist concrete planters with drip irrigation.',
    deliverables: [
      'Site Grading & Gravel Base Preparation',
      'High-Density Artificial Turf Installation',
      'Custom Formed Concrete Planter Boxes',
      'Architectural Gravel Pathways',
      'Low-Voltage Accent Spotlights'
    ]
  },
  'runda-water-feature': {
    name: 'Runda Water Feature & Pond',
    tagline: 'Elegant koi pond and waterfall integration with surrounding rock garden.',
    duration: '3 Weeks',
    budget: 'Ksh 600,000',
    location: 'Runda, Nairobi',
    imageBefore: '/scaper (6).png',
    imageAfter: '/scaper (12).png',
    clientName: 'David & Grace M.',
    quote: 'The waterfall and koi pond are the centerpiece of our garden now. Peaceful, beautifully engineered, and low maintenance.',
    description: 'A custom aquatic feature built into a natural sloping yard in Runda. Includes multi-stage bio-filtration pumps, river rock stonework, and aquatic flora.',
    deliverables: [
      'Pond Basin Excavation & Liner Install',
      'Multi-Stage Biological Filtration Pump',
      'Natural River Stone & Waterfall Layout',
      'Submersible LED Underwater Lighting',
      'Aquatic Plant & Aquatic Species Setup'
    ]
  },
  'poolside-retreat': {
    name: 'Poolside Travertine Retreat',
    tagline: 'Luxury pool surround renovation using premium natural travertine pavers.',
    duration: '4 Weeks',
    budget: 'Ksh 920,000',
    location: 'Muthaiga, Nairobi',
    imageBefore: '/scaper (6).png',
    imageAfter: '/scaper (7).png',
    clientName: 'Linda W.',
    quote: 'They turned our old, cracked concrete pool deck into a 5-star resort retreat. The stonework is flawless.',
    description: 'Complete replacement of an aged concrete pool surround with non-slip, heat-resistant travertine pavers, custom coping edges, and ambient evening deck lights.',
    deliverables: [
      'Concrete Demolition & Sub-base Prep',
      '600 sq ft Natural Travertine Pavers',
      'Bullnose Pool Edge Coping',
      'Integrated Retaining Wall & Seating',
      'Subtle Night Landscape Lighting'
    ]
  }
}

export default function ProjectDetailPage({ config }) {
  const { projectId } = useParams()
  const project = PROJECTS_DATA[projectId] || PROJECTS_DATA['karen-estate-redesign']

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectId])

  const handleWhatsAppInquiry = () => {
    const text = `Hi ${config.businessName}! I was looking at your case study for "${project.name}" in ${project.location}. I'd like to get a quote for a similar project on my property.`
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="pt-32 pb-28 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        
        {/* Back Link */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-8 hover:underline">
          ← Back to All Projects
        </Link>

        {/* Hero Header */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary block mb-2">
            Project Case Study
          </span>
          <h1 className="font-headline font-black text-4xl sm:text-6xl text-white uppercase leading-tight mb-4">
            {project.name}
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
            {project.tagline}
          </p>
        </div>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-surface border border-gray-800 rounded-sm mb-12">
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Location</span>
            <span className="text-white font-bold text-sm">{project.location}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Timeline</span>
            <span className="text-white font-bold text-sm">{project.duration}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Investment</span>
            <span className="text-primary font-bold text-sm">{project.budget}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Status</span>
            <span className="text-emerald-400 font-bold text-sm">Completed & Verified</span>
          </div>
        </div>

        {/* Interactive Before/After Split Slider */}
        <div className="mb-16 border border-gray-800 rounded-sm overflow-hidden bg-surface shadow-2xl">
          <div className="p-4 bg-[#0A0A0A] border-b border-gray-800 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-white">Interactive Transformation Comparison</span>
            <span className="text-xs text-gray-500">Drag handle to compare</span>
          </div>
          <BeforeAfterSlider 
            imageBefore={project.imageBefore} 
            imageAfter={project.imageAfter}
            labelBefore="Before Transformation"
            labelAfter="Completed Build"
            heightClass="h-72 sm:h-96 md:h-[480px]"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Story & Deliverables (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="font-headline font-bold text-2xl text-white uppercase mb-4">
                Project Overview
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h2 className="font-headline font-bold text-2xl text-white uppercase mb-4">
                Key Scope & Deliverables
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.deliverables.map((item, i) => (
                  <div key={i} className="p-4 bg-surface border border-gray-800 rounded-sm flex items-center gap-3">
                    <div className="w-5 h-5 rounded-sm bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </div>
                    <span className="text-gray-200 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Quote Card */}
            <div className="p-8 bg-surface border border-primary/40 rounded-sm relative">
              <div className="text-primary font-headline font-black text-6xl leading-none opacity-20 absolute top-4 left-4">
                "
              </div>
              <p className="text-gray-200 text-base italic leading-relaxed relative z-10 mb-4">
                "{project.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white font-black flex items-center justify-center text-xs">
                  {project.clientName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{project.clientName}</h4>
                  <span className="text-xs text-gray-500">Verified Client · {project.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: CTA Box (4 cols) */}
          <div className="lg:col-span-4 bg-surface border border-gray-800 rounded-sm p-8 space-y-6 sticky top-28">
            <h3 className="font-headline font-bold text-xl text-white uppercase">
              Want a Similar Transformation?
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              We provide custom 3D designs and transparent estimates for all projects in Nairobi and surrounding areas.
            </p>

            <button
              onClick={handleWhatsAppInquiry}
              className="w-full py-4 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black uppercase tracking-widest rounded-sm flex items-center justify-center gap-3 transition-colors shadow-lg"
            >
              Inquire via WhatsApp →
            </button>

            <a
              href="/#contact"
              className="w-full py-3.5 px-4 bg-transparent border border-gray-800 hover:border-primary text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest rounded-sm block text-center transition-all"
            >
              Request Free Quote Form
            </a>
          </div>

        </div>

      </div>
    </div>
  )
}
