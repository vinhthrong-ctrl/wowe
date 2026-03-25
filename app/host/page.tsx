"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XPRings } from "@/components/xp-rings"
import { 
  ArrowRight, 
  Zap, 
  Users, 
  TrendingUp, 
  Calendar,
  DollarSign,
  BarChart3,
  Sparkles,
  Star,
  Play,
  Check,
  ChevronDown
} from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    icon: DollarSign,
    title: "Earn 90% of Revenue",
    description: "Keep the majority of your earnings. We only take a 10% platform fee.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Reach Thousands",
    description: "Get discovered by our community of event-seekers across multiple cities.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description: "Track your performance, understand your audience, and grow your business.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Tools",
    description: "Create stunning event descriptions and optimize pricing with AI assistance.",
    gradient: "from-teal-500 to-green-500",
  },
  {
    icon: Calendar,
    title: "Easy Management",
    description: "Create events in under 2 minutes with our intuitive event builder.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Brand",
    description: "Build a loyal following with our engagement tools and repeat guest tracking.",
    gradient: "from-pink-500 to-purple-500",
  },
]

const hostRings = [
  { label: "Hosting", value: 85, max: 100, color: "#f97316", glowColor: "rgba(249, 115, 22, 0.5)" },
  { label: "Engagement", value: 72, max: 100, color: "#a855f7", glowColor: "rgba(168, 85, 247, 0.5)" },
  { label: "Growth", value: 68, max: 100, color: "#14b8a6", glowColor: "rgba(20, 184, 166, 0.5)" },
]

const testimonials = [
  {
    name: "Maya Singh",
    role: "Yoga Instructor",
    avatar: "MS",
    quote: "WorldWeave helped me grow my yoga community from 10 regulars to over 200 monthly attendees. The platform handles everything so I can focus on teaching.",
    stats: { events: 156, attendees: 3420, rating: 4.9 },
    gradient: "from-orange-500 to-pink-500",
  },
  {
    name: "Arjun Mehta",
    role: "Run Club Organizer",
    avatar: "AM",
    quote: "The gamification features keep my runners coming back week after week. Our retention rate has doubled since joining the platform.",
    stats: { events: 89, attendees: 1850, rating: 4.8 },
    gradient: "from-blue-500 to-purple-500",
  },
]

const faqs = [
  {
    question: "How much does it cost to host on WorldWeave?",
    answer: "It's completely free to list your events. We only take a 10% platform fee when you make a sale. Free events have no fees at all.",
  },
  {
    question: "When do I get paid?",
    answer: "Payouts are processed twice a month (1st and 15th). You'll receive your earnings within 2-3 business days after processing.",
  },
  {
    question: "Can I host recurring events?",
    answer: "Yes! You can set up weekly, bi-weekly, or monthly recurring events. Attendees can subscribe to your series and book automatically.",
  },
  {
    question: "What types of events can I host?",
    answer: "Everything from fitness classes, workshops, social gatherings, comedy shows, club nights, food experiences, and more. If it brings people together, you can host it!",
  },
]

export default function HostPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden mesh-gradient">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-transparent rotate-12 animate-float" />
          <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-gradient-to-br from-accent/30 to-transparent animate-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-3xl bg-gradient-to-br from-pink/20 to-transparent -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-lg bg-gradient-to-br from-teal/20 to-transparent rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-slide-up">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm">500+ hosts earning on WorldWeave</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Turn your passion into
                <span className="block gradient-text">profit.</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Host events, build your community, and earn money doing what you love. 
                Our platform handles bookings, payments, and marketing so you can focus on creating amazing experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/host/onboarding">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground">
                    Start Hosting Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/host/dashboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/50 group">
                    <Play className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">₹2.5Cr+</div>
                  <div className="text-sm text-muted-foreground">Paid to hosts</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">50K+</div>
                  <div className="text-sm text-muted-foreground">Events hosted</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">4.8</div>
                  <div className="text-sm text-muted-foreground">Avg rating</div>
                </div>
              </div>
            </div>

            {/* Host Ring System Preview */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Glow effect behind card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-pink/20 blur-3xl scale-110" />
                
                <Card className="relative glass-strong p-8 card-hover">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 mb-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Host XP System</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Track your hosting performance</p>
                  </div>
                  
                  <XPRings 
                    rings={hostRings} 
                    size="lg" 
                  />

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-primary/10 to-transparent">
                      <span className="text-sm">Level</span>
                      <span className="font-semibold text-primary">Pro Host</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-accent/10 to-transparent">
                      <span className="text-sm">This Month</span>
                      <span className="font-semibold">₹45,000 earned</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to <span className="gradient-text">succeed</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From event creation to payouts, we&apos;ve got you covered.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.title} className="glass card-hover group">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mesh-gradient-subtle">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Start hosting in <span className="gradient-text">3 easy steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Create your event", desc: "Add details, set your price, upload photos", icon: Calendar, color: "from-orange-500 to-red-500" },
              { step: 2, title: "Share & promote", desc: "We help you reach thousands of attendees", icon: Users, color: "from-blue-500 to-purple-500" },
              { step: 3, title: "Get paid", desc: "Receive 90% of earnings directly", icon: DollarSign, color: "from-green-500 to-teal-500" },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent -translate-x-1/2" />
                )}
                <div className="text-center">
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, transparent <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-muted-foreground">No hidden fees. No monthly charges. Pay only when you earn.</p>
          </div>

          <Card className="glass-strong overflow-hidden">
            <div className="p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 text-center">
                  <div className="text-sm text-muted-foreground mb-2">Free events</div>
                  <div className="text-5xl font-bold text-green-500 mb-2">0%</div>
                  <div className="text-sm text-muted-foreground">No fees at all</div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center">
                  <div className="text-sm text-muted-foreground mb-2">Paid events</div>
                  <div className="text-5xl font-bold text-primary mb-2">10%</div>
                  <div className="text-sm text-muted-foreground">+ GST on fee only</div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-muted/30">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  What&apos;s included
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Event listing & promotion",
                    "Booking management",
                    "Automatic payments",
                    "Analytics dashboard",
                    "AI description writer",
                    "Customer support",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mesh-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Hosts love <span className="gradient-text">WorldWeave</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="glass card-hover overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-xl font-semibold text-white`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground/90 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex gap-4 text-sm text-muted-foreground pt-4 border-t border-border/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {testimonial.stats.events} events
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {testimonial.stats.attendees.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      {testimonial.stats.rating}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className={`glass overflow-hidden transition-all ${openFaq === index ? 'ring-2 ring-primary/50' : ''}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-muted-foreground animate-slide-up">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-pink/20" />
            <div className="absolute inset-0 pattern-grid opacity-20" />
            <CardContent className="relative p-8 sm:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 mb-6">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Join 500+ successful hosts</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to start your hosting journey?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Create your first event in minutes and start earning. No credit card required.
              </p>
              <Link href="/host/onboarding">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg">
                  Create Your First Event
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
