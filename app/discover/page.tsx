"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EventCard, type EventData } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Calendar,
  X,
  Grid,
  List,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock Events Data
const allEvents: EventData[] = [
  {
    id: "event-1",
    title: "Morning Yoga at Sunset Point",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    date: "Tomorrow",
    time: "6:00 AM",
    location: "Sunset Point, Bandra",
    price: 299,
    spotsLeft: 12,
    totalSpots: 30,
    xpReward: 50,
    isHot: true,
  },
  {
    id: "event-2",
    title: "Standup Comedy Night with Biswa",
    category: "Comedy",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&h=400&fit=crop",
    date: "Sat, Mar 28",
    time: "8:00 PM",
    location: "Canvas Laugh Club, Lower Parel",
    price: 799,
    spotsLeft: 45,
    totalSpots: 200,
    xpReward: 50,
  },
  {
    id: "event-3",
    title: "Midnight Run Club - 10K",
    category: "Run Club",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
    date: "Sun, Mar 29",
    time: "11:30 PM",
    location: "Marine Drive Start Point",
    price: 0,
    spotsLeft: 5,
    totalSpots: 50,
    xpReward: 75,
    isHot: true,
  },
  {
    id: "event-4",
    title: "Pottery Workshop - Beginners",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop",
    date: "Mon, Mar 30",
    time: "3:00 PM",
    location: "Clay Studio, Khar",
    price: 1200,
    spotsLeft: 8,
    totalSpots: 15,
    xpReward: 50,
  },
  {
    id: "event-5",
    title: "Techno Night - Underground",
    category: "Night Club",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
    date: "Fri, Apr 3",
    time: "10:00 PM",
    location: "Trilogy Club, Juhu",
    price: 2000,
    spotsLeft: 0,
    totalSpots: 300,
    xpReward: 50,
  },
  {
    id: "event-6",
    title: "Sunrise Trek - Kalsubai Peak",
    category: "Trek",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
    date: "Sat, Apr 4",
    time: "4:00 AM",
    location: "Base Camp, Bari Village",
    price: 1500,
    spotsLeft: 15,
    totalSpots: 25,
    xpReward: 100,
    isHot: true,
  },
  {
    id: "event-7",
    title: "Coffee Cupping Session",
    category: "Cafe",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    date: "Sun, Apr 5",
    time: "11:00 AM",
    location: "Blue Tokai, Bandra",
    price: 450,
    spotsLeft: 6,
    totalSpots: 12,
    xpReward: 50,
  },
  {
    id: "event-8",
    title: "Salsa Night for Beginners",
    category: "Dance",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&h=400&fit=crop",
    date: "Tue, Apr 7",
    time: "7:00 PM",
    location: "The Dance Studio, Andheri",
    price: 600,
    spotsLeft: 20,
    totalSpots: 40,
    xpReward: 50,
  },
  {
    id: "event-9",
    title: "Open Mic Poetry Night",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop",
    date: "Wed, Apr 8",
    time: "8:00 PM",
    location: "Prithvi Theatre, Juhu",
    price: 200,
    spotsLeft: 35,
    totalSpots: 50,
    xpReward: 50,
  },
  {
    id: "event-10",
    title: "House Party - Retro Theme",
    category: "House Party",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop",
    date: "Sat, Apr 11",
    time: "9:00 PM",
    location: "Private Villa, Alibaug",
    price: 3000,
    spotsLeft: 10,
    totalSpots: 50,
    xpReward: 75,
    isHot: true,
  },
  {
    id: "event-11",
    title: "Photography Walk - Street Style",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=600&h=400&fit=crop",
    date: "Sun, Apr 12",
    time: "5:30 PM",
    location: "Crawford Market, Mumbai",
    price: 0,
    spotsLeft: 15,
    totalSpots: 20,
    xpReward: 50,
  },
  {
    id: "event-12",
    title: "Board Games Night",
    category: "Social",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&h=400&fit=crop",
    date: "Fri, Apr 17",
    time: "6:00 PM",
    location: "Chai Point, Powai",
    price: 150,
    spotsLeft: 18,
    totalSpots: 24,
    xpReward: 50,
  },
]

const categories = [
  "All",
  "Run Club",
  "Night Club",
  "Comedy",
  "Workshop",
  "Trek",
  "Cafe",
  "House Party",
  "Wellness",
  "Dance",
  "Arts",
  "Social",
]

const priceFilters = [
  { label: "All Prices", value: "all" },
  { label: "Free", value: "free" },
  { label: "Under ₹500", value: "under-500" },
  { label: "₹500 - ₹1500", value: "500-1500" },
  { label: "₹1500+", value: "above-1500" },
]

const dateFilters = [
  { label: "Any Date", value: "all" },
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "This Week", value: "this-week" },
  { label: "This Weekend", value: "weekend" },
]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (
          !event.title.toLowerCase().includes(query) &&
          !event.category.toLowerCase().includes(query) &&
          !event.location.toLowerCase().includes(query)
        ) {
          return false
        }
      }

      // Category filter
      if (selectedCategory !== "All" && event.category !== selectedCategory) {
        return false
      }

      // Price filter
      if (selectedPrice !== "all") {
        if (selectedPrice === "free" && event.price !== 0) return false
        if (selectedPrice === "under-500" && event.price >= 500) return false
        if (selectedPrice === "500-1500" && (event.price < 500 || event.price > 1500)) return false
        if (selectedPrice === "above-1500" && event.price <= 1500) return false
      }

      return true
    })
  }, [searchQuery, selectedCategory, selectedPrice])

  const activeFiltersCount = [
    selectedCategory !== "All",
    selectedPrice !== "all",
    selectedDate !== "all",
  ].filter(Boolean).length

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedPrice("all")
    setSelectedDate("all")
    setSearchQuery("")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Discover <span className="neon-text">Events</span>
            </h1>
            <p className="text-muted-foreground">
              Find experiences that match your vibe
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            {/* Search Bar */}
            <div className="flex gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search events, categories, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-muted/30 border-border/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "h-12 px-4 border-border/50",
                  showFilters && "bg-primary/10 border-primary"
                )}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-primary">{activeFiltersCount}</Badge>
                )}
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <Card className="glass p-4 mb-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Price Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <div className="flex flex-wrap gap-2">
                      {priceFilters.map((filter) => (
                        <button
                          key={filter.value}
                          onClick={() => setSelectedPrice(filter.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm transition-all",
                            selectedPrice === filter.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/50 hover:bg-muted"
                          )}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date</label>
                    <div className="flex flex-wrap gap-2">
                      {dateFilters.map((filter) => (
                        <button
                          key={filter.value}
                          onClick={() => setSelectedDate(filter.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm transition-all",
                            selectedDate === filter.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/50 hover:bg-muted"
                          )}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      onClick={clearFilters}
                      className="text-muted-foreground"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all shrink-0",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground neon-glow"
                      : "bg-muted/50 hover:bg-muted border border-border/50"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                {filteredEvents.length} events found
              </span>
              {(selectedCategory !== "All" || searchQuery) && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory !== "All" ? selectedCategory : searchQuery}
                  <button onClick={() => selectedCategory !== "All" ? setSelectedCategory("All") : setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={cn(viewMode === "grid" && "bg-muted")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={cn(viewMode === "list" && "bg-muted")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className={cn(
              "grid gap-6",
              viewMode === "grid" 
                ? "sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1 max-w-3xl"
            )}>
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event}
                  variant={viewMode === "list" ? "featured" : "default"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}

          {/* Load More */}
          {filteredEvents.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                Load More Events
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
