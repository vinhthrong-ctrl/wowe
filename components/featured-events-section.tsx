"use client"

import { EventCard, type EventData } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const featuredEvents: EventData[] = [
  {
    id: "event-1",
    title: "Morning Yoga at Sunset Point",
    category: "Wellness",
    image: "/images/events/yoga.jpg",
    date: "Tomorrow",
    time: "6:00 AM",
    location: "Sunset Point, Bandra",
    price: 299,
    spotsLeft: 12,
    totalSpots: 30,
    xpReward: 50,
    isHot: true,
    attendees: [
      { name: "Priya", avatar: "" },
      { name: "Raj", avatar: "" },
      { name: "Anita", avatar: "" },
    ],
  },
  {
    id: "event-2",
    title: "Standup Comedy Night with Biswa",
    category: "Comedy",
    image: "/images/events/comedy-show.jpg",
    date: "Sat, Mar 28",
    time: "8:00 PM",
    location: "Canvas Laugh Club, Lower Parel",
    price: 799,
    spotsLeft: 45,
    totalSpots: 200,
    xpReward: 50,
    attendees: [
      { name: "Vikram", avatar: "" },
      { name: "Sneha", avatar: "" },
    ],
  },
  {
    id: "event-3",
    title: "Midnight Run Club - 10K",
    category: "Run Club",
    image: "/images/events/run-club.jpg",
    date: "Sun, Mar 29",
    time: "11:30 PM",
    location: "Marine Drive Start Point",
    price: 0,
    spotsLeft: 5,
    totalSpots: 50,
    xpReward: 75,
    isHot: true,
    attendees: [
      { name: "Amit", avatar: "" },
      { name: "Sara", avatar: "" },
      { name: "Dev", avatar: "" },
    ],
  },
  {
    id: "event-4",
    title: "Pottery Workshop - Beginners",
    category: "Workshop",
    image: "/images/events/workshop.jpg",
    date: "Mon, Mar 30",
    time: "3:00 PM",
    location: "Clay Studio, Khar",
    price: 1200,
    spotsLeft: 8,
    totalSpots: 15,
    xpReward: 50,
    attendees: [
      { name: "Maya", avatar: "" },
    ],
  },
  {
    id: "event-5",
    title: "Techno Night - Underground",
    category: "Night Club",
    image: "/images/events/nightclub.jpg",
    date: "Fri, Apr 3",
    time: "10:00 PM",
    location: "Trilogy Club, Juhu",
    price: 2000,
    spotsLeft: 0,
    totalSpots: 300,
    xpReward: 50,
    attendees: [
      { name: "Rohan", avatar: "" },
      { name: "Neha", avatar: "" },
      { name: "Karan", avatar: "" },
    ],
  },
  {
    id: "event-6",
    title: "Art Gallery Opening Night",
    category: "Art",
    image: "/images/events/art-gallery.jpg",
    date: "Sat, Apr 4",
    time: "7:00 PM",
    location: "Gallery District, Fort",
    price: 500,
    spotsLeft: 15,
    totalSpots: 50,
    xpReward: 60,
    isHot: true,
    attendees: [
      { name: "Arjun", avatar: "" },
      { name: "Meera", avatar: "" },
    ],
  },
]

export function FeaturedEventsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold">
                Featured <span className="neon-text">Events</span>
              </h2>
            </div>
            <p className="text-muted-foreground">Curated experiences just for you</p>
          </div>
          <Link href="/discover">
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Link href="/discover">
            <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
              Explore All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
