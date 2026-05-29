import Home from "../sections/Home";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Education from "../sections/Education";
import Projects from "../sections/Projects";
import Reviews from "../sections/Reviews";
import Quote from "../sections/Quote";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import ScrollToAnchor from "../components/ScrollToAnchor";
import MobileNavbar from "../components/MobileNavbar";
import WhatsAppFloat from "../components/WhatsAppFloat";
import Experience from "../sections/Experience";

const LandingPage = () => {
  return (
    <>
      <ScrollToAnchor />
      <main className="overflow-x-hidden pb-20 lg:pb-0">
        <Home />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Reviews />
        <Quote />
        <Contact />
      </main>
      <Footer />
      <MobileNavbar />
      {/* Floating WhatsApp bot button — always visible */}
      <WhatsAppFloat />
    </>
  );
};

export default LandingPage;
