const stats = [
  { valor: 'Pós-doc', desc: 'Formação acadêmica em Pneumologia' },
  { valor: 'CPET', desc: 'Especialista em Teste Cardiopulmonar de Exercício' },
  { valor: 'Global', desc: 'Telemedicina para pacientes no mundo todo' },
  { valor: 'SBPT', desc: 'Membro da Sociedade Brasileira de Pneumologia' },
]

const diferenciais = [
  {
    titulo: 'Avaliação em movimento',
    desc: 'A maioria dos especialistas avalia o pulmão em repouso. A Dra. Roberta avalia o pulmão sob esforço — onde os problemas reais aparecem.',
  },
  {
    titulo: 'Integração de especialidades',
    desc: 'Hipertensão pulmonar, fisiologia do exercício e terapia intensiva na mesma consulta. Visão sistêmica que especialistas isolados não conseguem oferecer.',
  },
  {
    titulo: 'Segunda opinião sem julgamento',
    desc: 'Para quem já tem diagnóstico mas não tem resposta. Revisão fundamentada em evidências, com respeito ao histórico anterior.',
  },
  {
    titulo: 'Pesquisa aplicada à clínica',
    desc: 'Publicações científicas indexadas em hipertensão pulmonar e fisiologia do exercício. O que a literatura mais recente diz chega à sua consulta.',
  },
]

export default function Reconhecimento() {
  return (
    <section id="reconhecimento" aria-labelledby="rec-heading">
      <div className="section-inner">
        <span className="label">Por que escolher</span>
        <h2 id="rec-heading" className="section-heading">
          Formação e diferenciais
        </h2>

        <div className="rec-stats">
          {stats.map((s) => (
            <div key={s.valor} className="rec-stat">
              <span className="rec-valor">{s.valor}</span>
              <span className="rec-desc">{s.desc}</span>
            </div>
          ))}
        </div>

        <div className="rec-grid">
          {diferenciais.map((d) => (
            <div key={d.titulo} className="rec-card">
              <h3 className="rec-titulo">{d.titulo}</h3>
              <p className="rec-texto">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
