import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [isDark, setIsDark] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const showNav = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    // Check which section we're in for dark/light mode
    const updateTheme = () => {
      const bookingSection = document.getElementById('booking-section')
      if (bookingSection) {
        const rect = bookingSection.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
          setIsDark(true)
        } else {
          setIsDark(false)
        }
      }
    }

    const onScroll = () => {
      showNav()
      updateTheme()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
      style={{
        background: isDark
          ? 'rgba(15, 42, 34, 0.85)'
          : 'rgba(246, 242, 234, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center justify-between px-6 lg:px-10 py-4">
        {/* Wordmark */}
        <button
          onClick={() => scrollTo('hero-section')}
          className={`font-display text-lg tracking-wide transition-colors ${
            isDark ? 'text-[#F6F2EA]' : 'text-[#1A1A1A]'
          }`}
        >
          Wattle House
        </button>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Story', id: 'welcome-section' },
            { label: 'Menu', id: 'vinyl-section' },
            { label: 'Grounds', id: 'collage-section' },
            { label: 'Families', id: 'playground-section' },
            { label: 'Gallery', id: 'gallery-section' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:opacity-70 ${
                isDark ? 'text-[#F6F2EA]' : 'text-[#1A1A1A]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo('booking-section')}
          className={`font-mono text-[11px] uppercase tracking-[0.14em] px-5 py-2.5 rounded-full transition-all btn-lift ${
            isDark
              ? 'bg-[#C8942A] text-white'
              : 'border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F6F2EA]'
          }`}
        >
          Book a table
        </button>
      </div>
    </nav>
  )
}
