import Hero from "@/sections/Hero";
import LivingBackground from "@/components/LivingBackground";
import Marquee from "@/sections/Marquee";
import Servicios from "@/sections/Servicios";
import Prueba from "@/sections/Prueba";
import Proceso from "@/sections/Proceso";
import Nosotros from "@/sections/Nosotros";
import Faq from "@/sections/Faq";
import Contacto from "@/sections/Contacto";
import Footer from "@/sections/Footer";
import { useReveal } from "@/hooks/useReveal";

export default function App() {
  useReveal();

  return (
    <div className="text-foreground min-h-screen">
      <LivingBackground />
      <Hero />
      <main>
        <Marquee />
        <Servicios />
        <Prueba />
        <Proceso />
        <Nosotros />
        <Faq />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
