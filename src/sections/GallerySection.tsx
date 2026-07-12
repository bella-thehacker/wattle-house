import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/4.jpg', caption: 'Garden Dining', size: 'wide' },
  { src: '/images/6.jpg', caption: 'Fire & Flavor', size: 'tall' },
  { src: '/images/19.jpg', caption: 'Coffee in the Morning Sun', size: 'square' },
  { src: '/images/unnamed.jpg', caption: 'Weekend Plates', size: 'wide' },
  { src: '/images/events.jpg', caption: 'Event Space', size: 'square' },
  { src: '/images/7.jpg', caption: 'Evening Terrace', size: 'tall' },
  { src: '/images/kids2.jpg', caption: 'Family Activities', size: 'square' },
  { src: '/images/18.jpg', caption: 'Indoor Ambiance', size: 'wide' },
  { src: '/images/5.jpg', caption: 'Sunset at Wattle House', size: 'square' },
]

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Grid items reveal with stagger
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.gallery-item')
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { y: '8vh', opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
              delay: (i % 3) * 0.08,
            }
          )
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="gallery-section"
      ref={sectionRef}
      className="relative bg-[#F6F2EA] py-[10vh] px-[5vw] md:px-[6vw]"
    >
      {/* Heading */}
      <div ref={headingRef} className="mb-12 md:mb-16" style={{ opacity: 0 }}>
        <h2 className="font-display text-[clamp(32px,4.5vw,64px)] leading-[0.95] tracking-[-0.02em] text-[#1A1A1A]">
          Moments from the House
        </h2>
        <p className="font-body text-[clamp(13px,1.1vw,16px)] leading-[1.65] text-[#6E6A62] mt-3 max-w-[500px]">
          Long lunches. Evening light. Weekends that feel like a getaway.
        </p>
      </div>

      {/* Masonry Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]"
      >
        {galleryImages.map((img, i) => {
          const sizeClasses: Record<string, string> = {
            wide: 'col-span-2 row-span-1',
            tall: 'col-span-1 row-span-2',
            square: 'col-span-1 row-span-1',
          }

          return (
            <div
              key={i}
              className={`gallery-item relative rounded-xl overflow-hidden cursor-pointer group ${sizeClasses[img.size]}`}
              style={{ opacity: 0 }}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-3 left-3 font-display text-white text-[clamp(12px,1.2vw,16px)] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {img.caption}
              </span>
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          />
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
