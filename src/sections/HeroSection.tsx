import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  className?: string
}

export default function HeroSection({ className = '' }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bottomNavRef = useRef<HTMLDivElement>(null)
  const microLabelsRef = useRef<HTMLDivElement>(null)

  // Entrance animation (auto-play on load)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Background fade in with scale
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        0
      )

      // Card entrance
      tl.fromTo(
        cardRef.current,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.15
      )

      // Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word')
        tl.fromTo(
          words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 },
          0.4
        )
      }

      // Subheadline
      tl.fromTo(
        subRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.6
      )

      // CTAs
      tl.fromTo(
        ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.7
      )

      // Micro labels
      tl.fromTo(
        microLabelsRef.current?.children ? Array.from(microLabelsRef.current.children) : [],
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.1 },
        0.8
      )

      // Bottom nav
      tl.fromTo(
        bottomNavRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.9
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Scroll-driven EXIT animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set(cardRef.current, { y: 0, opacity: 1 })
            gsap.set(bgRef.current, { scale: 1, y: 0 })
            gsap.set(bottomNavRef.current, { y: 0, opacity: 1 })
            gsap.set(microLabelsRef.current, { opacity: 1 })
          },
        },
      })

      // Phase 1 (0-30%): Hold at settle state (already visible from load animation)
      // Phase 2 (30-70%): Static
      // Phase 3 (70-100%): Exit

    scrollTl.fromTo(
  cardRef.current,
  {
    y: 0,
    opacity: 1,
  },
  {
    y: '-22vh',
    opacity: 0,
    ease: 'power3.inOut',
  },
  0.76
)

scrollTl.fromTo(
  bgRef.current,
  {
    scale: 1,
    y: 0,
  },
  {
    scale: 1.08,
    y: '-6vh',
    ease: 'power1.out',
  },
  0.76
)

scrollTl.fromTo(
  bottomNavRef.current,
  {
    y: 0,
    opacity: 1,
  },
  {
    y: '8vh',
    opacity: 0,
    ease: 'power3.inOut',
  },
  0.76
)

scrollTl.fromTo(
  microLabelsRef.current,
  {
    opacity: 1,
  },
  {
    opacity: 0,
    ease: 'power2.inOut',
  },
  0.80
)
    }, section)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
        
      >
        <img
          src="/images/hero-countryside.jpg"
          alt="Countryside landscape"
          className="w-full h-full object-cover  transition-transform duration-[10000ms] ease-out hover:scale-[1.01]"

        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      {/* Micro Labels */}
      <div
        ref={microLabelsRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <span className="absolute left-[4vw] top-[4vh] font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
          Kikuyu, Kenya
        </span>
        <span className="absolute right-[4vw] top-[4vh] font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
          Family • Garden • Grill
        </span>
      </div>

      {/* Center Card */}
      <div
        ref={cardRef}
  className="
absolute
left-1/2

top-[46%]
sm:top-[48%]
md:top-[52%]

-translate-x-1/2
-translate-y-1/2

w-[90vw]
sm:w-[88vw]
md:w-[74vw]

max-w-[800px]

bg-[#F6F2EA]
rounded-xl
card-shadow
overflow-hidden
"
        style={{ opacity: 0 }}
      >
        {/* Card Image */}
        <div className="w-full h-[120px] sm:h-[200px] md:h-[38%] overflow-hidden">
          <img
            src="/images/hero-lawn-card.jpg"
            alt="Wattle House garden"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Content */}
      <div className="p-5 sm:p-6 md:p-8 lg:p-10">
          <h1
            ref={headlineRef}
            className="font-display text-[clamp(18px,2.5vw,32px)] leading-[1.1] text-[#6E6A62] italic mb-4 md:mb-8"
          >
            <span className="word inline-block">Escape</span>{' '}
            <span className="word inline-block">the</span>{' '}
            <span className="word inline-block">City</span>
          </h1>

          <p
            ref={subRef}
            className="font-display text-[clamp(18px,2.5vw,32px)] leading-[1.1] text-[#6E6A62] italic mb-5 md:mb-8"
          >
            Discover Wattle House
            <svg
              className="inline-block ml-2 w-5 h-5 text-[#C8942A]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </p>

          <div
  ref={ctaRef}
  className="
    flex
    flex-col
    sm:flex-row
    gap-3
    md:gap-4
  "
>
            <button
              onClick={() => scrollTo('collage-section')}
              className="font-mono text-[11px] uppercase tracking-[0.14em] px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] rounded-full transition-all btn-lift hover:bg-[#1A1A1A] hover:text-[#F6F2EA]"
            >
              Explore
            </button>
            <button
              onClick={() => scrollTo('booking-section')}
              className="font-mono text-[11px] uppercase tracking-[0.14em] px-6 py-3 bg-[#C8942A] text-white rounded-full transition-all btn-lift"
            >
              Book a Table
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div
        ref={bottomNavRef}
        className="absolute bottom-0 left-0 right-0 h-[8vh] bg-[#F6F2EA] border-t border-[rgba(26,26,26,0.12)] flex items-center justify-center gap-6 md:gap-12"
        style={{ opacity: 0 }}
      >
        {['Food & Drink', 'Reservations', 'Visit Us', 'FAQs'].map((item) => (
          <button
            key={item}
            onClick={() => {
              if (item === 'Reservations') scrollTo('booking-section')
              else if (item === 'Food & Drink') scrollTo('vinyl-section')
              else if (item === 'Visit Us') scrollTo('collage-section')
            }}
            className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-[#1A1A1A] hover:text-[#C8942A] transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  )
}
