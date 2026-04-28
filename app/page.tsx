import Nav             from '@/components/Nav'
import Hero            from '@/components/Hero'
import QuandoConsultar from '@/components/QuandoConsultar'
import Sobre           from '@/components/Sobre'
import Condicoes       from '@/components/Condicoes'
import ComoFunciona    from '@/components/ComoFunciona'
import Reconhecimento  from '@/components/Reconhecimento'
import Localizacao     from '@/components/Localizacao'
import Faq             from '@/components/Faq'
import Agendar         from '@/components/Agendar'
import Footer          from '@/components/Footer'
import WhatsAppButton  from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <QuandoConsultar />
        <Sobre />
        <Condicoes />
        <ComoFunciona />
        <Reconhecimento />
        <Localizacao />
        <Faq />
        <Agendar />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
