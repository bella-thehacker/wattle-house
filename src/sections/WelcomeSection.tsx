import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  className?: string
}

export default function WelcomeSection({ className = '' }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLParagraphElement>(null)
  const line2Ref = useRef<HTMLParagraphElement>(null)
  const line3Ref = useRef<HTMLParagraphElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const leafRef = useRef<HTMLDivElement>(null)

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

      // Line 1: entrance 0-30%, settle 30-70%, exit 70-100%
      scrollTl.fromTo(
        line1Ref.current,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      )
      scrollTl.to(line1Ref.current, { y: '-14vh', opacity: 0, ease: 'power2.in' }, 0.7)

      // Line 2: slightly delayed entrance
      scrollTl.fromTo(
        line2Ref.current,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.04
      )
      scrollTl.to(line2Ref.current, { y: '-14vh', opacity: 0, ease: 'power2.in' }, 0.72)

      // Line 3
      scrollTl.fromTo(
        line3Ref.current,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      )
      scrollTl.to(line3Ref.current, { y: '-14vh', opacity: 0, ease: 'power2.in' }, 0.74)

      // Body paragraph
      scrollTl.fromTo(
        bodyRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      )
      scrollTl.to(bodyRef.current, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.76)

      // Links
      scrollTl.fromTo(
        linksRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      )
      scrollTl.to(linksRef.current, { y: '4vh', opacity: 0, ease: 'power2.in' }, 0.78)
    }, section)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="welcome-section"
      ref={sectionRef}
      className={`section-pinned bg-[#F6F2EA] ${className}`}
    >
      {/* Floating Leaf */}
      <div
        ref={leafRef}
        className="absolute top-[15%] right-[15%] w-8 h-8 opacity-40 animate-float-leaf pointer-events-none"
      >
        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-[#4A5A45]">
          <path
            d="M16 2C8 8 4 16 6 24C8 20 12 18 16 18C20 18 24 20 26 24C28 16 24 8 16 2Z"
            fill="currentColor"
            opacity="0.5"
          />
          <path d="M16 18V30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      {/* Content */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[74vw] max-w-[980px] text-center">
        <div className="space-y-2 md:space-y-3 mb-8 md:mb-12">
          <p
            ref={line1Ref}
            className="font-display text-[clamp(22px,3.8vw,48px)] leading-[1.05] tracking-[-0.02em] text-[#1A1A1A]"
            style={{ opacity: 0 }}
          >
            Each visit to Wattle House is a love letter to the countryside —
          </p>
          <p
            ref={line2Ref}
            className="font-display text-[clamp(22px,3.8vw,48px)] leading-[1.05] tracking-[-0.02em] text-[#1A1A1A]"
            style={{ opacity: 0 }}
          >
            its gardens, its grills, its many happy guests, its slow afternoons
          </p>
          <p
            ref={line3Ref}
            className="font-display text-[clamp(22px,3.8vw,48px)] leading-[1.05] tracking-[-0.02em] text-[#1A1A1A] italic"
            style={{ opacity: 0 }}
          >
            and its endless little joys.
          </p>
        </div>

        <p
          ref={bodyRef}
          className="font-body text-[clamp(13px,1.2vw,16px)] leading-[1.7] text-[#6E6A62] max-w-[600px] mx-auto mb-8"
          style={{ opacity: 0 }}
        >
          We're a family-friendly garden restaurant tucked into the green edge of Kikuyu.
          Come for a long lunch, stay for the sunset.
        </p>

        <div
          ref={linksRef}
          className="flex items-center justify-center gap-6 md:gap-8"
          style={{ opacity: 0 }}
        >
          <button
            onClick={() => scrollTo('vinyl-section')}
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#1A1A1A] hover:text-[#C8942A] transition-colors"
          >
            View menus
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <span className="text-[rgba(26,26,26,0.18)]">|</span>
          <button
            onClick={() => scrollTo('booking-section')}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#1A1A1A] hover:text-[#C8942A] transition-colors"
          >
            Book a table
          </button>
        </div>
      </div>
    </section>
  )
}
