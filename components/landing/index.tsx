import { FONTS, GLOBAL_CSS } from "./styles";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import ThemesSection from "./ThemesSection";
import ProofSection from "./ProofSection";
import BottomCTA from "./BottomCTA";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONTS + GLOBAL_CSS }} />
      <div>
        <HeroSection />
        <FeaturesSection />
        <ThemesSection />
        <ProofSection />
        <BottomCTA />
        <Footer />
      </div>
    </>
  );
}