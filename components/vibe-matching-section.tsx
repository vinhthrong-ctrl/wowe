"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  PartyPopper, 
  Coffee, 
  Dumbbell, 
  Palette,
  Sparkles,
  ArrowRight,
  Check
} from "lucide-react"
import { cn } from "@/lib/utils"

const vibes = [
  { 
    id: "party", 
    name: "Party Mode", 
    icon: PartyPopper, 
    emoji: "🎉",
    description: "Late nights, loud music, unforgettable memories",
    color: "from-pink-500 to-purple-600"
  },
  { 
    id: "chill", 
    name: "Chill Vibes", 
    icon: Coffee, 
    emoji: "☕",
    description: "Relaxed hangouts, good conversations",
    color: "from-amber-500 to-orange-600"
  },
  { 
    id: "fitness", 
    name: "Fitness Freak", 
    icon: Dumbbell, 
    emoji: "💪",
    description: "Push your limits, feel the burn",
    color: "from-green-500 to-emerald-600"
  },
  { 
    id: "creative", 
    name: "Creative Soul", 
    icon: Palette, 
    emoji: "🎨",
    description: "Express yourself, learn something new",
    color: "from-blue-500 to-cyan-600"
  },
]

const budgetOptions = [
  { id: "free", label: "Free Only", range: "₹0" },
  { id: "budget", label: "Budget", range: "Under ₹500" },
  { id: "mid", label: "Mid-Range", range: "₹500-1500" },
  { id: "premium", label: "Premium", range: "₹1500+" },
]

const crowdOptions = [
  { id: "intimate", label: "Intimate", description: "Small groups, personal connections" },
  { id: "social", label: "Social", description: "Meet new people, expand your circle" },
  { id: "large", label: "Large Events", description: "Big crowds, high energy" },
]

export function VibeMatchingSection() {
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null)
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)
  const [selectedCrowd, setSelectedCrowd] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const isComplete = selectedVibe && selectedBudget && selectedCrowd

  const handleFindEvents = () => {
    // Navigate to discover page with filters
    const params = new URLSearchParams()
    if (selectedVibe) params.set("vibe", selectedVibe)
    if (selectedBudget) params.set("budget", selectedBudget)
    if (selectedCrowd) params.set("crowd", selectedCrowd)
    window.location.href = `/discover?${params.toString()}`
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Find Your <span className="neon-text">Perfect Vibe</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tell us what you&apos;re feeling, and we&apos;ll find events that match your energy.
          </p>
        </div>

        {/* Vibe Matching Card */}
        <Card className="glass-strong overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    step >= s 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={cn(
                      "w-12 h-1 mx-2 rounded-full transition-all",
                      step > s ? "bg-primary" : "bg-muted"
                    )} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Mood */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-semibold text-center mb-6">
                  What&apos;s your mood tonight?
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {vibes.map((vibe) => {
                    const Icon = vibe.icon
                    return (
                      <button
                        key={vibe.id}
                        onClick={() => setSelectedVibe(vibe.id)}
                        className={cn(
                          "p-4 rounded-xl text-left transition-all",
                          "border-2",
                          selectedVibe === vibe.id 
                            ? "border-primary bg-primary/10" 
                            : "border-border/50 hover:border-primary/50 bg-muted/30"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            "bg-gradient-to-br", vibe.color
                          )}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold">{vibe.name}</div>
                            <div className="text-sm text-muted-foreground">{vibe.description}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={!selectedVibe}
                    className="neon-glow"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Budget */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-semibold text-center mb-6">
                  What&apos;s your budget?
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {budgetOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedBudget(option.id)}
                      className={cn(
                        "p-4 rounded-xl text-center transition-all",
                        "border-2",
                        selectedBudget === option.id 
                          ? "border-primary bg-primary/10" 
                          : "border-border/50 hover:border-primary/50 bg-muted/30"
                      )}
                    >
                      <div className="font-semibold mb-1">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.range}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    disabled={!selectedBudget}
                    className="neon-glow"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Crowd */}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-semibold text-center mb-6">
                  What kind of crowd do you prefer?
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {crowdOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedCrowd(option.id)}
                      className={cn(
                        "p-4 rounded-xl text-center transition-all",
                        "border-2",
                        selectedCrowd === option.id 
                          ? "border-primary bg-primary/10" 
                          : "border-border/50 hover:border-primary/50 bg-muted/30"
                      )}
                    >
                      <div className="font-semibold mb-1">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleFindEvents} 
                    disabled={!isComplete}
                    className="neon-glow"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Find My Events
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
