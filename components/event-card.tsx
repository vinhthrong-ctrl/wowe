"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Heart, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export interface EventData {
  id: string
  title: string
  category: string
  image: string
  date: string
  time: string
  location: string
  price: number
  spotsLeft: number
  totalSpots: number
  xpReward: number
  isHot?: boolean
  attendees?: { name: string; avatar: string }[]
}

interface EventCardProps {
  event: EventData
  variant?: "default" | "compact" | "featured"
  className?: string
}

export function EventCard({ event, variant = "default", className }: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  
  const isSoldOut = event.spotsLeft === 0
  const isAlmostFull = event.spotsLeft <= 5 && event.spotsLeft > 0

  if (variant === "compact") {
    return (
      <Card className={cn("glass overflow-hidden hover:border-primary/50 transition-all group", className)}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundImage: `url(${event.image})` }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <Badge variant="secondary" className="mb-1 text-[10px]">
                {event.category}
              </Badge>
              <h3 className="font-semibold text-sm truncate">{event.title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3" />
                {event.date}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "featured") {
    return (
      <Card className={cn("glass overflow-hidden hover:border-primary/50 transition-all group relative", className)}>
        <div className="relative h-64 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundImage: `url(${event.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="flex gap-2">
              <Badge className="bg-primary/90">{event.category}</Badge>
              {event.isHot && (
                <Badge className="bg-destructive/90 animate-pulse">Hot</Badge>
              )}
            </div>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "p-2 rounded-full glass transition-all",
                isLiked && "bg-destructive/20"
              )}
            >
              <Heart className={cn("w-5 h-5", isLiked && "fill-destructive text-destructive")} />
            </button>
          </div>

          {/* XP Reward */}
          <div className="absolute top-4 right-4 hidden">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-sm">
              <Zap className="w-4 h-4" />
              +{event.xpReward} XP
            </div>
          </div>
        </div>

        <CardContent className="p-6 relative">
          <div className="flex items-center gap-1 text-primary text-sm mb-2">
            <Zap className="w-4 h-4" />
            +{event.xpReward} XP
          </div>

          <h3 className="text-xl font-bold mb-3 text-balance">{event.title}</h3>
          
          <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {event.date}
              <span className="mx-1">|</span>
              <Clock className="w-4 h-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {event.location}
            </div>
          </div>

          {/* Attendees Preview */}
          {event.attendees && event.attendees.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {event.attendees.slice(0, 3).map((attendee, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium"
                    title={attendee.name}
                  >
                    {attendee.name.charAt(0)}
                  </div>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                +{event.totalSpots - event.spotsLeft} going
              </span>
            </div>
          )}

          {/* Bottom section */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {event.price === 0 ? "Free" : `₹${event.price}`}
              </div>
              <div className={cn(
                "text-xs",
                isSoldOut ? "text-destructive" : isAlmostFull ? "text-yellow-500" : "text-muted-foreground"
              )}>
                {isSoldOut 
                  ? "Sold out" 
                  : isAlmostFull 
                    ? `Only ${event.spotsLeft} spots left!` 
                    : `${event.spotsLeft} spots available`}
              </div>
            </div>
            <Link href={`/events/${event.id}`}>
              <Button 
                className={cn(
                  "neon-glow",
                  isSoldOut && "opacity-50 cursor-not-allowed"
                )}
                disabled={isSoldOut}
              >
                {isSoldOut ? "Join Waitlist" : "Book Now"}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className={cn("glass overflow-hidden hover:border-primary/50 transition-all group", className)}>
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url(${event.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary/90 text-xs">{event.category}</Badge>
          {event.isHot && (
            <Badge className="bg-destructive/90 text-xs animate-pulse">Hot</Badge>
          )}
        </div>

        {/* Like button */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full glass transition-all hover:scale-110",
            isLiked && "bg-destructive/20"
          )}
        >
          <Heart className={cn("w-4 h-4", isLiked && "fill-destructive text-destructive")} />
        </button>

        {/* XP Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
          <Zap className="w-3 h-3" />
          +{event.xpReward} XP
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{event.title}</h3>
        
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{event.date}</span>
            <span className="mx-1">|</span>
            <Clock className="w-4 h-4 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 shrink-0" />
            <span className={cn(
              isAlmostFull && "text-yellow-500",
              isSoldOut && "text-destructive"
            )}>
              {isSoldOut 
                ? "Sold out" 
                : `${event.spotsLeft}/${event.totalSpots} spots`}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">
            {event.price === 0 ? "Free" : `₹${event.price}`}
          </div>
          <Link href={`/events/${event.id}`}>
            <Button size="sm" disabled={isSoldOut}>
              {isSoldOut ? "Sold Out" : "Book"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
