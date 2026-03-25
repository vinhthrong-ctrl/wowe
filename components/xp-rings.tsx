"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface RingData {
  label: string
  value: number
  max: number
  color: string
  glowColor: string
}

interface XPRingsProps {
  rings?: RingData[]
  size?: "sm" | "md" | "lg"
  showLabels?: boolean
  className?: string
}

const defaultRings: RingData[] = [
  { label: "Activity", value: 72, max: 100, color: "#f43f5e", glowColor: "rgba(244, 63, 94, 0.5)" },
  { label: "Social", value: 58, max: 100, color: "#a855f7", glowColor: "rgba(168, 85, 247, 0.5)" },
  { label: "Explorer", value: 45, max: 100, color: "#10b981", glowColor: "rgba(16, 185, 129, 0.5)" },
]

const sizeConfig = {
  sm: { size: 120, strokeWidth: 8, gap: 12 },
  md: { size: 180, strokeWidth: 12, gap: 16 },
  lg: { size: 240, strokeWidth: 16, gap: 20 },
}

export function XPRings({ 
  rings = defaultRings, 
  size = "md", 
  showLabels = true,
  className 
}: XPRingsProps) {
  const [animatedValues, setAnimatedValues] = useState(rings.map(() => 0))
  const config = sizeConfig[size]
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValues(rings.map(ring => ring.value))
    }, 100)
    return () => clearTimeout(timeout)
  }, [rings])

  const center = config.size / 2

  return (
    <div className={cn("relative", className)}>
      <svg 
        width={config.size} 
        height={config.size} 
        viewBox={`0 0 ${config.size} ${config.size}`}
        className="transform -rotate-90"
      >
        <defs>
          {rings.map((ring, index) => (
            <filter key={`glow-${index}`} id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          ))}
        </defs>
        
        {rings.map((ring, index) => {
          const radius = center - config.strokeWidth / 2 - (index * (config.strokeWidth + config.gap))
          const circumference = 2 * Math.PI * radius
          const progress = (animatedValues[index] / ring.max) * circumference
          const offset = circumference - progress

          return (
            <g key={ring.label}>
              {/* Background ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={config.strokeWidth}
                className="text-muted/30"
                strokeLinecap="round"
              />
              {/* Progress ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={ring.color}
                strokeWidth={config.strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="ring-progress"
                style={{
                  filter: `drop-shadow(0 0 6px ${ring.glowColor}) drop-shadow(0 0 12px ${ring.glowColor})`,
                  transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              />
            </g>
          )
        })}
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">
          {Math.round(rings.reduce((acc, ring) => acc + ring.value, 0) / rings.length)}%
        </span>
        <span className="text-xs text-muted-foreground">Overall</span>
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex justify-center gap-4 mt-4">
          {rings.map((ring) => (
            <div key={ring.label} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ 
                  backgroundColor: ring.color,
                  boxShadow: `0 0 8px ${ring.glowColor}`
                }} 
              />
              <span className="text-xs text-muted-foreground">{ring.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Compact ring for cards and smaller displays
export function CompactXPRing({ 
  value, 
  max = 100, 
  color = "#a855f7",
  glowColor = "rgba(168, 85, 247, 0.5)",
  size = 48,
  strokeWidth = 4,
  label
}: {
  value: number
  max?: number
  color?: string
  glowColor?: string
  size?: number
  strokeWidth?: number
  label?: string
}) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const progress = (animatedValue / max) * circumference
  const offset = circumference - progress

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(value)
    }, 100)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/30"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="ring-progress"
            style={{
              filter: `drop-shadow(0 0 4px ${glowColor})`,
              transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold">{Math.round((value / max) * 100)}%</span>
        </div>
      </div>
      {label && <span className="text-[10px] text-muted-foreground">{label}</span>}
    </div>
  )
}
