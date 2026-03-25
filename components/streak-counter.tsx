"use client"

import { Flame, Zap, Trophy, Star } from "lucide-react"

interface StreakCounterProps {
  streak: number
  type?: 'weekly' | 'monthly' | 'daily'
  size?: 'sm' | 'md' | 'lg'
}

export function StreakCounter({ streak, type = 'weekly', size = 'md' }: StreakCounterProps) {
  const sizeClasses = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-3xl',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  const getStreakColor = () => {
    if (streak >= 10) return 'from-yellow-500 via-orange-500 to-red-500'
    if (streak >= 5) return 'from-orange-500 to-red-500'
    return 'from-primary to-accent'
  }

  const getStreakGlow = () => {
    if (streak >= 10) return 'shadow-[0_0_30px_oklch(0.8_0.2_50/0.5)]'
    if (streak >= 5) return 'shadow-[0_0_20px_oklch(0.72_0.19_25/0.4)]'
    return ''
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          bg-gradient-to-br ${getStreakColor()}
          ${getStreakGlow()}
          flex items-center justify-center
          relative
          animate-scale-pulse
        `}
      >
        <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Flame className={`${iconSizes[size]} text-orange-500 ${streak >= 5 ? 'animate-pulse' : ''}`} />
            <span className="font-bold text-foreground">{streak}</span>
          </div>
        </div>
        
        {/* Animated ring */}
        {streak >= 5 && (
          <div className="absolute inset-0 rounded-full border-2 border-orange-500/50 animate-ping" />
        )}
      </div>
      
      <p className="text-sm text-muted-foreground capitalize">
        {type} Streak
      </p>
    </div>
  )
}

// Daily Challenges Component
export function DailyChallenges() {
  const challenges = [
    { 
      id: 1, 
      title: "Attend an event", 
      xp: 50, 
      completed: true,
      icon: Star,
      color: "text-yellow-500"
    },
    { 
      id: 2, 
      title: "Share an event", 
      xp: 25, 
      completed: false,
      icon: Zap,
      color: "text-blue-500"
    },
    { 
      id: 3, 
      title: "Leave a review", 
      xp: 30, 
      completed: false,
      icon: Trophy,
      color: "text-purple-500"
    },
  ]

  return (
    <div className="space-y-3">
      <h3 className="font-semibold flex items-center gap-2">
        <Zap className="w-5 h-5 text-primary" />
        Daily Challenges
      </h3>
      
      <div className="space-y-2">
        {challenges.map((challenge) => {
          const Icon = challenge.icon
          return (
            <div 
              key={challenge.id}
              className={`
                flex items-center justify-between p-3 rounded-xl
                ${challenge.completed 
                  ? 'bg-primary/10 border border-primary/30' 
                  : 'bg-muted/30 border border-border'
                }
                transition-all hover:scale-[1.02]
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${challenge.completed ? 'bg-primary/20' : 'bg-muted/50'}
                `}>
                  <Icon className={`w-5 h-5 ${challenge.completed ? 'text-primary' : challenge.color}`} />
                </div>
                <div>
                  <p className={`font-medium ${challenge.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {challenge.title}
                  </p>
                  <p className="text-xs text-muted-foreground">+{challenge.xp} XP</p>
                </div>
              </div>
              
              {challenge.completed ? (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <button className="px-3 py-1 text-sm font-medium rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                  Start
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Reward Progress Component
export function RewardProgress({ 
  current, 
  target, 
  reward 
}: { 
  current: number
  target: number
  reward: string 
}) {
  const progress = Math.min((current / target) * 100, 100)
  
  return (
    <div className="p-4 rounded-2xl glass border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">Next Reward</span>
        </div>
        <span className="text-sm text-muted-foreground">{current}/{target}</span>
      </div>
      
      <div className="h-3 rounded-full bg-muted overflow-hidden mb-2">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-sm text-muted-foreground">
        {target - current} more to unlock: <span className="text-foreground font-medium">{reward}</span>
      </p>
    </div>
  )
}
