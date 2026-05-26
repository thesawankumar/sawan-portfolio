import Home from "../sections/Home";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Education from "../sections/Education";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

import ScrollToAnchor from "../components/ScrollToAnchor";
import MobileNavbar from "../components/MobileNavbar";
import Experience from "../sections/Experience";

const LandingPage = () => {
  return (
    <>
      {/* Smooth scrolling to anchors */}
      <ScrollToAnchor />

      {/* Main Sections */}
      <main className="overflow-x-hidden pb-20 lg:pb-0">
        <Home />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer & Mobile Navigation */}
      <Footer />
      <MobileNavbar />
    </>
  );
};

export default LandingPage;
