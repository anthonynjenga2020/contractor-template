import { motion } from 'framer-motion'

export default function Process({ config }) {
  if (!config.process || config.process.length === 0) return null

  return (
    <section id="process" className="py-24 relative" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-8" style={{ backgroundColor: 'var(--primary)' }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--primary)' }}>
              How It Works
            </span>
            <div className="h-px w-8" style={{ backgroundColor: 'var(--primary)' }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-headline font-bold text-white uppercase tracking-tight"
          >
            Our Simple Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-400 text-lg"
          >
            From your first idea to the final walkthrough, we make transforming your outdoor space easy and stress-free.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {config.process.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-8 rounded-sm border border-white/5 transition-colors duration-300"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              {/* Step Number Background */}
              <div 
                className="absolute top-4 right-6 text-8xl font-black opacity-5 pointer-events-none"
                style={{ color: 'var(--primary)' }}
              >
                {idx + 1}
              </div>
              
              <div className="relative z-10">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--primary)' }}
                >
                  <span className="text-2xl" style={{ color: 'var(--primary)' }}>
                    {step.icon === 'clipboard' ? '📋' : step.icon === 'pen' ? '📐' : '🔨'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-headline font-bold text-white uppercase mb-3">
                  {step.name}
                </h3>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="btn-primary px-8 py-4 rounded-sm text-base inline-block"
          >
            {config.trialCTA}
          </a>
        </motion.div>
        
      </div>
    </section>
  )
}
