import Image from 'next/image'

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-photo hero-photo-wrap">
        <Image
          src="/roberta4-cropped.jpg"
          alt="Dra. Roberta Pulcheri Ramos em seu consultório"
          width={2177}
          height={3456}
          priority
          quality={85}
          sizes="(max-width: 1024px) 100vw, 44vw"
        />
      </div>

      <div className="hero-text">
        <p className="hero-eyebrow">
          Pneumologia &middot; Hipertensão Pulmonar &middot; Fisiologia do Exercício
        </p>
        <h1 className="hero-h1">
          O pulmão revela<br />
          o que o repouso<br />
          não mostra.
        </h1>
        <div className="hero-rule" />
        <p className="hero-body">
          Quando os exames voltam normais mas você continua sem resposta — é hora
          de ver o que acontece quando o pulmão trabalha de verdade.
        </p>
        <div className="hero-ctas">
          <a className="btn-primary" href="#agendar">Agendar consulta</a>
          <a className="btn-ghost"   href="#atendimento">Telemedicina global &rarr;</a>
        </div>
      </div>
    </section>
  )
}
