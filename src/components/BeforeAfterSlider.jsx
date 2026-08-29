import { useState, useRef, useCallback, useEffect } from 'react'

export default function BeforeAfterSlider({ imageBefore, imageAfter, labelBefore = "Before", labelAfter = "After", heightClass = "h-64 md:h-72" }) {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    let percent = (x / rect.width) * 100
    if (percent < 0) percent = 0
    if (percent > 100) percent = 100
    setSliderPos(percent)
  }, [])

  const onTouchMove = useCallback((e) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }, [isDragging, handleMove])

  const onMouseMove = useCallback((e) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }, [isDragging, handleMove])

  const onMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchend', onMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onMouseUp)
    }
  }, [isDragging, onMouseMove, onMouseUp, onTouchMove])

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${heightClass} overflow-hidden rounded-t-sm select-none cursor-ew-resize group border-b`}
      style={{ borderColor: 'var(--border)' }}
      onMouseDown={(e) => {
        setIsDragging(true)
        handleMove(e.clientX)
      }}
      onTouchStart={(e) => {
        setIsDragging(true)
        handleMove(e.touches[0].clientX)
      }}
    >
      {/* Before Image (Full background) */}
      <img 
        src={imageBefore} 
        alt={labelBefore} 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-black/70 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-widest rounded-sm border border-white/10 pointer-events-none">
        {labelBefore}
      </div>

      {/* After Image (Clipped overlay) */}
      <div 
        className="absolute top-0 left-0 bottom-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src={imageAfter} 
          alt={labelAfter} 
          className="absolute top-0 left-0 w-full h-full max-w-none object-cover"
          style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
        />
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-sm shadow-md pointer-events-none">
          {labelAfter}
        </div>
      </div>

      {/* Slider Divider Bar & Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-white text-xs font-black">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5m0 0l5 5m-5-5h18m-5-7l5 5m0 0l-5 5" />
          </svg>
        </div>
      </div>

      {/* Drag instruction overlay hint */}
      <div className="absolute bottom-2 right-2 z-10 px-2 py-1 bg-black/60 backdrop-blur-sm text-[10px] text-gray-300 uppercase tracking-wider rounded opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
        <span>Drag to compare</span>
        <span>↔</span>
      </div>
    </div>
  )
}
