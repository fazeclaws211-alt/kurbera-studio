import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/kubera/Nav";
import { Hero } from "@/components/kubera/Hero";
import { Marquee } from "@/components/kubera/Marquee";
import { Collections, type FabricKey } from "@/components/kubera/Collections";
import { SampleDesk } from "@/components/kubera/SampleDesk";
import { Lookbook } from "@/components/kubera/Lookbook";
import { Contact } from "@/components/kubera/Contact";
import { Footer } from "@/components/kubera/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kubera Studio India LLP — The House of Fashion" },
      {
        name: "description",
        content:
          "A boutique fashion house presenting considered garment lines, previewed by lookbook, sketch, or studio appointment.",
      },
      { property: "og:title", content: "Kubera Studio India LLP — The House of Fashion" },
      {
        property: "og:description",
        content:
          "Considered garment lines from a boutique Indian fashion house — previewed by lookbook, sketch, or studio appointment.",
      },
    ],
  }),
  component: KuberaHome,
});

function KuberaHome() {
  const [focus, setFocus] = useState<FabricKey>("Dailywear");

  return (
    <div className="min-h-screen bg-paper">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Collections selected={focus} onSelect={setFocus} />
        <SampleDesk focus={focus} />
        <Lookbook />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
