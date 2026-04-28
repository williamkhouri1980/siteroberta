const faqs = [
  {
    question: 'O que é hipertensão pulmonar e como é tratada?',
    answer:
      'Hipertensão pulmonar é o aumento da pressão nas artérias dos pulmões, podendo causar falta de ar, fadiga e limitação funcional progressiva. A Dra. Roberta Pulcheri Ramos especializa-se no diagnóstico, estratificação e tratamento de todas as formas de HP — incluindo hipertensão arterial pulmonar (HAP), HP tromboembólica crônica e casos de difícil controle.',
  },
  {
    question: 'O que é o teste cardiopulmonar de exercício (CPET)?',
    answer:
      'O teste cardiopulmonar de exercício (CPET) avalia simultaneamente as respostas cardiovascular, respiratória e metabólica ao esforço físico. Permite identificar a causa exata da dispneia ao esforço e alterações hemodinâmicas que não aparecem em exames de repouso — como espirometria ou ecocardiograma padrão. É uma ferramenta essencial no diagnóstico de hipertensão pulmonar e limitação funcional inexplicada.',
  },
  {
    question: 'A Dra. Roberta atende pacientes internacionais por telemedicina?',
    answer:
      'Sim. A Dra. Roberta Pulcheri Ramos oferece consultas por telemedicina para pacientes em qualquer parte do mundo, em português, inglês ou espanhol. O atendimento é indicado para segunda opinião, revisão de diagnóstico e orientação terapêutica, com duração de 60 minutos. É necessário enviar exames e histórico clínico com antecedência.',
  },
  {
    question: 'Quais são as especialidades da Dra. Roberta Pulcheri Ramos?',
    answer:
      'A Dra. Roberta Pulcheri Ramos é pneumologista com formação até pós-doutorado, com atuação focada em: (1) Hipertensão Pulmonar — diagnóstico, estratificação e tratamento; (2) Fisiologia do Exercício — avaliação pelo teste cardiopulmonar (CPET); (3) Segunda Opinião — para casos com diagnóstico inconclusivo ou sintomas inexplicados; e (4) Terapia Intensiva. Seu diferencial é integrar a avaliação do pulmão em movimento na prática clínica diária.',
  },
  {
    question: 'Como agendar uma consulta com a Dra. Roberta Pulcheri Ramos?',
    answer:
      'Para agendar uma consulta, entre em contato pelo e-mail contato@robertaramos.med.br. Atendimentos presenciais são realizados no Brasil. Para pacientes em outros países, a telemedicina está disponível em português, inglês e espanhol. Consultas iniciais têm duração de 60 a 90 minutos.',
  },
]

export default function Faq() {
  return (
    <section id="faq">
      <div className="faq-grid">
        <div>
          <span className="label">Perguntas frequentes</span>
          <h2 className="faq-heading">
            O que você<br />
            precisa saber<br />
            antes de consultar.
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
