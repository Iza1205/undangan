import { FONTS, GLOBAL_CSS } from "./styles";
import HeroSection from "./HeroSection";
import ThemesSection from "./ThemesSection";
import FeaturesSection from "./FeaturesSection";
import BottomCTA from "./BottomCTA";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONTS + GLOBAL_CSS }} />
      <div>
        <HeroSection />
        <ThemesSection />
        <FeaturesSection />
        <BottomCTA />
        <Footer />
      </div>
    </>
  );
}