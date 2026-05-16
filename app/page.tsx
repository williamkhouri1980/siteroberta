import { getConfig } from '@/lib/content'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/lib/constants'
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
import ScrollReveal    from '@/components/ScrollReveal'

export default async function Home() {
  const config = await getConfig()
  const waNumber = config.whatsapp || WHATSAPP_NUMBER
  const waUrl    = `https://wa.me/${waNumber}?text=${WHATSAPP_MESSAGE}`

  return (
    <>
      <Nav waUrl={waUrl} />
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
      <WhatsAppButton waUrl={waUrl} />
      <ScrollReveal />
    </>
  )
}
