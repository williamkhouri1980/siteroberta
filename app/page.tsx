import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Sobre from '@/components/Sobre'
import Especialidades from '@/components/Especialidades'
import Atendimento from '@/components/Atendimento'
import Faq from '@/components/Faq'
import Agendar from '@/components/Agendar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <Especialidades />
        <Atendimento />
        <Faq />
        <Agendar />
      </main>
      <Footer />
    </>
  )
}
