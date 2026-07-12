import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: '',
    message: '',
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Form fields stagger
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field')
        gsap.fromTo(
          fields,
          { y: '4vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open WhatsApp with pre-filled message
    const message = `Hello Wattle House! I'd like to make a reservation:\n\nName: ${formData.name}\nDate: ${formData.date}\nGuests: ${formData.guests}\n\n${formData.message}`
    const whatsappUrl = `https://wa.me/+254712345678?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section
      id="booking-section"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/evening-lights-bg.jpg"
          alt="Evening atmosphere"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(15,42,34,0.55), rgba(15,42,34,0.8))',
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-[12vh]"
        style={{ opacity: 0 }}
      >
        <div className="w-full max-w-[720px]">
          {/* Heading */}
          <h2 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.92] tracking-[-0.02em] text-[#F6F2EA] text-center mb-3">
            Book Your Table
          </h2>
          <p className="font-body text-[clamp(13px,1.1vw,16px)] leading-[1.65] text-[#F6F2EA]/70 text-center mb-8 md:mb-12">
            Dinner from 6pm. Weekends from 12pm. Events by arrangement.
          </p>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="form-field" style={{ opacity: 0 }}>
                <label className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#F6F2EA]/60 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-[#F6F2EA]/30 text-[#F6F2EA] py-2.5 focus:outline-none focus:border-[#C8942A] transition-colors placeholder:text-[#F6F2EA]/25"
                  placeholder="Your full name"
                />
              </div>
              <div className="form-field" style={{ opacity: 0 }}>
                <label className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#F6F2EA]/60 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-[#F6F2EA]/30 text-[#F6F2EA] py-2.5 focus:outline-none focus:border-[#C8942A] transition-colors placeholder:text-[#F6F2EA]/25"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="form-field" style={{ opacity: 0 }}>
                <label className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#F6F2EA]/60 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-transparent border-b border-[#F6F2EA]/30 text-[#F6F2EA] py-2.5 focus:outline-none focus:border-[#C8942A] transition-colors"
                />
              </div>
              <div className="form-field" style={{ opacity: 0 }}>
                <label className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#F6F2EA]/60 mb-2">
                  Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-transparent border-b border-[#F6F2EA]/30 text-[#F6F2EA] py-2.5 focus:outline-none focus:border-[#C8942A] transition-colors"
                >
                  <option value="" className="bg-[#0F2A22]">Select number</option>
                  <option value="1" className="bg-[#0F2A22]">1 Guest</option>
                  <option value="2" className="bg-[#0F2A22]">2 Guests</option>
                  <option value="3" className="bg-[#0F2A22]">3 Guests</option>
                  <option value="4" className="bg-[#0F2A22]">4 Guests</option>
                  <option value="5" className="bg-[#0F2A22]">5 Guests</option>
                  <option value="6" className="bg-[#0F2A22]">6+ Guests</option>
                </select>
              </div>
            </div>

            <div className="form-field" style={{ opacity: 0 }}>
              <label className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#F6F2EA]/60 mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full bg-transparent border-b border-[#F6F2EA]/30 text-[#F6F2EA] py-2.5 focus:outline-none focus:border-[#C8942A] transition-colors resize-none placeholder:text-[#F6F2EA]/25"
                placeholder="Any special requests..."
              />
            </div>

            <div className="form-field pt-4" style={{ opacity: 0 }}>
              <button
                type="submit"
                className="w-full md:w-auto px-10 py-3.5 bg-[#C8942A] text-white font-mono text-[11px] uppercase tracking-[0.14em] rounded-full transition-all btn-lift hover:bg-[#d9a53a]"
              >
                Request a Booking
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-10 md:mt-14 pt-8 border-t border-[#F6F2EA]/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center md:text-left">
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#C8942A] mb-2">
                  Phone
                </h4>
                <a
                  href="tel:+254712345678"
                  className="font-body text-[14px] text-[#F6F2EA]/80 hover:text-[#F6F2EA] transition-colors"
                >
                  +254 712 345 678
                </a>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#C8942A] mb-2">
                  Hours
                </h4>
                <p className="font-body text-[14px] text-[#F6F2EA]/80">
                  Tue–Sun: 12pm–10pm
                </p>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#C8942A] mb-2">
                  Location
                </h4>
                <p className="font-body text-[14px] text-[#F6F2EA]/80">
                  Kikuyu, Kenya
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
         <div className="mt-20 mb-8 flex items-center justify-center">
  <div className="w-16 h-px bg-[#C8942A]/40" />
</div>
<footer className="mt-16 md:mt-20 pt-8 border-t border-white/10">
  <div className="flex flex-col gap-8">

    {/* Top Footer */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

      <div>
        <h3 className="font-display text-2xl text-[#F6F2EA]">
          Wattle House
        </h3>
        <p className="font-body text-sm text-[#F6F2EA]/55 mt-1">
          A garden escape in the heart of Kikuyu.
        </p>
      </div>

      <div className="flex items-center gap-6">
        {['Instagram', 'Facebook'].map((social) => (
          <a
            key={social}
            href="#"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F6F2EA]/55 hover:text-[#C8942A] transition-colors duration-300"
          >
            {social}
          </a>
        ))}
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">

      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F6F2EA]/40">
        © 2026 Wattle House. All Rights Reserved.
      </p>

     <a
  href="https://ctrl-blue.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F6F2EA]/35 hover:text-[#C8942A] transition-colors duration-300"
>
  Designed & Developed by{" "}
  <span className="text-[#C8942A] tracking-[0.22em]">
    CTRLCODE SOLUTIONS
  </span>
</a>

    </div>

  </div>
</footer>
        </div>
      </div>
    </section>
  )
}
