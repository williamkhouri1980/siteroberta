import { getCondicoes } from '@/lib/content'

export default async function Condicoes() {
  const condicoes = await getCondicoes()

  return (
    <section id="condicoes" aria-labelledby="cond-heading">
      <div className="section-inner">
        <span className="label">Condições tratadas</span>
        <h2 id="cond-heading" className="section-heading">
          Doenças respiratórias com diagnóstico especializado em São Paulo
        </h2>
        <p className="section-lead">
          Cada condição respiratória tem uma causa específica que precisa ser identificada.
          A investigação correta economiza tempo, evita tratamentos errados e melhora
          o resultado clínico.
        </p>

        <div className="cond-grid">
          {condicoes.map((c) => (
            <article key={c.id} className="cond-card">
              <span className="espec-num">{c.num}</span>
              <h3 className="espec-title">{c.nome}</h3>
              <p className="cond-def">{c.definicao}</p>
              <p className="espec-desc">{c.descricao}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
