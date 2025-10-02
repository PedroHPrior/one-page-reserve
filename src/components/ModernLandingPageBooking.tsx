import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { ServicesGrid } from './ServicesGrid';
import { InlineBookingModal } from './InlineBookingModal';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { FloatingActionButton } from './FloatingActionButton';

export const ModernLandingPageBooking = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesGrid />
        <ContactSection />
      </main>
      <Footer />
      <InlineBookingModal />
      <FloatingActionButton />
    </div>
  );
};
