import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import HeroSection from './sections/HeroSection'
import WelcomeSection from './sections/WelcomeSection'
import VinylSection from './sections/VinylSection'
import CollageSection from './sections/CollageSection'
import PlaygroundSection from './sections/PlaygroundSection'
import GallerySection from './sections/GallerySection'
import BookingSection from './sections/BookingSection'
import Navigation from './sections/Navigation'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const mainRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Wait for all ScrollTriggers to be created before setting up snap
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start)

      const maxScroll = ScrollTrigger.maxScroll(window)
      if (!maxScroll || pinned.length === 0) return

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }))

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            )
            if (!inPinned) return value

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            )
            return target
          },
          duration: { min: 0.15, max: 0.4 },
          delay: 0,
          ease: 'power2.out',
        },
      })
    }

    // Delay snap setup to ensure all sections have mounted
    const snapTimeout = setTimeout(setupSnap, 500)

    return () => {
      clearTimeout(snapTimeout)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((st) => st.kill())
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [])

  return (
    <div ref={mainRef} className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Persistent Navigation */}
      <Navigation />

      {/* Sections with z-index stacking */}
      <main className="relative">
        <HeroSection className="z-10" />
        <WelcomeSection className="z-20" />
        <VinylSection className="z-30" />
        <CollageSection className="z-40" />
        <PlaygroundSection className="z-50" />
        <GallerySection />
        <BookingSection />
      </main>
    </div>
  )
}

export default App
