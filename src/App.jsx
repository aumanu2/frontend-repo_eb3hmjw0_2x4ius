import { useEffect, useMemo, useRef, useState } from 'react'

function Sparkle({ delay = 0, className = '' }) {
  return (
    <span
      className={`inline-block animate-pulse text-pink-500 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      ✨
    </span>
  )
}

function Pill({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700 border border-pink-200">
      {children}
    </span>
  )
}

function MemoryCard({ title, subtitle, icon }) {
  return (
    <div className="group bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-shadow rounded-xl p-4 border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

function ReasonItem({ index, text, onRemove }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/80 border border-gray-100">
      <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center text-sm font-bold">
        {index}
      </div>
      <p className="text-gray-700 flex-1">{text}</p>
      {onRemove && (
        <button
          aria-label="Remove reason"
          onClick={onRemove}
          className="text-xs px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          Remove
        </button>
      )}
    </div>
  )
}

const DEFAULT_MEMORIES = [
  { title: 'Late-night laughs', subtitle: 'Jokes only we understand', icon: '🤣' },
  { title: 'Team wins', subtitle: 'Sports, games, life — we got this', icon: '🏆' },
  { title: 'Snack raids', subtitle: 'Master chefs at 2am', icon: '🍜' },
  { title: 'Road trips', subtitle: 'The playlist no one else gets', icon: '🚗' },
  { title: 'Festivals', subtitle: 'Lights, music, and us', icon: '🎆' },
  { title: 'Photo fails', subtitle: 'But perfect to me', icon: '📷' }
]

const DEFAULT_REASONS = [
  'You never give up, even when things get tough.',
  'Your smile makes even boring days awesome.',
  'You care about people more than you realize.',
  'You learn fast and keep getting better.',
  'You make our family proud in your own way.',
  'You stand up for what’s right.',
  'You’re funny without even trying.',
  'You dream big — and that inspires me too.',
  'You’re kind to those who need it most.',
  'You’re my forever teammate in this life.'
]

const THEMES = {
  pink: {
    name: 'Love Pink',
    from: 'from-rose-50',
    via: 'via-pink-50',
    to: 'to-sky-50',
    accentFrom: 'from-rose-500',
    accentTo: 'to-pink-500',
    pillBg: 'bg-pink-100',
    pillText: 'text-pink-700',
    pillBorder: 'border-pink-200'
  },
  blue: {
    name: 'Calm Blue',
    from: 'from-sky-50',
    via: 'via-blue-50',
    to: 'to-indigo-50',
    accentFrom: 'from-sky-500',
    accentTo: 'to-indigo-500',
    pillBg: 'bg-sky-100',
    pillText: 'text-sky-700',
    pillBorder: 'border-sky-200'
  },
  purple: {
    name: 'Royal Purple',
    from: 'from-fuchsia-50',
    via: 'via-purple-50',
    to: 'to-violet-50',
    accentFrom: 'from-fuchsia-500',
    accentTo: 'to-violet-500',
    pillBg: 'bg-fuchsia-100',
    pillText: 'text-fuchsia-700',
    pillBorder: 'border-fuchsia-200'
  }
}

function App() {
  const [name, setName] = useState('Little Bro')
  const [message, setMessage] = useState('I am so proud of the person you are becoming. No matter how tall you grow or how far you go, you will always have me cheering for you. — With love, your big brother ❤️')
  const [editing, setEditing] = useState(false)
  const [memories, setMemories] = useState(DEFAULT_MEMORIES)
  const [reasons, setReasons] = useState(DEFAULT_REASONS)
  const [newReason, setNewReason] = useState('')
  const [themeKey, setThemeKey] = useState('pink')

  // Gallery
  const [gallery, setGallery] = useState([])
  const [photoForm, setPhotoForm] = useState({ url: '', caption: '' })

  // Countdown
  const [countdownLabel, setCountdownLabel] = useState('Big day')
  const [countdownDate, setCountdownDate] = useState('')
  const [timeLeft, setTimeLeft] = useState(null)
  const [countdownCelebrated, setCountdownCelebrated] = useState(false)

  // Music
  const [musicUrl, setMusicUrl] = useState('')
  const [musicOn, setMusicOn] = useState(false)
  const audioRef = useRef(null)

  // Timeline
  const [timeline, setTimeline] = useState([]) // {year, text}
  const [timelineForm, setTimelineForm] = useState({ year: '', text: '' })

  // Wish wall
  const [wishes, setWishes] = useState([]) // {text, date}
  const [wishText, setWishText] = useState('')

  // Heart trail
  const [heartTrailOn, setHeartTrailOn] = useState(false)

  const theme = THEMES[themeKey]

  useEffect(() => {
    const saved = localStorage.getItem('bro-love-message')
    const savedName = localStorage.getItem('bro-love-name')
    const savedMem = localStorage.getItem('bro-love-memories')
    const savedReasons = localStorage.getItem('bro-love-reasons')
    const savedTheme = localStorage.getItem('bro-love-theme')
    const savedGallery = localStorage.getItem('bro-love-gallery')
    const savedCountdown = localStorage.getItem('bro-love-countdown')
    const savedMusic = localStorage.getItem('bro-love-music')
    const savedTimeline = localStorage.getItem('bro-love-timeline')
    const savedWishes = localStorage.getItem('bro-love-wishes')
    const savedTrail = localStorage.getItem('bro-love-hearttrail')

    if (saved) setMessage(saved)
    if (savedName) setName(savedName)
    if (savedMem) { try { setMemories(JSON.parse(savedMem)) } catch {} }
    if (savedReasons) { try { setReasons(JSON.parse(savedReasons)) } catch {} }
    if (savedTheme && THEMES[savedTheme]) setThemeKey(savedTheme)
    if (savedGallery) { try { setGallery(JSON.parse(savedGallery)) } catch {} }
    if (savedCountdown) { try {
      const obj = JSON.parse(savedCountdown)
      if (obj.label) setCountdownLabel(obj.label)
      if (obj.date) setCountdownDate(obj.date)
    } catch {} }
    if (savedMusic) { try {
      const obj = JSON.parse(savedMusic)
      if (obj.url) setMusicUrl(obj.url)
      if (typeof obj.on === 'boolean') setMusicOn(obj.on)
    } catch {} }
    if (savedTimeline) { try { setTimeline(JSON.parse(savedTimeline)) } catch {} }
    if (savedWishes) { try { setWishes(JSON.parse(savedWishes)) } catch {} }
    if (savedTrail) { setHeartTrailOn(savedTrail === '1') }
  }, [])

  useEffect(() => { localStorage.setItem('bro-love-message', message) }, [message])
  useEffect(() => { localStorage.setItem('bro-love-name', name) }, [name])
  useEffect(() => { localStorage.setItem('bro-love-memories', JSON.stringify(memories)) }, [memories])
  useEffect(() => { localStorage.setItem('bro-love-reasons', JSON.stringify(reasons)) }, [reasons])
  useEffect(() => { localStorage.setItem('bro-love-theme', themeKey) }, [themeKey])
  useEffect(() => { localStorage.setItem('bro-love-gallery', JSON.stringify(gallery)) }, [gallery])
  useEffect(() => { localStorage.setItem('bro-love-countdown', JSON.stringify({ label: countdownLabel, date: countdownDate })) }, [countdownLabel, countdownDate])
  useEffect(() => { localStorage.setItem('bro-love-music', JSON.stringify({ url: musicUrl, on: musicOn })) }, [musicUrl, musicOn])
  useEffect(() => { localStorage.setItem('bro-love-timeline', JSON.stringify(timeline)) }, [timeline])
  useEffect(() => { localStorage.setItem('bro-love-wishes', JSON.stringify(wishes)) }, [wishes])
  useEffect(() => { localStorage.setItem('bro-love-hearttrail', heartTrailOn ? '1' : '0') }, [heartTrailOn])

  const [memForm, setMemForm] = useState({ icon: '💖', title: '', subtitle: '' })

  function addMemory() {
    if (!memForm.title.trim()) return
    setMemories([{ ...memForm }, ...memories])
    setMemForm({ icon: '💖', title: '', subtitle: '' })
  }

  function addReason() {
    if (!newReason.trim()) return
    setReasons((prev) => [...prev, newReason.trim()])
    setNewReason('')
  }

  function removeReason(index) {
    setReasons((prev) => prev.filter((_, i) => i !== index))
  }

  function celebrate() {
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.inset = '0'
    container.style.pointerEvents = 'none'
    container.style.zIndex = '50'
    document.body.appendChild(container)

    const count = 120
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span')
      piece.textContent = ['🎉','💖','✨','⭐','🎊','💫','🌟'][Math.floor(Math.random() * 7)]
      piece.style.position = 'absolute'
      piece.style.left = Math.random() * 100 + 'vw'
      piece.style.top = '-2rem'
      piece.style.fontSize = 14 + Math.random() * 20 + 'px'
      piece.style.willChange = 'transform, opacity'
      piece.style.transition = 'transform 1.8s ease-out, opacity 2s ease-out'
      container.appendChild(piece)
      const dx = (Math.random() - 0.5) * 240
      const dy = 120 + Math.random() * 900
      const rot = (Math.random() - 0.5) * 360
      requestAnimationFrame(() => {
        piece.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`
        piece.style.opacity = '0'
      })
    }
    setTimeout(() => container.remove(), 2300)
  }

  function downloadLetter() {
    const blob = new Blob([message], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name.replace(/\s+/g, '_')}_letter.txt`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  async function sharePage() {
    const shareData = {
      title: 'Big Bro Love',
      text: `A little note for ${name} 💖`,
      url: window.location.href
    }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  function addPhoto() {
    if (!photoForm.url.trim()) return
    setGallery((g) => [{ ...photoForm }, ...g])
    setPhotoForm({ url: '', caption: '' })
  }

  function removePhoto(index) {
    setGallery((g) => g.filter((_, i) => i !== index))
  }

  // Timeline actions
  function addTimelineItem() {
    if (!timelineForm.year.trim() || !timelineForm.text.trim()) return
    const yearNum = parseInt(timelineForm.year, 10)
    const item = { year: isNaN(yearNum) ? timelineForm.year.trim() : yearNum, text: timelineForm.text.trim() }
    setTimeline((t) => [...t, item].sort((a, b) => (a.year+'' > b.year+'') ? 1 : -1))
    setTimelineForm({ year: '', text: '' })
  }
  function removeTimelineItem(i) { setTimeline((t) => t.filter((_, idx) => idx !== i)) }

  // Wishes actions
  function addWish() {
    if (!wishText.trim()) return
    setWishes((w) => [{ text: wishText.trim(), date: new Date().toISOString() }, ...w])
    setWishText('')
  }
  function removeWish(i) { setWishes((w) => w.filter((_, idx) => idx !== i)) }

  // Countdown compute + celebrate when done
  useEffect(() => {
    if (!countdownDate) { setTimeLeft(null); setCountdownCelebrated(false); return }
    function compute() {
      const target = new Date(countdownDate).getTime()
      const now = Date.now()
      const diff = target - now
      if (isNaN(target)) { setTimeLeft(null); return }
      if (diff <= 0) {
        setTimeLeft({ d:0,h:0,m:0,s:0, done: true })
        if (!countdownCelebrated) {
          celebrate()
          setCountdownCelebrated(true)
        }
        return
      }
      const d = Math.floor(diff / (1000*60*60*24))
      const h = Math.floor((diff / (1000*60*60)) % 24)
      const m = Math.floor((diff / (1000*60)) % 60)
      const s = Math.floor((diff / 1000) % 60)
      setTimeLeft({ d, h, m, s, done: false })
    }
    compute()
    const id = setInterval(compute, 1000)
    return () => clearInterval(id)
  }, [countdownDate, countdownCelebrated])

  // Music control
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (musicOn && musicUrl) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [musicOn, musicUrl])

  function toggleMusic() { setMusicOn((v) => !v) }
  function printPage() { window.print() }

  // Heart trail listener
  useEffect(() => {
    if (!heartTrailOn) return
    function onMove(e) {
      const heart = document.createElement('span')
      heart.textContent = '❤️'
      heart.style.position = 'fixed'
      heart.style.left = e.clientX + 'px'
      heart.style.top = e.clientY + 'px'
      heart.style.pointerEvents = 'none'
      heart.style.transform = 'translate(-50%, -50%) scale(1)'
      heart.style.transition = 'transform 1s ease-out, opacity 1s ease-out'
      heart.style.opacity = '1'
      heart.style.zIndex = '50'
      document.body.appendChild(heart)
      requestAnimationFrame(() => {
        heart.style.transform = 'translate(-50%, -80%) scale(0.6)'
        heart.style.opacity = '0'
      })
      setTimeout(() => heart.remove(), 1000)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [heartTrailOn])

  // Surprise message
  const [secret, setSecret] = useState({ code: '', text: '' })
  const [unlockAttempt, setUnlockAttempt] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('bro-love-secret')
    if (saved) { try { const obj = JSON.parse(saved); setSecret(obj) } catch {} }
  }, [])
  useEffect(() => {
    localStorage.setItem('bro-love-secret', JSON.stringify(secret))
  }, [secret])

  const accentText = `bg-gradient-to-r ${theme.accentFrom} ${theme.accentTo} bg-clip-text text-transparent`
  const bgGradient = `bg-gradient-to-br ${theme.from} ${theme.via} ${theme.to}`

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-100 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-600 font-bold">
            <span className="text-xl">❤️</span>
            <span>Big Bro Love</span>
          </div>
          <nav className="flex items-center gap-2">
            <a
              href="/test"
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-100"
            >
              Check backend
            </a>
            <a
              href="#letter"
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-100"
            >
              Letter
            </a>
            <a
              href="#reasons"
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-100"
            >
              Reasons
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-20 -left-20 h-72 w-72 bg-pink-200 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 bg-sky-200 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                For my
                <span className={`block ${accentText}`}>
                  amazing little brother
                </span>
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                This is a small corner of the internet to remind you how loved you are — today and every day.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme.pillBg} ${theme.pillText} ${theme.pillBorder} border`}>Forever teammates</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme.pillBg} ${theme.pillText} ${theme.pillBorder} border`}>Built with love</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme.pillBg} ${theme.pillText} ${theme.pillBorder} border`}>Big bro approved</span>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="Your name"
                />
                <span className="text-gray-500 text-sm">appears below</span>
              </div>

              {/* Quick actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3 print:hidden">
                <button onClick={celebrate} className="px-3 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-sm">Celebrate 🎉</button>
                <button onClick={downloadLetter} className="px-3 py-2 rounded-lg bg-gray-900 hover:bg-black text-white text-sm">Download letter</button>
                <button onClick={sharePage} className="px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-sm">Share link</button>
                <button onClick={printPage} className="px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-sm">Print</button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  Hey {name},
                  <br />
                  You are stronger, kinder, and braver than you know. I’m always here — for your wins and your tough days.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xl">
                  <Sparkle /> <Sparkle delay={200} /> <Sparkle delay={400} />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rotate-[-2deg] bg-white border border-gray-200 rounded-xl p-3 shadow">
                <div className="text-2xl">🎮</div>
                <div className="text-xs text-gray-500">Player 1 & Player 2</div>
              </div>
              <div className="absolute -top-4 -right-4 rotate-2 bg-white border border-gray-200 rounded-xl p-3 shadow">
                <div className="text-2xl">📸</div>
                <div className="text-xs text-gray-500">Memories incoming</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalize */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Personalize the vibe</h3>
              <p className="text-sm text-gray-600">Pick a color theme, add memories, reasons, photos, timeline and more. Everything saves automatically.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {Object.entries(THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setThemeKey(key)}
                  className={`px-3 py-2 rounded-lg border text-sm ${themeKey === key ? 'border-gray-900' : 'border-gray-200 hover:border-gray-300'} bg-white`}
                >
                  <span className={`inline-block h-3 w-3 rounded-full mr-2 bg-gradient-to-r ${t.accentFrom} ${t.accentTo}`}></span>
                  {t.name}
                </button>
              ))}
              <button onClick={() => setHeartTrailOn((v)=>!v)} className={`px-3 py-2 rounded-lg text-sm ${heartTrailOn ? 'bg-rose-500 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>{heartTrailOn ? 'Disable heart trail' : 'Enable heart trail'}</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {/* Add memory */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h4 className="font-medium text-gray-900 mb-3">Add a memory</h4>
              <div className="flex items-center gap-2 mb-2">
                <input
                  value={memForm.icon}
                  onChange={(e) => setMemForm((f) => ({ ...f, icon: e.target.value }))}
                  className="w-16 px-2 py-2 border border-gray-200 rounded-lg"
                  placeholder="😊"
                />
                <input
                  value={memForm.title}
                  onChange={(e) => setMemForm((f) => ({ ...f, title: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Title"
                />
              </div>
              <input
                value={memForm.subtitle}
                onChange={(e) => setMemForm((f) => ({ ...f, subtitle: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                placeholder="Short note"
              />
              <div className="mt-3 flex items-center gap-2">
                <button onClick={addMemory} className="px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm">Add memory</button>
                {memories.length > 0 && (
                  <button onClick={() => setMemories([])} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">Clear all</button>
                )}
              </div>
            </div>

            {/* Add reason */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h4 className="font-medium text-gray-900 mb-3">Add a reason</h4>
              <div className="flex items-center gap-2">
                <input
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Because..."
                />
                <button onClick={addReason} className="px-3 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-sm">Add</button>
                {reasons.length > 0 && (
                  <button onClick={() => setReasons([])} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">Clear all</button>
                )}
              </div>
            </div>
          </div>

          {/* Gallery + Countdown + Music */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {/* Gallery */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h4 className="font-medium text-gray-900 mb-3">Photo gallery</h4>
              <div className="flex items-center gap-2 mb-2">
                <input
                  value={photoForm.url}
                  onChange={(e) => setPhotoForm((f) => ({ ...f, url: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Paste image URL (https://...)"
                />
              </div>
              <input
                value={photoForm.caption}
                onChange={(e) => setPhotoForm((f) => ({ ...f, caption: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                placeholder="Caption (optional)"
              />
              <div className="mt-3 flex items-center gap-2">
                <button onClick={addPhoto} className="px-3 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm">Add photo</button>
                {gallery.length > 0 && (
                  <button onClick={() => setGallery([])} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">Clear all</button>
                )}
              </div>
            </div>

            {/* Countdown & Music */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h4 className="font-medium text-gray-900 mb-3">Countdown & music</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                <input
                  value={countdownLabel}
                  onChange={(e) => setCountdownLabel(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Event name"
                />
                <input
                  type="date"
                  value={countdownDate}
                  onChange={(e) => setCountdownDate(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-2 mt-2 items-center">
                <input
                  value={musicUrl}
                  onChange={(e) => setMusicUrl(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Music URL (mp3)"
                />
                <button onClick={toggleMusic} className={`px-3 py-2 rounded-lg text-sm ${musicOn ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>{musicOn ? 'Pause music' : 'Play music'}</button>
              </div>
              <audio ref={audioRef} src={musicUrl || undefined} loop className="hidden" />
            </div>
          </div>

          {/* Timeline + Wishes */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {/* Timeline */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h4 className="font-medium text-gray-900 mb-3">Timeline</h4>
              <div className="grid sm:grid-cols-3 gap-2 mb-2">
                <input
                  value={timelineForm.year}
                  onChange={(e)=>setTimelineForm((f)=>({...f, year: e.target.value}))}
                  className="px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Year"
                />
                <input
                  value={timelineForm.text}
                  onChange={(e)=>setTimelineForm((f)=>({...f, text: e.target.value}))}
                  className="sm:col-span-2 px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="What happened"
                />
              </div>
              <div className="flex items-center gap-2">
                <button onClick={addTimelineItem} className="px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm">Add moment</button>
                {timeline.length > 0 && (
                  <button onClick={()=>setTimeline([])} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">Clear all</button>
                )}
              </div>
            </div>

            {/* Wishes */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h4 className="font-medium text-gray-900 mb-3">Wish wall</h4>
              <div className="flex items-center gap-2">
                <input
                  value={wishText}
                  onChange={(e)=>setWishText(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Write a small wish or encouragement"
                />
                <button onClick={addWish} className="px-3 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-sm">Add</button>
                {wishes.length > 0 && (
                  <button onClick={()=>setWishes([])} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">Clear all</button>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Memories */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Some of my favorite memories</h2>
        {memories.length === 0 ? (
          <p className="text-gray-500">No memories yet — add a few above to make this truly yours.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {memories.map((m, idx) => (
              <MemoryCard key={idx} title={m.title} subtitle={m.subtitle} icon={m.icon} />
            ))}
          </div>
        )}
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our photos</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((p, i) => (
              <figure key={i} className="group overflow-hidden rounded-xl border border-gray-200 bg-white">
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img src={p.url} alt={p.caption || `Photo ${i+1}`} className="w-full h-56 object-cover" />
                <figcaption className="flex items-center justify-between px-3 py-2 text-sm text-gray-700">
                  <span className="truncate mr-2">{p.caption || '—'}</span>
                  <button onClick={() => removePhoto(i)} className="text-xs px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700">Remove</button>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Letter */}
      <section id="letter" className="bg-white/70 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">A letter from your big brother</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            {!editing ? (
              <>
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{message}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium transition-colors"
                  >
                    Edit message
                  </button>
                  <button
                    onClick={downloadLetter}
                    className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-black text-white font-medium transition-colors"
                  >
                    Download
                  </button>
                  <span className="text-sm text-gray-500">Autosaves to your browser</span>
                </div>
              </>
            ) : (
              <>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setMessage('')}
                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </>
            )}

            {/* Secret reveal inside letter for the recipient */}
            {secret.text && (
              <div className="mt-6 p-4 rounded-lg border border-emerald-200 bg-emerald-50">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-emerald-700">Secret note</p>
                  {!unlocked && <span className="text-xs text-emerald-700">Locked</span>}
                </div>
                {unlocked ? (
                  <p className="mt-2 text-emerald-800">{secret.text}</p>
                ) : (
                  <p className="mt-2 text-emerald-800 opacity-60 select-none">•••••••••••••••••••••</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline display */}
      {timeline.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our timeline</h2>
          <ol className="relative border-l border-gray-200">
            {timeline.map((item, i) => (
              <li key={i} className="ml-4 mb-6">
                <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-rose-500 to-pink-500"></div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <time className="text-sm font-medium text-gray-900">{item.year}</time>
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                  <button onClick={()=>removeTimelineItem(i)} className="text-xs px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700">Remove</button>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Wishes display */}
      {wishes.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Wish wall</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {wishes.map((w, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 flex items-start justify-between">
                <div>
                  <p className="text-gray-800">{w.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(w.date).toLocaleString()}</p>
                </div>
                <button onClick={()=>removeWish(i)} className="text-xs px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 ml-3">Remove</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reasons */}
      <section id="reasons" className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">10 reasons I’m proud of you</h2>
          <Sparkle />
        </div>
        {reasons.length === 0 ? (
          <p className="text-gray-500">No reasons yet — add one above to get started.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {reasons.map((r, i) => (
              <ReasonItem key={i} index={i + 1} text={r} onRemove={() => removeReason(i)} />
            ))}
          </div>
        )}
      </section>

      {/* Countdown display */}
      {timeLeft && (
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-sky-50 p-6 text-center">
            {!timeLeft.done ? (
              <>
                <p className="text-gray-700">Countdown to {countdownLabel}:</p>
                <div className="mt-3 flex items-center justify-center gap-3">
                  <div className="px-4 py-2 rounded-lg bg-white border border-gray-200"><div className="text-2xl font-bold text-gray-900">{timeLeft.d}</div><div className="text-xs text-gray-500">days</div></div>
                  <div className="px-4 py-2 rounded-lg bg-white border border-gray-200"><div className="text-2xl font-bold text-gray-900">{timeLeft.h}</div><div className="text-xs text-gray-500">hours</div></div>
                  <div className="px-4 py-2 rounded-lg bg-white border border-gray-200"><div className="text-2xl font-bold text-gray-900">{timeLeft.m}</div><div className="text-xs text-gray-500">mins</div></div>
                  <div className="px-4 py-2 rounded-lg bg-white border border-gray-200"><div className="text-2xl font-bold text-gray-900">{timeLeft.s}</div><div className="text-xs text-gray-500">secs</div></div>
                </div>
              </>
            ) : (
              <p className="text-gray-800 text-lg">It’s here! Happy {countdownLabel}! 🎉</p>
            )}
          </div>
        </section>
      )}

      {/* Callout */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-6 text-center">
            <p className="text-gray-700 text-lg">
              No matter what happens, you’ll always have a home in my heart. If you ever need me, I’m one call away.
            </p>
            <div className="mt-4 text-3xl">🤝</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white/70 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">Made with ❤️ by an elder brother</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Share this page with him today</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
