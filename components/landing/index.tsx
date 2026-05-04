import { FONTS, GLOBAL_CSS } from "./styles";
import HeroSection from "./HeroSection";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONTS + GLOBAL_CSS }} />
      <div>
        <HeroSection />
        <Footer />
      </div>
    </>
  );
}