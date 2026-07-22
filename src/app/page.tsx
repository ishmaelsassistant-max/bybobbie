import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import SceneGate from "@/components/SceneGate";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SceneGate />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Booking />
      </main>
      <Contact />
    </>
  );
}
