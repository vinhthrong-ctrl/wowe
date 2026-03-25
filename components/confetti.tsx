"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  left: number
  color: string
  delay: number
  size: number
  shape: 'square' | 'circle' | 'triangle'
}

const CONFETTI_COLORS = [
  'oklch(0.72 0.19 25)',    // Coral
  'oklch(0.68 0.18 230)',   // Blue
  'oklch(0.68 0.22 290)',   // Purple
  'oklch(0.72 0.18 160)',   // Teal
  'oklch(0.85 0.18 85)',    // Yellow
  'oklch(0.72 0.2 350)',    // Pink
  'oklch(0.82 0.2 130)',    // Lime
]

export function Confetti({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (trigger) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 0.5,
        size: Math.random() * 8 + 6,
        shape: (['square', 'circle', 'triangle'] as const)[Math.floor(Math.random() * 3)],
      }))
      setPieces(newPieces)

      const timeout = setTimeout(() => setPieces([]), 3500)
      return () => clearTimeout(timeout)
    }
  }, [trigger])

  if (pieces.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.shape !== 'triangle' ? piece.color : 'transparent',
            borderRadius: piece.shape === 'circle' ? '50%' : '2px',
            borderLeft: piece.shape === 'triangle' ? `${piece.size / 2}px solid transparent` : undefined,
            borderRight: piece.shape === 'triangle' ? `${piece.size / 2}px solid transparent` : undefined,
            borderBottom: piece.shape === 'triangle' ? `${piece.size}px solid ${piece.color}` : undefined,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// XP Gain Toast Component
export function XPGainToast({ 
  xp, 
  message, 
  show 
}: { 
  xp: number
  message: string
  show: boolean 
}) {
  if (!show) return null

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
      <div className="flex items-center gap-3 px-6 py-4 rounded-2xl glass-strong border-2 border-primary/50 shadow-lg">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-scale-pulse">
            <span className="text-xl font-bold text-primary-foreground">+{xp}</span>
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-[10px]">XP</span>
          </div>
        </div>
        <div>
          <p className="font-semibold text-foreground">{message}</p>
          <p className="text-sm text-muted-foreground">Keep it up!</p>
        </div>
      </div>
    </div>
  )
}

// Level Up Modal
export function LevelUpModal({ 
  level, 
  show, 
  onClose 
}: { 
  level: number
  show: boolean
  onClose: () => void 
}) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative glass-strong rounded-3xl p-8 max-w-sm mx-4 text-center animate-bounce-in gradient-border">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-pink flex items-center justify-center text-3xl animate-scale-pulse border-4 border-background">
            <span className="text-primary-foreground font-bold">{level}</span>
          </div>
        </div>
        
        <div className="pt-10">
          <h2 className="text-2xl font-bold gradient-text mb-2">Level Up!</h2>
          <p className="text-muted-foreground mb-6">
            You&apos;ve reached Level {level}. New perks unlocked!
          </p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
              <span className="text-lg">🎫</span>
              <span className="text-sm">Early access to events</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
              <span className="text-lg">💰</span>
              <span className="text-sm">5% discount on bookings</span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  )
}
