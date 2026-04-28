import { getFaqs } from '@/lib/content'

export default async function Faq() {
  const faqs = await getFaqs()

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
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <h3 className="faq-question">{faq.pergunta}</h3>
                <p className="faq-answer">{faq.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
