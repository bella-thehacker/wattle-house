import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  className?: string
}

export default function CollageSection({ className = '' }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const heading1Ref = useRef<HTMLParagraphElement>(null)
  const heading2Ref = useRef<HTMLParagraphElement>(null)
  const hairlineRef = useRef<HTMLDivElement>(null)
  const cardARef = useRef<HTMLDivElement>(null)
  const cardBRef = useRef<HTMLDivElement>(null)
  const cardCRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLButtonElement>(null)
  const dustRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Heading lines
      scrollTl.fromTo(
        heading1Ref.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      )
      scrollTl.to(heading1Ref.current, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.7)

      scrollTl.fromTo(
        heading2Ref.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.04
      )
      scrollTl.to(heading2Ref.current, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.72)

      // Link
      scrollTl.fromTo(
        linkRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      )
      scrollTl.to(linkRef.current, { opacity: 0, ease: 'power2.in' }, 0.75)

      // Hairline
      scrollTl.fromTo(
        hairlineRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, ease: 'none', transformOrigin: 'top' },
        0.08
      )
      scrollTl.to(hairlineRef.current, { opacity: 0, ease: 'power2.in' }, 0.76)

      // Card A (large left) - slides from left
      scrollTl.fromTo(
        cardARef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      )
      scrollTl.to(cardARef.current, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.72)

      // Card B (right-top) - slides from right
      scrollTl.fromTo(
        cardBRef.current,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      )
      scrollTl.to(cardBRef.current, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.74)

      // Card C (right-bottom) - slides from right-bottom
      scrollTl.fromTo(
        cardCRef.current,
        { x: '50vw', y: '10vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0.14
      )
      scrollTl.to(cardCRef.current, { y: '8vh', opacity: 0, ease: 'power2.in' }, 0.76)
    }, section)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="collage-section"
      ref={sectionRef}
      className={`section-pinned bg-[#F6F2EA] ${className}`}
    >
      {/* Heading */}
      <div className="absolute top-[14vh] left-1/2 -translate-x-1/2 w-[90vw] md:w-[82vw] max-w-[1200px] text-center">
        <p
          ref={heading1Ref}
          className="font-display text-[clamp(20px,3.2vw,42px)] leading-[1.1] tracking-[-0.01em] text-[#1A1A1A]"
          style={{ opacity: 0 }}
        >
          PERUSE MENUS, BOOK TABLES,
        </p>
        <p
          ref={heading2Ref}
          className="font-display text-[clamp(20px,3.2vw,42px)] leading-[1.1] tracking-[-0.01em] text-[#1A1A1A] italic"
          style={{ opacity: 0 }}
        >
          EXPLORE THE GROUNDS.
        </p>
        <button
          ref={linkRef}
          onClick={() => scrollTo('gallery-section')}
          className="mt-4 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-[#6E6A62] hover:text-[#C8942A] transition-colors inline-flex items-center gap-2"
          style={{ opacity: 0 }}
        >
          See full gallery
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      {/* Vertical Hairline */}
      <div
        ref={hairlineRef}
        className="absolute left-[54vw] top-[30vh] h-[54vh] w-px hairline"
        style={{ transformOrigin: 'top', opacity: 0 }}
      />

      {/* Card A - Large Left (Indoor Dining) */}
      <div
        ref={cardARef}
        className="absolute left-[5vw] top-[32vh] w-[46vw] h-[44vh] rounded-xl overflow-hidden card-shadow group cursor-pointer"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/dining-interior.jpg"
          alt="Indoor dining"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 font-display text-white text-[clamp(14px,1.6vw,22px)]">
          Indoor Dining
        </span>
      </div>

      {/* Card B - Right Top (Grill) */}
      <div
        ref={cardBRef}
        className="absolute left-[56vw] top-[34vh] w-[38vw] h-[26vh] rounded-xl overflow-hidden card-shadow group cursor-pointer"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/grill-scene.jpg"
          alt="Grill and fire"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 font-display text-white text-[clamp(14px,1.6vw,22px)]">
          Grill & Fire
        </span>
      </div>

      {/* Card C - Right Bottom (Garden) */}
      <div
        ref={cardCRef}
        className="absolute left-[62vw] top-[62vh] w-[28vw] h-[22vh] rounded-xl overflow-hidden card-shadow group cursor-pointer"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/3.jpg"
          alt="Garden seating"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 font-display text-white text-[clamp(12px,1.3vw,18px)]">
          Garden Seating
        </span>
      </div>

      {/* Dust Particles */}
      <div ref={dustRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C8942A]"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${30 + Math.random() * 50}%`,
              opacity: 0.15,
              animation: `dust-float ${8 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
