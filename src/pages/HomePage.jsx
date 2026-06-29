import Hero from '../sections/Hero.jsx'
import Stats from '../sections/Stats.jsx'
import About from '../sections/About.jsx'
import CoreServices from '../sections/CoreServices.jsx'
import BeforeAfter from '../sections/BeforeAfter.jsx'
import RecentProjects from '../sections/RecentProjects.jsx'
import Team from '../sections/Team.jsx'
import Gallery from '../sections/Gallery.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import Process from '../sections/Process.jsx'
import CTA from '../sections/CTA.jsx'
import RequestQuoteForm from '../sections/RequestQuoteForm.jsx'
import FAQ from '../sections/FAQ.jsx'
import Contact from '../sections/Contact.jsx'
import Loader from '../components/Loader.jsx'
import Marquee from '../components/Marquee.jsx'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

export default function HomePage({ config }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show loader for a brief period on initial mount
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader config={config} />}
      </AnimatePresence>

      <main className={loading ? "opacity-0 h-screen overflow-hidden" : "opacity-100 transition-opacity duration-1000"}>
        <Hero config={config} />
        <Marquee />
        <Stats config={config} />
        <About config={config} />
        <CoreServices config={config} />
        <BeforeAfter config={config} />
        <RecentProjects config={config} />
        <Team config={config} />
        <Gallery config={config} />
        <Testimonials config={config} />
        <Process config={config} />
        <CTA config={config} />
        <RequestQuoteForm config={config} />
        <FAQ config={config} />
        <Contact config={config} />
      </main>
    </>
  )
}
