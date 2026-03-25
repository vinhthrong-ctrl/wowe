"use client"

import { Button } from "@/components/ui/button"
import { XPRings } from "@/components/xp-rings"
import { ArrowRight, Play, Zap, Sparkles, Users, Calendar, Star } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 mesh-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating shapes */}
        <div className="absolute top-20 left-[10%] w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/40 to-transparent rotate-12 animate-float" />
        <div className="absolute top-1/3 right-[15%] w-20 h-20 rounded-full bg-gradient-to-br from-accent/30 to-transparent animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-[20%] w-24 h-24 rounded-3xl bg-gradient-to-br from-pink/20 to-transparent -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-[10%] w-12 h-12 rounded-lg bg-gradient-to-br from-teal/30 to-transparent rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-20 right-[25%] w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow/20 to-transparent animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 pattern-dots opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-slide-up">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-foreground/80">2,450+ events happening this week</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-foreground">Find events that</span>
              <br />
              <span className="gradient-text">
                match your vibe.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              Discover, attend, and share real-world experiences. Earn XP, level up, and unlock exclusive perks along the way.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/discover">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 group shadow-lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explore Events
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/host">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/50 hover:bg-primary/10 group">
                  <Play className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                  Become a Host
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-6 sm:gap-8 mt-12 justify-center lg:justify-start">
              {[
                { value: "50K+", label: "Active Users", icon: Users, color: "text-blue-500" },
                { value: "2K+", label: "Events Monthly", icon: Calendar, color: "text-orange-500" },
                { value: "4.8", label: "Avg Rating", icon: Star, color: "text-yellow-500" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - XP Rings Demo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-pink/20 blur-3xl scale-110" />
              
              {/* Floating Card */}
              <div className="relative glass-strong rounded-3xl p-8 card-hover">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Your Life XP</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Track your real-world progress</p>
                </div>
                
                <XPRings size="lg" />

                {/* XP Info */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-primary/10 to-transparent">
                    <span className="text-sm text-muted-foreground">Total XP</span>
                    <span className="text-lg font-bold text-primary">2,450</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-accent/10 to-transparent">
                    <span className="text-sm text-muted-foreground">Level</span>
                    <span className="text-lg font-bold text-accent">Explorer</span>
                  </div>
                </div>

                {/* Next Level Progress */}
                <div className="mt-4 p-4 rounded-xl bg-muted/20">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress to Adventurer</span>
                    <span className="text-primary font-medium">65%</span>
                  </div>
                  <div className="h-2.5 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary via-accent to-pink rounded-full transition-all duration-1000"
                      style={{ width: '65%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Mini floating badges */}
              <div className="absolute -top-4 -left-4 px-3 py-1.5 rounded-full glass animate-float text-sm font-medium">
                +50 XP
              </div>
              <div className="absolute -bottom-2 -right-4 px-3 py-1.5 rounded-full glass animate-float text-sm font-medium" style={{ animationDelay: '1s' }}>
                Level Up!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
