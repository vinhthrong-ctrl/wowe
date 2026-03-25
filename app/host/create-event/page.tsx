"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Confetti, XPGainToast } from "@/components/confetti"
import { 
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  DollarSign,
  Image as ImageIcon,
  Users,
  Clock,
  Sparkles,
  CheckCircle,
  Zap,
  Tag,
  Repeat
} from "lucide-react"
import Link from "next/link"

const eventCategories = [
  { id: "fitness", label: "Fitness & Sports", icon: "🏃", color: "from-orange-500 to-red-500" },
  { id: "wellness", label: "Wellness & Mindfulness", icon: "🧘", color: "from-teal-500 to-green-500" },
  { id: "social", label: "Social & Networking", icon: "🎉", color: "from-pink-500 to-purple-500" },
  { id: "learning", label: "Learning & Workshops", icon: "📚", color: "from-blue-500 to-indigo-500" },
  { id: "food", label: "Food & Drinks", icon: "🍷", color: "from-amber-500 to-orange-500" },
  { id: "entertainment", label: "Entertainment", icon: "🎭", color: "from-purple-500 to-pink-500" },
  { id: "outdoors", label: "Outdoors & Adventure", icon: "🏔️", color: "from-green-500 to-teal-500" },
  { id: "nightlife", label: "Nightlife & Parties", icon: "🌙", color: "from-indigo-500 to-purple-500" },
]

const steps = [
  { id: 1, title: "Category", description: "What type of event?" },
  { id: 2, title: "Details", description: "Name, date & location" },
  { id: 3, title: "Pricing", description: "Set your ticket price" },
  { id: 4, title: "Media", description: "Add photos & description" },
  { id: 5, title: "Review", description: "Preview & publish" },
]

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showXPGain, setShowXPGain] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    address: "",
    price: "",
    capacity: "",
    description: "",
    isRecurring: false,
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePublish = () => {
    setShowConfetti(true)
    setShowXPGain(true)
    setTimeout(() => setShowXPGain(false), 3000)
  }

  return (
    <main className="min-h-screen mesh-gradient">
      <Navigation />
      <Confetti trigger={showConfetti} />
      <XPGainToast xp={100} message="Event Created!" show={showXPGain} />

      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/host/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold">Create New Event</h1>
            <p className="text-muted-foreground">Share your experience with the world</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center min-w-[80px]">
                  <div 
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold
                      transition-all duration-300
                      ${currentStep >= step.id 
                        ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                      }
                      ${currentStep === step.id ? 'ring-4 ring-primary/30 scale-110' : ''}
                    `}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={`text-xs mt-2 ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`
                      h-0.5 w-full min-w-[40px] mx-2
                      ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}
                      transition-colors duration-300
                    `}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card className="glass-strong">
            <CardContent className="p-6 sm:p-8">
              {/* Step 1: Category Selection */}
              {currentStep === 1 && (
                <div className="animate-slide-up">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">What type of event are you hosting?</h2>
                    <p className="text-muted-foreground">Choose a category that best describes your event</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {eventCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`
                          p-4 rounded-2xl text-center transition-all duration-300
                          ${selectedCategory === category.id 
                            ? `bg-gradient-to-br ${category.color} text-white scale-105 shadow-lg` 
                            : 'bg-muted/30 hover:bg-muted/50'
                          }
                          border-2 
                          ${selectedCategory === category.id ? 'border-white/30' : 'border-transparent'}
                        `}
                      >
                        <div className="text-3xl mb-2">{category.icon}</div>
                        <p className="text-sm font-medium">{category.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Event Details */}
              {currentStep === 2 && (
                <div className="animate-slide-up space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Event Details</h2>
                    <p className="text-muted-foreground">Tell us about your event</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Title</label>
                      <input
                        type="text"
                        placeholder="e.g., Morning Yoga at Sunset Point"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          Time
                        </label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Venue Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Sunset Point Beach"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Full Address</label>
                      <input
                        type="text"
                        placeholder="Enter the full address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30">
                      <Repeat className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">Recurring Event</p>
                        <p className="text-sm text-muted-foreground">This event repeats weekly</p>
                      </div>
                      <button
                        onClick={() => setFormData({ ...formData, isRecurring: !formData.isRecurring })}
                        className={`
                          w-12 h-6 rounded-full transition-all
                          ${formData.isRecurring ? 'bg-primary' : 'bg-muted'}
                        `}
                      >
                        <div 
                          className={`
                            w-5 h-5 rounded-full bg-white shadow transition-transform
                            ${formData.isRecurring ? 'translate-x-6' : 'translate-x-0.5'}
                          `}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Pricing */}
              {currentStep === 3 && (
                <div className="animate-slide-up space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Set Your Price</h2>
                    <p className="text-muted-foreground">How much will you charge?</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        Ticket Price (INR)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                        <input
                          type="number"
                          placeholder="299"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full pl-8 pr-4 py-3 rounded-xl bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Set to 0 for free events</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Capacity
                      </label>
                      <input
                        type="number"
                        placeholder="30"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Earnings Preview */}
                  {formData.price && (
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Earnings Preview
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 rounded-xl bg-background/50">
                          <p className="text-sm text-muted-foreground">Per Ticket</p>
                          <p className="text-2xl font-bold text-primary">
                            ₹{Math.floor(Number(formData.price) * 0.9)}
                          </p>
                          <p className="text-xs text-muted-foreground">You keep 90%</p>
                        </div>
                        <div className="p-4 rounded-xl bg-background/50">
                          <p className="text-sm text-muted-foreground">If Full</p>
                          <p className="text-2xl font-bold text-primary">
                            ₹{(Math.floor(Number(formData.price) * 0.9) * Number(formData.capacity || 30)).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">{formData.capacity || 30} attendees</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Media */}
              {currentStep === 4 && (
                <div className="animate-slide-up space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Make it Visual</h2>
                    <p className="text-muted-foreground">Add photos and a description</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-primary" />
                      Event Photos
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <button className="aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary bg-muted/20 flex flex-col items-center justify-center transition-colors">
                        <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Cover Photo</span>
                      </button>
                      <button className="aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary bg-muted/20 flex items-center justify-center transition-colors">
                        <span className="text-3xl">+</span>
                      </button>
                      <button className="aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary bg-muted/20 flex items-center justify-center transition-colors">
                        <span className="text-3xl">+</span>
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Events with photos get 3x more bookings</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      rows={5}
                      placeholder="Describe your event, what attendees can expect, what to bring..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors">
                    <Sparkles className="w-4 h-4" />
                    Generate with AI
                  </button>
                </div>
              )}

              {/* Step 5: Review */}
              {currentStep === 5 && (
                <div className="animate-slide-up space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Review & Publish</h2>
                    <p className="text-muted-foreground">Everything looks good?</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Preview Card */}
                    <div className="rounded-2xl overflow-hidden bg-muted/20 border border-border">
                      <div className="aspect-video bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <div className="p-4">
                        <Badge className="mb-2">
                          {eventCategories.find(c => c.id === selectedCategory)?.label || 'Category'}
                        </Badge>
                        <h3 className="font-semibold mb-2">{formData.title || 'Event Title'}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formData.date || 'Date'} at {formData.time || 'Time'}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {formData.location || 'Location'}
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                          <span className="text-xl font-bold text-primary">
                            {formData.price ? `₹${formData.price}` : 'Free'}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formData.capacity || 30} spots
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-muted/30">
                        <h4 className="font-semibold mb-3">Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Category</span>
                            <span>{eventCategories.find(c => c.id === selectedCategory)?.label || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Price</span>
                            <span>{formData.price ? `₹${formData.price}` : 'Free'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Capacity</span>
                            <span>{formData.capacity || 30} attendees</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Recurring</span>
                            <span>{formData.isRecurring ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-5 h-5 text-primary" />
                          <span className="font-semibold">You&apos;ll earn +100 XP</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Publishing your first event this week!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    onClick={handleNext}
                    disabled={currentStep === 1 && !selectedCategory}
                    className="neon-glow"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handlePublish}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Publish Event
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
