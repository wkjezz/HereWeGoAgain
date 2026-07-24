import { useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'piper-interruptions-count'
const CONFETTI_COLORS = ['#ff1717', '#ff4d4d', '#ff8c8c', '#ff0a0a', '#ff6b00', '#ffffff']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function createConfetti() {
  return Array.from({ length: 30 }, () => ({
    left: randomBetween(-15, 110),
    delay: randomBetween(0, 0.35),
    duration: randomBetween(0.8, 1.5),
    width: randomBetween(0.9, 2.6),
    height: randomBetween(0.9, 2.6),
    rotation: randomBetween(-720, 720),
    skew: randomBetween(-35, 35),
    scale: randomBetween(0.7, 1.5),
    color: CONFETTI_COLORS[Math.floor(randomBetween(0, CONFETTI_COLORS.length))],
    corner: randomBetween(0, 0.5),
  }))
}

function App() {
  const [count, setCount] = useState(0)
  const [burst, setBurst] = useState(false)
  const audioRef = useRef(null)
  const confettiPieces = useMemo(() => createConfetti(), [])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      const parsed = Number(stored)
      if (!Number.isNaN(parsed)) setCount(parsed)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(count))
  }, [count])

  const handleClick = () => {
    setCount((prev) => prev + 1)
    setBurst(true)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      void audioRef.current.play()
    }
  }

  useEffect(() => {
    if (!burst) return
    const timeout = window.setTimeout(() => setBurst(false), 1100)
    return () => window.clearTimeout(timeout)
  }, [burst])

  return (
    <div className="stage">
      <div className="panel">
        <div className="header">
          <span className="badge">Interruptions</span>
          <p className="count-label">{`Interruptions: ${count}`}</p>
        </div>
        <button className="smash-button" onClick={handleClick}>
          Oh shit... here we go again
        </button>
      </div>

      <audio ref={audioRef} src="/quack.mp3" preload="auto" />

      {burst && (
        <div className="confetti-container" aria-hidden="true">
          {confettiPieces.map((piece, index) => (
            <span
              key={index}
              className="confetti-piece"
              style={{
                left: `${piece.left}%`,
                width: `${piece.width}rem`,
                height: `${piece.height}rem`,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
                background: piece.color,
                borderRadius: `${piece.corner}rem`,
                transform: `rotate(${piece.rotation}deg) skew(${piece.skew}deg) scale(${piece.scale})`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
