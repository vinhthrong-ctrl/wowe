import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { HappeningNowSection } from "@/components/happening-now-section"
import { FeaturedEventsSection } from "@/components/featured-events-section"
import { VibeMatchingSection } from "@/components/vibe-matching-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <CategorySection />
      <HappeningNowSection />
      <FeaturedEventsSection />
      <VibeMatchingSection />
      <Footer />
    </main>
  )
}
