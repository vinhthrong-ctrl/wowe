"use client"

import { Card } from "@/components/ui/card"
import { 
  PartyPopper, 
  Coffee, 
  Dumbbell, 
  Mic2, 
  Palette, 
  Mountain, 
  Home, 
  Music 
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const categories = [
  { 
    name: "Run Clubs", 
    icon: Dumbbell, 
    color: "from-green-500 to-emerald-600",
    glow: "rgba(16, 185, 129, 0.3)",
    count: 24 
  },
  { 
    name: "Night Clubs", 
    icon: Music, 
    color: "from-purple-500 to-pink-600",
    glow: "rgba(168, 85, 247, 0.3)",
    count: 18 
  },
  { 
    name: "Cafe Events", 
    icon: Coffee, 
    color: "from-amber-500 to-orange-600",
    glow: "rgba(245, 158, 11, 0.3)",
    count: 32 
  },
  { 
    name: "Stand-up", 
    icon: Mic2, 
    color: "from-red-500 to-rose-600",
    glow: "rgba(239, 68, 68, 0.3)",
    count: 15 
  },
  { 
    name: "Workshops", 
    icon: Palette, 
    color: "from-blue-500 to-cyan-600",
    glow: "rgba(59, 130, 246, 0.3)",
    count: 28 
  },
  { 
    name: "Treks", 
    icon: Mountain, 
    color: "from-teal-500 to-green-600",
    glow: "rgba(20, 184, 166, 0.3)",
    count: 12 
  },
  { 
    name: "House Parties", 
    icon: Home, 
    color: "from-pink-500 to-rose-600",
    glow: "rgba(236, 72, 153, 0.3)",
    count: 8 
  },
  { 
    name: "More", 
    icon: PartyPopper, 
    color: "from-violet-500 to-purple-600",
    glow: "rgba(139, 92, 246, 0.3)",
    count: 50 
  },
]

export function CategorySection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Explore by <span className="neon-text">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From morning runs to late-night parties, find experiences that match your mood.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link 
                key={category.name} 
                href={`/discover?category=${category.name.toLowerCase().replace(' ', '-')}`}
              >
                <Card className={cn(
                  "glass group cursor-pointer overflow-hidden",
                  "hover:border-primary/50 transition-all duration-300",
                  "hover:scale-105 hover:shadow-lg"
                )}
                style={{
                  boxShadow: `0 0 0 transparent`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 30px ${category.glow}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 transparent`
                }}
                >
                  <div className="p-6 text-center">
                    <div className={cn(
                      "w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center",
                      "bg-gradient-to-br", category.color,
                      "group-hover:scale-110 transition-transform duration-300"
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} events</p>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
