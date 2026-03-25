"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Zap, ArrowRight, Users } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface HappeningEvent {
  id: string
  title: string
  category: string
  location: string
  image: string
  startsIn: number // minutes
  spotsLeft: number
  price: number
  xpReward: number
}

const happeningEvents: HappeningEvent[] = [
  {
    id: "1",
    title: "Sunset Run Club",
    category: "Run Club",
    location: "Marine Drive, Mumbai",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop",
    startsIn: 45,
    spotsLeft: 3,
    price: 0,
    xpReward: 50,
  },
  {
    id: "2",
    title: "Comedy Night Live",
    category: "Stand-up",
    location: "Canvas Laugh Club",
    image: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=400&h=300&fit=crop",
    startsIn: 90,
    spotsLeft: 8,
    price: 499,
    xpReward: 50,
  },
  {
    id: "3",
    title: "DJ Night - Techno",
    category: "Night Club",
    location: "Trilogy, Mumbai",
    image: "https://images.unsplash.com/photo-1571266028243-d220c6a9a6d7?w=400&h=300&fit=crop",
    startsIn: 120,
    spotsLeft: 15,
    price: 1500,
    xpReward: 50,
  },
]

function CountdownTimer({ minutes }: { minutes: number }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = Math.floor(timeLeft / 3600)
  const mins = Math.floor((timeLeft % 3600) / 60)
  const secs = timeLeft % 60

  return (
    <div className="flex items-center gap-1 font-mono text-sm">
      {hours > 0 && (
        <>
          <span className="bg-primary/20 text-primary px-2 py-1 rounded">{String(hours).padStart(2, '0')}</span>
          <span className="text-muted-foreground">:</span>
        </>
      )}
      <span className="bg-primary/20 text-primary px-2 py-1 rounded">{String(mins).padStart(2, '0')}</span>
      <span className="text-muted-foreground">:</span>
      <span className="bg-primary/20 text-primary px-2 py-1 rounded">{String(secs).padStart(2, '0')}</span>
    </div>
  )
}

export function HappeningNowSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Happening <span className="neon-text">Now</span>
              </h2>
            </div>
            <p className="text-muted-foreground">Events starting in the next 2 hours</p>
          </div>
          <Link href="/discover?filter=happening-now">
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {happeningEvents.map((event) => (
            <Card 
              key={event.id} 
              className="glass overflow-hidden hover:border-primary/50 transition-all group"
            >
              <div className="relative h-40 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                {/* Urgency Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500/90 animate-pulse">
                    <Clock className="w-3 h-3 mr-1" />
                    Starts Soon
                  </Badge>
                </div>

                {/* Spots Badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className={cn(
                    event.spotsLeft <= 5 ? "bg-yellow-500/90 text-yellow-950" : "bg-muted/90"
                  )}>
                    <Users className="w-3 h-3 mr-1" />
                    {event.spotsLeft} spots
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {event.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-primary text-xs">
                    <Zap className="w-3 h-3" />
                    +{event.xpReward} XP
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Starts in</p>
                    <CountdownTimer minutes={event.startsIn} />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {event.price === 0 ? "Free" : `₹${event.price}`}
                    </p>
                    <Link href={`/events/${event.id}`}>
                      <Button size="sm" className="mt-1 neon-glow">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
