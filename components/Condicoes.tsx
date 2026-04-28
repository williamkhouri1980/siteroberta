const condicoes = [
  {
    num: '01',
    nome: 'Tosse Crônica',
    def: 'Tosse que persiste por mais de 8 semanas em adultos.',
    desc: 'Pode indicar asma, refluxo, gotejamento pós-nasal, DPOC ou, em casos raros, condições mais graves. A investigação correta evita meses de tratamento empírico incorreto.',
  },
  {
    num: '02',
    nome: 'Falta de Ar (Dispneia)',
    def: 'Sensação de dificuldade para respirar, ao esforço ou em repouso.',
    desc: 'As causas vão de descondicionamento físico a hipertensão pulmonar e embolia. O teste cardiopulmonar de exercício (CPET) identifica a origem com precisão.',
  },
  {
    num: '03',
    nome: 'Asma em Adultos',
    def: 'Doença inflamatória das vias aéreas com obstrução variável e reversível.',
    desc: 'Muitos adultos têm asma não diagnosticada ou mal controlada. O controle correto previne crises e melhora qualidade de vida significativamente.',
  },
  {
    num: '04',
    nome: 'DPOC',
    def: 'Doença Pulmonar Obstrutiva Crônica — obstrução progressiva e irreversível ao fluxo de ar.',
    desc: 'Frequentemente subdiagnosticada em fumantes e ex-fumantes. O tratamento adequado retarda a progressão e reduz hospitalizações.',
  },
  {
    num: '05',
    nome: 'Hipertensão Pulmonar',
    def: 'Pressão elevada nas artérias que levam sangue aos pulmões.',
    desc: 'Causa falta de ar, fadiga e limitação progressiva. Requer diagnóstico especializado e tratamento multidisciplinar. Área de especialização da Dra. Roberta.',
  },
  {
    num: '06',
    nome: 'Nódulos Pulmonares',
    def: 'Lesões de pequeno tamanho identificadas em tomografia do tórax.',
    desc: 'A maioria é benigna, mas exige acompanhamento correto. A interpretação adequada evita procedimentos desnecessários e identifica os casos que precisam de atenção.',
  },
]

export default function Condicoes() {
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
            <article key={c.num} className="cond-card">
              <span className="espec-num">{c.num}</span>
              <h3 className="espec-title">{c.nome}</h3>
              <p className="cond-def">{c.def}</p>
              <p className="espec-desc">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
