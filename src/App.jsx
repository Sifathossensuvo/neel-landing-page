import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]
const fmt = (n) => '৳' + n.toLocaleString('en-IN')

const PRODUCTS = [
  { id: 1, name: 'Indigo throw', cat: 'Textile', price: 3200, note: 'Hand-dyed cotton, five dips', bg: 'repeating-linear-gradient(90deg,#1B2A6B 0 14px,#E3E8F8 14px 20px,#3A55C4 20px 34px)' },
  { id: 2, name: 'Shibori cushion', cat: 'Textile', price: 1450, note: 'Tie-dyed, kantha stitched', bg: 'radial-gradient(circle at 30% 30%,#E3E8F8 0 10%,transparent 11%),radial-gradient(circle at 70% 62%,#E3E8F8 0 15%,transparent 16%),#3A55C4' },
  { id: 3, name: 'Clay water jug', cat: 'Ceramic', price: 1800, note: 'Wood-fired, 1.2 litres', bg: 'radial-gradient(circle at 50% 60%,#F5B700 0 34%,transparent 35%),#E3E8F8' },
  { id: 4, name: 'Glazed bowl set', cat: 'Ceramic', price: 2400, note: 'Set of four, dishwasher safe', bg: 'radial-gradient(circle at 50% 50%,#0F1A4A 0 22%,#3A55C4 23% 40%,#E3E8F8 41%)' },
  { id: 5, name: 'Jute floor mat', cat: 'Home', price: 2100, note: 'Braided by hand, 90 cm', bg: 'repeating-radial-gradient(circle at 50% 50%,#F5B700 0 10px,#E8A800 10px 20px)' },
  { id: 6, name: 'Brass table lamp', cat: 'Home', price: 4600, note: 'Spun brass, warm bulb included', bg: 'linear-gradient(160deg,#0F1A4A 40%,#F5B700 41% 55%,#0F1A4A 56%)' },
]

const STEPS = [
  { t: 'Dip', d: 'Cotton goes into a living indigo vat. Each dip adds depth, and no two pieces match.' },
  { t: 'Dry', d: 'The cloth hangs in open air so the colour turns from green to deep blue as it meets oxygen.' },
  { t: 'Stitch', d: 'Women-led co-ops in Rajshahi and Jessore finish every piece with hand kantha stitching.' },
]

const QUOTES = [
  { q: 'The throw is softer after every wash, and the blue has only gotten richer.', n: 'Nusrat J.', p: 'Dhaka' },
  { q: 'Packaging was plastic-free and my jug arrived with a handwritten note from the potter.', n: 'Arif H.', p: 'Chattogram' },
  { q: 'I have bought gifts here four times. Everyone asks where they can get one.', n: 'Mim S.', p: 'Sylhet' },
]

/* ---------- Nav ---------- */
function Nav({ cart }) {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const links = [['Shop', '#shop'], ['Craft', '#craft'], ['Stories', '#stories']]
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neel-900/10 bg-chalk/80 backdrop-blur-md">
      <motion.div style={{ scaleX: w }} className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-sun" />
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="font-display text-2xl font-extrabold tracking-tight">Neel</a>
        <ul className="hidden items-center gap-9 text-sm font-medium md:flex">
          {links.map(([l, h]) => (
            <li key={l}><a href={h} className="transition-colors hover:text-neel-500">{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href="#shop" className="relative rounded-full bg-neel-900 px-5 py-2 text-sm font-medium text-chalk transition-colors hover:bg-neel-500">
            Cart
            <AnimatePresence mode="popLayout">
              <motion.span key={cart} initial={{ scale: 0.4, y: -6 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sun px-1 text-xs font-bold text-neel-900">{cart}</motion.span>
            </AnimatePresence>
          </a>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden">
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} className="h-0.5 w-6 bg-neel-900" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }} className="h-0.5 w-6 bg-neel-900" />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.35, ease }}
            className="overflow-hidden bg-chalk md:hidden">
            {links.map(([l, h]) => (
              <li key={l}><a onClick={() => setOpen(false)} href={h} className="block border-t border-neel-900/10 px-5 py-4 font-display text-2xl font-bold">{l}</a></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ---------- Hero ---------- */
function Layer({ sx, sy, depth, className, style, children }) {
  const x = useTransform(sx, [-1, 1], [-depth, depth])
  const y = useTransform(sy, [-1, 1], [-depth, depth])
  return <motion.div style={{ x, y, ...style }} className={className}>{children}</motion.div>
}

function HeroArt() {
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 70, damping: 14 }), sy = useSpring(my, { stiffness: 70, damping: 14 })
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const reset = () => { mx.set(0); my.set(0) }
  return (
    <div onMouseMove={move} onMouseLeave={reset} className="relative mx-auto h-[420px] w-full max-w-xl md:h-[560px]">
      <Layer sx={sx} sy={sy} depth={10} className="absolute left-[8%] top-[6%] h-[78%] w-[62%]">
        <motion.div initial={{ opacity: 0, y: 60, rotate: -14 }} animate={{ opacity: 1, y: 0, rotate: -6 }} transition={{ duration: 1.1, ease, delay: 0.5 }}
          className="h-full w-full rounded-[2rem] shadow-[0_30px_60px_-20px_rgba(15,26,74,.45)]"
          style={{ background: PRODUCTS[0].bg }} />
      </Layer>
      <Layer sx={sx} sy={sy} depth={26} className="absolute bottom-[4%] right-[4%] h-[52%] w-[52%]">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease, delay: 0.75 }}
          className="h-full w-full rounded-full shadow-[0_30px_60px_-20px_rgba(15,26,74,.5)]"
          style={{ background: 'radial-gradient(circle at 35% 30%,#5A74DC,#1B2A6B 60%,#0F1A4A)' }} />
      </Layer>
      <Layer sx={sx} sy={sy} depth={40} className="absolute right-[10%] top-[4%] h-20 w-20 md:h-28 md:w-28">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 1.1 }}
          className="h-full w-full rounded-full bg-sun" />
      </Layer>
      <Layer sx={sx} sy={sy} depth={55} className="absolute bottom-[12%] left-0">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease, delay: 1.3 }}
          className="rounded-2xl bg-chalk/90 px-4 py-3 shadow-xl backdrop-blur">
          <p className="text-sm font-bold">Indigo throw</p>
          <p className="text-xs text-neel-900/60">Five dips, {fmt(3200)}</p>
        </motion.div>
      </Layer>
    </div>
  )
}

function Hero() {
  const words = ['Dyed', 'by', 'hand.', 'Made', 'to', 'live', 'with.']
  return (
    <section id="top" className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-28 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:pt-32">
      <div>
        <h1 className="font-display text-[3.2rem] font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.6rem]">
          {words.map((w, i) => (
            <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
              <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.08 * i }}>{w}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.8 }}
          className="mt-7 max-w-md text-lg leading-relaxed text-neel-900/70">
          Indigo textiles, wood-fired ceramics and home goods from 40 artisan families across Bangladesh. Delivered to your door in 3 days.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 1 }} className="mt-9 flex flex-wrap gap-3">
          <a href="#shop" className="rounded-full bg-sun px-8 py-4 font-bold transition-transform hover:-translate-y-0.5 active:translate-y-0">Shop the collection</a>
          <a href="#craft" className="rounded-full border-2 border-neel-900 px-8 py-4 font-bold transition-colors hover:bg-neel-900 hover:text-chalk">See how it is made</a>
        </motion.div>
      </div>
      <HeroArt />
    </section>
  )
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = ['Free delivery over ৳3,000', 'Cash on delivery', '7-day easy returns', 'Fair-wage artisans', 'Plastic-free packaging']
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden bg-neel-900 py-4 text-chalk" aria-label="Store promises">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-lg font-medium">
        {row.map((t, i) => <span key={i} className="flex items-center gap-12">{t}<i className="h-2 w-2 rounded-full bg-sun" /></span>)}
      </div>
    </div>
  )
}

/* ---------- Shop ---------- */
function Shop({ onAdd }) {
  const cats = ['All', 'Textile', 'Ceramic', 'Home']
  const [cat, setCat] = useState('All')
  const [added, setAdded] = useState(null)
  const list = PRODUCTS.filter((p) => cat === 'All' || p.cat === cat)
  const add = (id) => { onAdd(); setAdded(id); setTimeout(() => setAdded(null), 1200) }
  return (
    <section id="shop" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 md:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-lg font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">Pieces that get better with use</h2>
        <div className="flex flex-wrap gap-2" role="tablist">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className="relative rounded-full px-5 py-2 text-sm font-bold">
              {cat === c && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-neel-900" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className={`relative transition-colors ${cat === c ? 'text-chalk' : 'text-neel-900'}`}>{c}</span>
            </button>
          ))}
        </div>
      </div>
      <motion.div layout className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.article key={p.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease }} className={`group ${i % 3 === 1 ? 'lg:mt-12' : ''}`}>
              <div className="overflow-hidden rounded-[1.75rem]">
                <div className="aspect-[4/5] w-full transition-transform duration-700 ease-out group-hover:scale-105" style={{ background: p.bg }} />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <p className="text-sm text-neel-900/60">{p.note}</p>
                </div>
                <p className="font-display text-lg font-bold">{fmt(p.price)}</p>
              </div>
              <button onClick={() => add(p.id)} className="mt-4 w-full overflow-hidden rounded-full border-2 border-neel-900 py-3 font-bold transition-colors hover:bg-neel-900 hover:text-chalk">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={added === p.id ? 'a' : 'b'} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                    {added === p.id ? 'Added to cart' : 'Add to cart'}
                  </motion.span>
                </AnimatePresence>
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

/* ---------- Craft ---------- */
function Craft() {
  return (
    <section id="craft" className="scroll-mt-16 bg-neel-700 py-24 text-chalk">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">Three steps. Weeks of patience.</h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-chalk/75">Nothing here is rushed. The slow way is the reason it lasts.</p>
        </div>
        <ol className="space-y-6">
          {STEPS.map((s, i) => (
            <motion.li key={s.t} initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease }}
              className="flex gap-6 rounded-[1.75rem] bg-neel-900 p-7 md:p-9">
              <span className="font-display text-5xl font-extrabold text-sun md:text-6xl">{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl font-bold">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-chalk/75">{s.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Stories ---------- */
function Stories() {
  return (
    <section id="stories" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 md:px-8">
      <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">12,000 homes already have a Neel piece</h2>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <motion.figure key={q.n} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className={`flex flex-col justify-between rounded-[1.75rem] p-8 ${i === 1 ? 'bg-sun md:-mt-6 md:mb-6' : 'bg-neel-100'}`}>
            <blockquote className="font-display text-xl font-bold leading-snug">{q.q}</blockquote>
            <figcaption className="mt-8 text-sm"><span className="font-bold">{q.n}</span>, {q.p}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}

/* ---------- CTA + Footer ---------- */
function Join() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = (e) => { e.preventDefault(); if (email.includes('@')) setDone(true) }
  return (
    <section className="px-5 pb-24 md:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-neel-900 px-6 py-16 text-center text-chalk md:py-24">
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sun/90" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">Get ৳300 off your first order</h2>
          <p className="mx-auto mt-5 max-w-md text-chalk/75">Join the list for new drops and potter stories. One email a month.</p>
          <form onSubmit={submit} className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="em" className="sr-only">Email address</label>
            <input id="em" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
              className="flex-1 rounded-full bg-chalk px-6 py-4 text-neel-900 placeholder:text-neel-900/40" />
            <button className="rounded-full bg-sun px-8 py-4 font-bold text-neel-900 transition-transform hover:-translate-y-0.5">Get my code</button>
          </form>
          <AnimatePresence>
            {done && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 font-bold text-sun">Done. Check your inbox for the code.</motion.p>}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-neel-900/10 px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-neel-900/70 md:flex-row">
        <p className="font-display text-xl font-extrabold text-neel-900">Neel</p>
        <p>Made in Bangladesh. © 2026 Neel Crafts Ltd.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [cart, setCart] = useState(0)
  return (
    <>
      <Nav cart={cart} />
      <main>
        <Hero />
        <Marquee />
        <Shop onAdd={() => setCart((c) => c + 1)} />
        <Craft />
        <Stories />
        <Join />
      </main>
      <Footer />
    </>
  )
}
