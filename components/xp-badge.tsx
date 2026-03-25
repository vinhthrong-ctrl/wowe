"use client"

import { useEffect, useState } from "react"
import { Zap, Star, Award, Trophy, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

// XP Levels configuration
export const XP_LEVELS = [
  { name: "Newbie", minXP: 0, maxXP: 500, icon: Zap, color: "from-gray-400 to-gray-500" },
  { name: "Explorer", minXP: 500, maxXP: 1500, icon: Star, color: "from-blue-400 to-blue-600" },
  { name: "Adventurer", minXP: 1500, maxXP: 3500, icon: Award, color: "from-purple-400 to-purple-600" },
  { name: "Champion", minXP: 3500, maxXP: 7000, icon: Trophy, color: "from-amber-400 to-amber-600" },
  { name: "Legend", minXP: 7000, maxXP: Infinity, icon: Crown, color: "from-pink-400 to-rose-600" },
]

export function getLevel(xp: number) {
  return XP_LEVELS.find(level => xp >= level.minXP && xp < level.maxXP) || XP_LEVELS[0]
}

export function getLevelProgress(xp: number) {
  const level = getLevel(xp)
  const nextLevelIndex = XP_LEVELS.indexOf(level) + 1
  const nextLevel = XP_LEVELS[nextLevelIndex] || level
  
  if (level.maxXP === Infinity) return 100
  
  const progress = ((xp - level.minXP) / (level.maxXP - level.minXP)) * 100
  return Math.min(Math.max(progress, 0), 100)
}

interface XPBadgeProps {
  xp: number
  showLevel?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function XPBadge({ xp, showLevel = true, size = "md", className }: XPBadgeProps) {
  const level = getLevel(xp)
  const Icon = level.icon

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }

  return (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-full bg-gradient-to-r font-medium text-white",
      level.color,
      sizeClasses[size],
      className
    )}>
      <Icon className={iconSizes[size]} />
      {showLevel && <span>{level.name}</span>}
      <span className="opacity-80">|</span>
      <span>{xp.toLocaleString()} XP</span>
    </div>
  )
}

// XP Gain Animation Component
interface XPGainProps {
  amount: number
  onComplete?: () => void
}

export function XPGain({ amount, onComplete }: XPGainProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="animate-bounce text-4xl font-bold text-primary neon-text">
        +{amount} XP
      </div>
    </div>
  )
}

// Level Progress Bar
interface LevelProgressProps {
  xp: number
  showLabels?: boolean
  className?: string
}

export function LevelProgress({ xp, showLabels = true, className }: LevelProgressProps) {
  const level = getLevel(xp)
  const progress = getLevelProgress(xp)
  const nextLevelIndex = XP_LEVELS.indexOf(level) + 1
  const nextLevel = XP_LEVELS[nextLevelIndex]

  return (
    <div className={cn("w-full", className)}>
      {showLabels && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            Level: <span className="text-foreground font-medium">{level.name}</span>
          </span>
          {nextLevel && (
            <span className="text-muted-foreground">
              Next: <span className="text-foreground font-medium">{nextLevel.name}</span>
            </span>
          )}
        </div>
      )}
      <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-1000",
            level.color
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabels && nextLevel && (
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{xp.toLocaleString()} XP</span>
          <span>{nextLevel.minXP.toLocaleString()} XP needed</span>
        </div>
      )}
    </div>
  )
}

// Streak Display
interface StreakDisplayProps {
  currentStreak: number
  longestStreak: number
  className?: string
}

export function StreakDisplay({ currentStreak, longestStreak, className }: StreakDisplayProps) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      <div className="text-center">
        <div className="text-3xl font-bold text-primary">{currentStreak}</div>
        <div className="text-sm text-muted-foreground">Current Streak</div>
      </div>
      <div className="h-12 w-px bg-border" />
      <div className="text-center">
        <div className="text-3xl font-bold text-accent">{longestStreak}</div>
        <div className="text-sm text-muted-foreground">Longest Streak</div>
      </div>
    </div>
  )
}
