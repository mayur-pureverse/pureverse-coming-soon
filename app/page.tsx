import Hero from '@/components/Hero'
import Discover from '@/components/Discover'
import FeatureCards from '@/components/FeatureCards'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Site-wide botanical texture */}
      <div
        className="botanical-layer pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <main>
          <Hero />
          <Discover />
          <FeatureCards />
        </main>
        <Footer />
      </div>
    </div>
  )
}
