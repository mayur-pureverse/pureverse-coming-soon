import Hero from '@/components/Hero'
import Discover from '@/components/Discover'
import FeatureCards from '@/components/FeatureCards'
import Footer from '@/components/Footer'
import LaunchLoader from '@/components/LaunchLoader'
import ClickSpark from '@/components/ClickSpark'

export default function Page() {
  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="relative min-h-screen overflow-hidden bg-background">
        <LaunchLoader />
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
    </ClickSpark>
  )
}
