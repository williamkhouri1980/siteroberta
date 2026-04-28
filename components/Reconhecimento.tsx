import { getReconhecimento } from '@/lib/content'

export default async function Reconhecimento() {
  const rec = await getReconhecimento()

  return (
    <section id="reconhecimento" aria-labelledby="rec-heading">
      <div className="section-inner">
        <span className="label">Por que escolher</span>
        <h2 id="rec-heading" className="section-heading">Formação e diferenciais</h2>

        <div className="rec-stats">
          {rec.stats.map((s) => (
            <div key={s.num} className="rec-stat">
              <span className="rec-valor">{s.num}</span>
              <span className="rec-desc">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="rec-grid">
          {rec.diferenciais.map((d) => (
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
