import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProjectsPage({ config }) {
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const projects = [
    {
      id: 'karen-estate-redesign',
      name: 'The Karen Estate Redesign',
      category: 'residential',
      tagline: 'Complete front and backyard overhaul including custom stone patio & fire pit.',
      duration: '4 Weeks',
      budget: 'Ksh 850,000',
      location: 'Karen, Nairobi',
      image: '/scaper (1).jpeg',
      imageBefore: '/scaper (2).jpeg',
      imageAfter: '/scaper (3).png',
      includes: ['3D Design', 'Sod Installation', 'Custom Pavers', 'Outdoor Lighting', 'Native Plantings']
    },
    {
      id: 'lavington-modern-garden',
      name: 'Lavington Modern Garden',
      category: 'residential',
      tagline: 'Minimalist, low-maintenance garden design with artificial turf and sleek planters.',
      duration: '2 Weeks',
      budget: 'Ksh 450,000',
      location: 'Lavington, Nairobi',
      image: '/scaper (4).png',
      imageBefore: '/scaper (4).png',
      imageAfter: '/scaper (5).png',
      includes: ['Artificial Turf', 'Concrete Planters', 'Drip Irrigation', 'Gravel Pathways']
    },
    {
      id: 'runda-water-feature',
      name: 'Runda Water Feature & Pond',
      category: 'commercial',
      tagline: 'Elegant koi pond and waterfall integration with surrounding rock garden.',
      duration: '3 Weeks',
      budget: 'Ksh 600,000',
      location: 'Runda, Nairobi',
      image: '/scaper (6).png',
      imageBefore: '/scaper (6).png',
      imageAfter: '/scaper (12).png',
      includes: ['Pond Construction', 'Water Pump System', 'Rock Layout', 'Aquatic Plants']
    },
    {
      id: 'poolside-retreat',
      name: 'Poolside Travertine Retreat',
      category: 'hardscaping',
      tagline: 'Luxury pool surround renovation using premium natural travertine pavers.',
      duration: '4 Weeks',
      budget: 'Ksh 920,000',
      location: 'Muthaiga, Nairobi',
      image: '/scaper (7).png',
      imageBefore: '/scaper (2).jpeg',
      imageAfter: '/scaper (7).png',
      includes: ['Travertine Pavers', 'Pool Coping', 'LED Deck Lighting', 'Seating Wall']
    }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

  return (
    <div className="pt-32 pb-28 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10" style={{ backgroundColor: 'var(--primary)' }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--primary)' }}>
              Completed Projects
            </span>
          </div>
          <h1 className="font-headline font-black text-4xl sm:text-6xl text-white uppercase leading-tight mb-6">
            Our Work &<br />
            <span style={{ color: 'var(--primary)' }}>Case Studies.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Explore our featured transformations. Each project represents our commitment to premium materials, structural longevity, and exceptional outdoor living spaces.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-800 pb-4">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'residential', label: 'Residential Estates' },
            { id: 'hardscaping', label: 'Hardscaping & Patios' },
            { id: 'commercial', label: 'Water & Commercial Features' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                filter === tab.id 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-surface text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0A0A0A] border border-gray-800 rounded-sm overflow-hidden group flex flex-col justify-between hover:border-primary/50 transition-colors"
            >
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-sm border border-white/10">
                  {project.location}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-sm shadow-md">
                  {project.duration}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h2 className="text-white font-headline font-bold text-2xl uppercase mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {project.tagline}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Scope of Work:</span>
                    <div className="flex flex-wrap gap-2">
                      {project.includes.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 bg-surface border border-gray-800 text-gray-300 text-xs rounded-sm">
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="pt-6 border-t border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Project Investment</span>
                    <span className="text-white font-headline font-bold text-xl">{project.budget}</span>
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="btn-primary px-5 py-2.5 rounded-sm text-xs inline-flex items-center gap-2"
                  >
                    View Case Study →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
