import type { Metadata } from 'next'
import LandingNavbar from '@/components/landing/LandingNavbar'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorks from '@/components/landing/HowItWorks'
import ProblemSection from '@/components/landing/ProblemSection'
import BenefitsSection from '@/components/landing/BenefitsSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import PricingSection from '@/components/landing/PricingSection'
import CtaSection from '@/components/landing/CtaSection'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'VagaZaps — Receba vagas de emprego no WhatsApp',
  description:
    'Encontre oportunidades de emprego sem precisar procurar todos os dias. Configure seu perfil e receba novas vagas compatíveis.',
}

export default function HomePage() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <ProblemSection />
        <BenefitsSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
