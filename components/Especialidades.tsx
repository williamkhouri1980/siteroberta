const especialidades = [
  {
    num: '01',
    title: 'Hipertensão Pulmonar',
    desc: 'Diagnóstico, estratificação e tratamento da hipertensão arterial pulmonar e demais formas de HP — incluindo casos de difícil controle, diagnósticos tardios e revisão de condutas em andamento.',
  },
  {
    num: '02',
    title: 'Fisiologia do Exercício',
    desc: 'Avaliação da capacidade ao exercício por teste cardiopulmonar (CPET). Investigação de dispneia ao esforço, limitação funcional e respostas hemodinâmicas que não aparecem em exames de repouso.',
  },
  {
    num: '03',
    title: 'Segunda Opinião',
    desc: 'Para pacientes com diagnóstico inconclusivo, sintomas inexplicados ou insatisfação com condutas em andamento. Revisão fundamentada em evidências, sem julgamento do histórico anterior.',
  },
]

export default function Especialidades() {
  return (
    <section id="especialidades">
      <span className="label">Especialidades</span>
      <h2 className="espec-intro">
        O que acontece quando<br />
        o pulmão está sendo<br />
        realmente desafiado.
      </h2>
      <div className="espec-grid">
        {especialidades.map((e) => (
          <article key={e.num} className="espec-card">
            <span className="espec-num">{e.num}</span>
            <h3 className="espec-title">{e.title}</h3>
            <p className="espec-desc">{e.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
