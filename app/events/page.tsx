"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Heart, 
  Share2, 
  Zap,
  Star,
  CheckCircle,
  Info,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Ticket
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock event data
const eventData = {
  id: "event-1",
  title: "Morning Yoga at Sunset Point",
  category: "Wellness",
  images: [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&h=800&fit=crop",
  ],
  date: "Saturday, March 28, 2026",
  time: "6:00 AM - 7:30 AM",
  duration: "1.5 hours",
  location: "Sunset Point, Bandra West, Mumbai",
  mapUrl: "#",
  price: 299,
  platformFee: 30,
  gst: 5,
  totalPrice: 334,
  spotsLeft: 12,
  totalSpots: 30,
  xpReward: 50,
  isHot: true,
  description: `Join us for an energizing morning yoga session at one of Mumbai's most beautiful spots. Watch the sunrise while flowing through rejuvenating poses guided by certified yoga instructor Maya Singh.

This session is perfect for all levels - whether you're a complete beginner or an experienced yogi, you'll find this class both challenging and accessible.

What to expect:
• 90 minutes of guided yoga practice
• Breathwork and meditation
• Amazing sunrise views
• Complimentary herbal tea after the session
• Photo opportunities`,
  knowBeforeYouGo: [
    "Bring your own yoga mat",
    "Wear comfortable, breathable clothing",
    "Arrive 15 minutes early for setup",
    "Water bottles allowed",
    "Session happens rain or shine (covered area available)",
  ],
  host: {
    id: "host-1",
    name: "Maya Singh",
    avatar: "",
    verified: true,
    rating: 4.9,
    totalEvents: 156,
    totalAttendees: 3420,
    repeatRate: 68,
    bio: "Certified yoga instructor with 8+ years of experience. Specializing in Vinyasa and Hatha yoga.",
  },
  attendees: [
    { id: "1", name: "Priya S.", avatar: "" },
    { id: "2", name: "Arjun P.", avatar: "" },
    { id: "3", name: "Sneha R.", avatar: "" },
    { id: "4", name: "Vikram K.", avatar: "" },
    { id: "5", name: "Ananya I.", avatar: "" },
  ],
  reviews: [
    {
      id: "r1",
      user: "Priya S.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Amazing experience! Maya is such a wonderful instructor. The sunrise was beautiful and the session was perfectly paced.",
    },
    {
      id: "r2",
      user: "Rahul K.",
      rating: 5,
      date: "1 month ago",
      comment: "Best way to start a Saturday. I've been coming for 3 months now and it never gets old.",
    },
  ],
  similarEvents: [
    { id: "e2", title: "Beach Meditation", category: "Wellness", price: 199, date: "Sunday" },
    { id: "e3", title: "Evening Yoga Flow", category: "Wellness", price: 349, date: "Monday" },
  ],
}

export default function EventDetailsPage() {
  const params = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [ticketCount, setTicketCount] = useState(1)
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)

  const event = eventData // In production, fetch based on params.id

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length)
  }

  const totalAmount = event.totalPrice * ticketCount

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        {/* Image Gallery */}
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-muted overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url(${event.images[currentImageIndex]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {event.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                )}
              />
            ))}
          </div>

          {/* Badges */}
          <div className="absolute top-20 left-4 flex gap-2">
            <Badge className="bg-primary/90">{event.category}</Badge>
            {event.isHot && (
              <Badge className="bg-red-500/90">Hot</Badge>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-20 right-4 flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "p-2 rounded-full glass transition-all",
                isLiked && "bg-red-500/20"
              )}
            >
              <Heart className={cn("w-5 h-5", isLiked && "fill-red-500 text-red-500")} />
            </button>
            <button className="p-2 rounded-full glass hover:bg-white/20">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Quick Info */}
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">+{event.xpReward} XP on attendance</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">{event.title}</h1>
                
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <a href={event.mapUrl} className="hover:text-primary transition-colors">
                      {event.location}
                    </a>
                  </div>
                </div>
              </div>

              {/* Who's Going */}
              <Card className="glass">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {event.attendees.slice(0, 5).map((attendee, i) => (
                          <Avatar key={attendee.id} className="w-10 h-10 border-2 border-background">
                            <AvatarFallback className="text-xs">
                              {attendee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div>
                        <p className="font-medium">{event.totalSpots - event.spotsLeft} going</p>
                        <p className="text-sm text-muted-foreground">
                          {event.spotsLeft} spots left
                        </p>
                      </div>
                    </div>
                    <Badge variant={event.spotsLeft <= 5 ? "destructive" : "secondary"}>
                      {event.spotsLeft <= 5 ? "Almost Full!" : "Spots Available"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="about">
                <TabsList className="glass w-full justify-start">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="know">Know Before You Go</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="whitespace-pre-line text-foreground/90">{event.description}</p>
                  </div>
                </TabsContent>

                <TabsContent value="know" className="mt-6">
                  <ul className="space-y-3">
                    {event.knowBeforeYouGo.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-4">
                    {event.reviews.map((review) => (
                      <Card key={review.id} className="glass">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs">
                                  {review.user.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{review.user}</p>
                                <p className="text-xs text-muted-foreground">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              <span className="text-sm font-medium">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-foreground/90">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Host Info */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">About the Host</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-xl">
                        {event.host.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{event.host.name}</h3>
                        {event.host.verified && (
                          <Badge variant="secondary" className="text-[10px]">Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{event.host.bio}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-medium">{event.host.rating}</span>
                          <span className="text-muted-foreground">rating</span>
                        </div>
                        <div>
                          <span className="font-medium">{event.host.totalEvents}</span>
                          <span className="text-muted-foreground ml-1">events</span>
                        </div>
                        <div>
                          <span className="font-medium">{event.host.repeatRate}%</span>
                          <span className="text-muted-foreground ml-1">repeat guests</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="glass-strong">
                  <CardContent className="p-6">
                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold">
                        {event.price === 0 ? "Free" : `₹${event.price}`}
                      </span>
                      <span className="text-muted-foreground">per person</span>
                    </div>

                    {/* Ticket Count */}
                    <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-muted/30">
                      <span className="text-sm">Tickets</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                          disabled={ticketCount <= 1}
                        >
                          -
                        </button>
                        <span className="font-medium w-6 text-center">{ticketCount}</span>
                        <button
                          onClick={() => setTicketCount(Math.min(event.spotsLeft, ticketCount + 1))}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                          disabled={ticketCount >= event.spotsLeft}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Event Price x {ticketCount}</span>
                        <span>₹{event.price * ticketCount}</span>
                      </div>
                      <button 
                        onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                        className="text-primary text-xs hover:underline"
                      >
                        {showPriceBreakdown ? "Hide" : "View"} breakdown
                      </button>
                      {showPriceBreakdown && (
                        <>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Platform fee (10%)</span>
                            <span>₹{event.platformFee * ticketCount}</span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>GST (18% on platform fee)</span>
                            <span>₹{event.gst * ticketCount}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between font-semibold pt-2 border-t border-border/50">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                      </div>
                    </div>

                    {/* Book Button */}
                    <Button 
                      className="w-full h-12 text-lg neon-glow mb-3"
                      disabled={event.spotsLeft === 0}
                    >
                      <Ticket className="w-5 h-5 mr-2" />
                      {event.spotsLeft === 0 ? "Sold Out" : "Book Now"}
                    </Button>

                    {/* XP Reward */}
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>Earn +{event.xpReward} XP on attendance</span>
                    </div>

                    {/* Spots Warning */}
                    {event.spotsLeft <= 5 && event.spotsLeft > 0 && (
                      <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-sm text-red-400 text-center">
                          Only {event.spotsLeft} spots left! Book now.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Group Booking CTA */}
                <Card className="glass mt-4">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Going with friends?</p>
                        <p className="text-xs text-muted-foreground">Create a group and plan together</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-3" size="sm">
                      Create Group
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
