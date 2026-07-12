import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  className?: string
}

export default function PlaygroundSection({ className = '' }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const hairlineRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const bulletsRef = useRef<HTMLUListElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

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

      // Photo card - slides from left
      scrollTl.fromTo(
        photoRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      )
      scrollTl.to(photoRef.current, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)

      // Hairline
      scrollTl.fromTo(
        hairlineRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', transformOrigin: 'top' },
        0.08
      )
      scrollTl.to(hairlineRef.current, { opacity: 0, ease: 'power2.in' }, 0.76)

      // Headline
      scrollTl.fromTo(
        headlineRef.current,
        { x: '12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      )
      scrollTl.to(headlineRef.current, { x: '-6vw', opacity: 0, ease: 'power2.in' }, 0.72)

      // Body
      scrollTl.fromTo(
        bodyRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      )
      scrollTl.to(bodyRef.current, { y: '-4vh', opacity: 0, ease: 'power2.in' }, 0.74)

      // Bullets
      if (bulletsRef.current) {
        const items = bulletsRef.current.querySelectorAll('li')
        scrollTl.fromTo(
          items,
          { y: '4vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.16
        )
        scrollTl.to(items, { y: '-3vh', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.76)
      }

      // CTA
      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.2
      )
      scrollTl.to(ctaRef.current, { opacity: 0, ease: 'power2.in' }, 0.78)
    }, section)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="playground-section"
      ref={sectionRef}
      className={`section-pinned bg-[#F6F2EA] ${className}`}
    >
      {/* Left Photo Card */}
      <div
        ref={photoRef}
        className="absolute left-[5vw] top-[18vh] w-[46vw] h-[64vh] rounded-xl overflow-hidden card-shadow group"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/11.jpg"
          alt="Kids playground"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Kids photos overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 border-white/50">
            <img src="/images/kids1.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 border-white/50">
            <img src="/images/kids3.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Vertical Hairline */}
      <div
        ref={hairlineRef}
        className="absolute left-[54vw] top-[18vh] h-[64vh] w-px hairline"
        style={{ transformOrigin: 'top' }}
      />

      {/* Right Text Block */}
      <div className="absolute left-[56vw] top-1/2 -translate-y-1/2 w-[38vw] max-w-[520px] pr-6">
        {/* Arrow icon */}
        <svg
          className="w-5 h-5 text-[#C8942A] mb-4"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M10 4V16M10 4L6 8M10 4L14 8" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h2 className="font-display text-[clamp(28px,4vw,56px)] leading-[0.95] tracking-[-0.02em] text-[#1A1A1A]">
            Kids Play,
          </h2>
          <h2 className="font-display text-[clamp(28px,4vw,56px)] leading-[0.95] tracking-[-0.02em] text-[#1A1A1A] italic">
            Parents Unwind.
          </h2>
        </div>

        <p
          ref={bodyRef}
          className="font-body text-[clamp(13px,1.1vw,16px)] leading-[1.65] text-[#6E6A62] mt-4 md:mt-6 mb-5 md:mb-6"
          style={{ opacity: 0 }}
        >
          A safe playground, open lawns, and easy parking. We've built the kind of
          place where families want to stay all afternoon.
        </p>

        <ul ref={bulletsRef} className="space-y-2 md:space-y-3 mb-5 md:mb-6">
          {[
            { num: '01', label: 'Playground' },
            { num: '02', label: 'Open Lawns' },
            { num: '03', label: 'Weekend Treats' },
          ].map((item) => (
            <li key={item.num} className="flex items-center gap-3" style={{ opacity: 0 }}>
              <span className="font-mono text-[10px] text-[#C8942A] tracking-wider">
                {item.num}
              </span>
              <span className="font-display text-[clamp(14px,1.3vw,20px)] text-[#1A1A1A]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <button
          ref={ctaRef}
          onClick={() => scrollTo('booking-section')}
          className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#1A1A1A] hover:text-[#C8942A] transition-colors"
          style={{ opacity: 0 }}
        >
          Plan a family visit
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </section>
  )
}
