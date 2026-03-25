"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Compass, Gift, User, Sparkles } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-full h-full rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <span className="text-xl font-bold gradient-text">WorldWeave</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
            >
              Home
            </Link>
            <Link 
              href="/discover" 
              className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Discover
            </Link>
            <Link 
              href="/perks" 
              className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Gift className="w-4 h-4" />
              Perks
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/host">
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground">
                Host Events
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/10">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-foreground/80 hover:text-foreground transition-colors px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/discover" 
                className="text-foreground/80 hover:text-foreground transition-colors px-2 py-2 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Compass className="w-4 h-4" />
                Discover
              </Link>
              <Link 
                href="/perks" 
                className="text-foreground/80 hover:text-foreground transition-colors px-2 py-2 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Gift className="w-4 h-4" />
                Perks
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
