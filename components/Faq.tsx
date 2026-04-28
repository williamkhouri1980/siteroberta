const faqs = [
  {
    question: 'Quando devo consultar um pneumologista?',
    answer:
      'Consulte um pneumologista se você tiver: tosse que persiste por mais de 3 semanas; falta de ar ao fazer esforços simples como subir escadas; chiado ou aperto no peito; infecções pulmonares frequentes (mais de 2 por ano); nódulo identificado em tomografia do tórax; diagnóstico de asma, DPOC ou hipertensão pulmonar sem acompanhamento regular.',
  },
  {
    question: 'Tosse por mais de 3 semanas é sinal de alerta?',
    answer:
      'Sim. Tosse que persiste por mais de 3 semanas é chamada de tosse subaguda, e acima de 8 semanas é considerada tosse crônica. Ambas exigem investigação especializada. As causas mais comuns em adultos incluem gotejamento pós-nasal, asma, refluxo gastroesofágico e, com menor frequência, doenças pulmonares estruturais. A investigação correta evita meses de tratamento empírico incorreto.',
  },
  {
    question: 'O que causa falta de ar ao subir escadas ou caminhar rápido?',
    answer:
      'A falta de ar ao esforço (dispneia de esforço) pode ter origem pulmonar, cardíaca ou ser consequência de descondicionamento físico. Entre as causas pulmonares estão asma, DPOC, hipertensão pulmonar e doenças pulmonares intersticiais. O teste cardiopulmonar de exercício (CPET) é o exame mais preciso para identificar a causa — ele avalia o pulmão, o coração e os músculos enquanto o corpo trabalha de verdade.',
  },
  {
    question: 'Qual a diferença entre asma e DPOC?',
    answer:
      'Asma é uma doença inflamatória das vias aéreas com obstrução variável e geralmente reversível. Tende a se manifestar desde a infância ou adolescência e responde bem a broncodilatadores e corticoides inalatórios. DPOC (Doença Pulmonar Obstrutiva Crônica) é uma obstrução progressiva e irreversível ao fluxo de ar, causada principalmente pelo tabagismo. Afeta adultos acima de 40 anos e exige tratamento diferente. Ambas podem coexistir no mesmo paciente — quadro chamado de síndrome ACO.',
  },
  {
    question: 'Como é uma consulta de pneumologia com a Dra. Roberta?',
    answer:
      'A primeira consulta dura entre 60 e 90 minutos. O histórico clínico é revisado completamente, incluindo todos os exames anteriores, medicamentos em uso e impacto dos sintomas na vida diária. Quando indicado, são solicitados exames complementares — incluindo o teste cardiopulmonar de exercício (CPET), que avalia o pulmão sob esforço. Ao final, o paciente recebe explicação clara do que foi identificado e qual é o plano de tratamento.',
  },
  {
    question: 'A Dra. Roberta realiza consultas por telemedicina?',
    answer:
      'Sim. A Dra. Roberta Pulcheri Ramos oferece consultas por telemedicina para pacientes em qualquer parte do Brasil e do mundo, em português, inglês ou espanhol. A telemedicina é indicada especialmente para segunda opinião, revisão de diagnóstico e acompanhamento de casos já investigados. É necessário enviar exames e histórico clínico com antecedência.',
  },
  {
    question: 'O que é hipertensão pulmonar e quais os sintomas?',
    answer:
      'Hipertensão pulmonar é o aumento da pressão nas artérias que levam sangue dos pulmões ao coração. Os sintomas principais são: falta de ar ao esforço (que piora progressivamente), fadiga, palpitações e, nos casos mais avançados, inchaço nas pernas e síncope (desmaio). É uma doença que frequentemente é confundida com asma ou sedentarismo, e o diagnóstico leva em média 2 anos para ser feito. A Dra. Roberta é especialista nessa área.',
  },
  {
    question: 'O que é o teste cardiopulmonar de exercício (CPET) e quando é indicado?',
    answer:
      'O teste cardiopulmonar de exercício (CPET) é um exame que avalia simultaneamente o coração, os pulmões e os músculos durante esforço físico em bicicleta ergométrica ou esteira. É o único exame capaz de identificar o sistema que está limitando a capacidade ao exercício. É indicado para investigar dispneia ao esforço sem causa definida, avaliar a gravidade da hipertensão pulmonar, acompanhar doenças pulmonares e cardíacas, e nos casos em que os exames de repouso estão normais mas o paciente continua com sintomas.',
  },
]

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading">
      <div className="section-inner">
        <div className="faq-grid">
          <div>
            <span className="label">Perguntas frequentes</span>
            <h2 id="faq-heading" className="faq-heading">
              O que os pacientes precisam saber antes de consultar.
            </h2>
            <p className="faq-intro">
              Respostas diretas para as dúvidas mais comuns sobre pneumologia,
              doenças respiratórias e como funciona o atendimento.
            </p>
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
      </div>
    </section>
  )
}
