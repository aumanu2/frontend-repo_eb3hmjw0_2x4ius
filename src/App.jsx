import { useEffect, useMemo, useState } from 'react'

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

function ReasonItem({ index, text }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/80 border border-gray-100">
      <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center text-sm font-bold">
        {index}
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  )
}

function App() {
  const [name, setName] = useState('Little Bro')
  const [message, setMessage] = useState('I am so proud of the person you are becoming. No matter how tall you grow or how far you go, you will always have me cheering for you. — With love, your big brother ❤️')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('bro-love-message')
    const savedName = localStorage.getItem('bro-love-name')
    if (saved) setMessage(saved)
    if (savedName) setName(savedName)
  }, [])

  useEffect(() => {
    localStorage.setItem('bro-love-message', message)
  }, [message])

  useEffect(() => {
    localStorage.setItem('bro-love-name', name)
  }, [name])

  const reasons = useMemo(
    () => [
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
    ],
    []
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-sky-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-100">
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
                <span className="block bg-gradient-to-r from-rose-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">
                  amazing little brother
                </span>
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                This is a small corner of the internet to remind you how loved you are — today and every day.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Pill>Forever teammates</Pill>
                <Pill>Built with love</Pill>
                <Pill>Big bro approved</Pill>
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

      {/* Memories */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Some of my favorite memories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MemoryCard title="Late-night laughs" subtitle="Jokes only we understand" icon="🤣" />
          <MemoryCard title="Team wins" subtitle="Sports, games, life — we got this" icon="🏆" />
          <MemoryCard title="Snack raids" subtitle="Master chefs at 2am" icon="🍜" />
          <MemoryCard title="Road trips" subtitle="The playlist no one else gets" icon="🚗" />
          <MemoryCard title="Festivals" subtitle="Lights, music, and us" icon="🎆" />
          <MemoryCard title="Photo fails" subtitle="But perfect to me" icon="📷" />
        </div>
      </section>

      {/* Letter */}
      <section id="letter" className="bg-white/70 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">A letter from your big brother</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            {!editing ? (
              <>
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{message}</p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium transition-colors"
                  >
                    Edit message
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
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section id="reasons" className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">10 reasons I’m proud of you</h2>
          <Sparkle />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {reasons.map((r, i) => (
            <ReasonItem key={i} index={i + 1} text={r} />
          ))}
        </div>
      </section>

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
      <footer className="border-t border-gray-100 bg-white/70">
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
