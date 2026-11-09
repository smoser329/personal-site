import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Life from "@/components/Life";
import Blog from "@/components/Blog";
import Games from "@/components/Games";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Life />
        <Blog />
        <Games />
      </main>
      <Footer />
    </>
  );
}
