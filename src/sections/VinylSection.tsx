import { useLayoutEffect, useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  className?: string
}

export default function VinylSection({ className = '' }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const discRef = useRef<HTMLDivElement>(null)
  const labelHolesRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const bulletsRef = useRef<HTMLUListElement>(null)
  const bottomNavRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef(0)
  const [activeTrack, setActiveTrack] = useState<number | null>(null)

  // Continuous rotation during settle
  useEffect(() => {
    const disc = discRef.current
    if (!disc) return

    let rafId: number
    const animate = () => {
      rotationRef.current += 0.3
      disc.style.transform = `rotate(${rotationRef.current}deg)`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafId)
  }, [])

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

      // Disc: slides in from left, rotates, then exits right
      scrollTl.fromTo(
        discRef.current,
        { x: '-60vw', rotation: -120, opacity: 0 },
        { x: 0, rotation: 0, opacity: 1, ease: 'none' },
        0
      )
      scrollTl.to(
        discRef.current,
        { x: '26vw', rotation: 160, opacity: 0, ease: 'power2.in' },
        0.7
      )

      // Label holes
      scrollTl.fromTo(
        labelHolesRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, ease: 'none' },
        0.15
      )
      scrollTl.to(labelHolesRef.current, { opacity: 0, scale: 0.8, ease: 'power2.in' }, 0.75)

      // Title
      scrollTl.fromTo(
        titleRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      )
      scrollTl.to(titleRef.current, { x: '-6vw', opacity: 0, ease: 'power2.in' }, 0.72)

      // Paragraph
      scrollTl.fromTo(
        paraRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      )
      scrollTl.to(paraRef.current, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.74)

      // Bullets with stagger
      if (bulletsRef.current) {
        const items = bulletsRef.current.querySelectorAll('li')
        scrollTl.fromTo(
          items,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.2
        )
        scrollTl.to(items, { y: '-4vh', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.76)
      }

      // Bottom nav
      scrollTl.fromTo(
        bottomNavRef.current,
        { y: '7vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      )
      scrollTl.to(bottomNavRef.current, { y: '7vh', opacity: 0, ease: 'power2.in' }, 0.78)
    }, section)

    return () => ctx.revert()
  }, [])

  const menuItems = [
    { num: '01', label: 'Starters & Salads', desc: 'Fresh garden salads, sharing plates' },
    { num: '02', label: 'Grills & Mains', desc: 'Flame-cooked meats, signature burgers' },
    { num: '03', label: 'Desserts & Coffee', desc: 'Homemade treats, artisan coffee' },
    { num: '04', label: 'Drinks', desc: 'Fresh juices, cocktails, local beers' },
    { num: '05', label: "Kids' Menu", desc: 'Child-friendly favorites' },
  ]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="vinyl-section"
      ref={sectionRef}
      className={`section-pinned bg-[#F6F2EA] overflow-hidden ${className}`}
    >
      {/* Vinyl Disc */}
      <div
        ref={discRef}
        className="absolute left-[-6vw] top-1/2 -translate-y-1/2 w-[56vw] h-[56vw] max-w-[680px] max-h-[680px]"
        style={{ opacity: 0 }}
      >
        <div className="relative w-full h-full rounded-full bg-[#1A1A1A] shadow-2xl">
          {/* Groove rings */}
          <div
            className="absolute inset-[8%] rounded-full"
            style={{
              background: `repeating-radial-gradient(
                circle at center,
                transparent 0px,
                transparent 3px,
                rgba(255,255,255,0.03) 3px,
                rgba(255,255,255,0.03) 4px
              )`,
            }}
          />
          <div
            className="absolute inset-[15%] rounded-full"
            style={{
              background: `repeating-radial-gradient(
                circle at center,
                transparent 0px,
                transparent 5px,
                rgba(255,255,255,0.02) 5px,
                rgba(255,255,255,0.02) 6px
              )`,
            }}
          />

          {/* Label */}
          <div className="absolute inset-[28%] rounded-full bg-[#F6F2EA] flex flex-col items-center justify-center">
            {/* Gold ring */}
            <div className="absolute inset-[2%] rounded-full border-2 border-[#C8942A]" />

            {/* Center hole */}
            <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#1A1A1A]" />

            {/* Label text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="font-display text-[clamp(8px,1vw,12px)] text-[#1A1A1A] tracking-wider">
                WATTLE HOUSE
              </span>
              <span className="font-mono text-[clamp(6px,0.7vw,9px)] text-[#6E6A62] mt-1">
                MENU
              </span>
            </div>

            {/* Decorative holes (gold dots) */}
            <div ref={labelHolesRef} className="absolute inset-0" style={{ opacity: 0 }}>
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C8942A]"
                  style={{
                    left: `${50 + 38 * Math.cos((angle * Math.PI) / 180)}%`,
                    top: `${50 + 38 * Math.sin((angle * Math.PI) / 180)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Text Block */}
      <div className="absolute left-[56vw] top-1/2 -translate-y-1/2 w-[38vw] max-w-[520px] pr-6">
        <h2
          ref={titleRef}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6E6A62] mb-4 md:mb-6"
          style={{ opacity: 0 }}
        >
          A Taste of the Menu
        </h2>

        <p
          ref={paraRef}
          className="font-body text-[clamp(13px,1.1vw,16px)] leading-[1.65] text-[#1A1A1A] mb-6 md:mb-8"
          style={{ opacity: 0 }}
        >
          Small plates for sharing. Grills cooked over open flame. Fresh sides.
          Homemade desserts. Coffee made slowly.
        </p>

        <ul ref={bulletsRef} className="space-y-3 md:space-y-4">
          {menuItems.map((item, i) => (
            <li
              key={item.num}
              className="group cursor-pointer"
              style={{ opacity: 0 }}
              onMouseEnter={() => setActiveTrack(i)}
              onMouseLeave={() => setActiveTrack(null)}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] text-[#C8942A] tracking-wider">
                  {item.num}
                </span>
                <div>
                  <span
                    className={`font-display text-[clamp(15px,1.4vw,20px)] transition-colors ${
                      activeTrack === i ? 'text-[#C8942A]' : 'text-[#1A1A1A]'
                    }`}
                  >
                    {item.label}
                  </span>
                  <p className="font-body text-[11px] md:text-[12px] text-[#6E6A62] mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Nav */}
      <div
        ref={bottomNavRef}
        className="absolute bottom-0 left-0 right-0 h-[7vh] bg-[#F6F2EA] border-t border-[rgba(26,26,26,0.12)] flex items-center justify-center gap-6 md:gap-10"
        style={{ opacity: 0 }}
      >
        {['Food & Drink', 'Reservations', 'Visit Us', 'FAQs'].map((item) => (
          <button
            key={item}
            onClick={() => {
              if (item === 'Reservations') scrollTo('booking-section')
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
