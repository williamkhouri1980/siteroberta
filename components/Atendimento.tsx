export default function Atendimento() {
  return (
    <section id="atendimento">
      <span className="label">Como funciona o atendimento</span>
      <div className="atend-grid">
        <div>
          <span className="atend-label">Presencial</span>
          <h3 className="atend-title">Consulta<br />em consultório</h3>
          <p className="atend-body">
            Atendimento no Brasil, com tempo dedicado ao caso. A consulta inclui revisão
            detalhada do histórico, análise dos exames anteriores e, quando indicado,
            solicitação de teste cardiopulmonar de exercício.
          </p>
          <div className="atend-details">
            <div className="atend-detail">
              <span className="atend-detail-key">Localização</span>
              <span className="atend-detail-val">Brasil</span>
            </div>
            <div className="atend-detail">
              <span className="atend-detail-key">Duração</span>
              <span className="atend-detail-val">60–90 minutos (primeira consulta)</span>
            </div>
            <div className="atend-detail">
              <span className="atend-detail-key">Indicado para</span>
              <span className="atend-detail-val">
                Casos que requerem exame físico ou testes funcionais
              </span>
            </div>
          </div>
        </div>

        <div className="atend-divider" aria-hidden="true" />

        <div>
          <span className="atend-label">Telemedicina</span>
          <h3 className="atend-title">Consulta<br />sem fronteiras</h3>
          <p className="atend-body">
            Para pacientes em qualquer parte do mundo que buscam uma segunda opinião
            qualificada. Conduzida em português, inglês ou espanhol. Requer envio de
            exames e histórico com antecedência.
          </p>
          <div className="atend-details">
            <div className="atend-detail">
              <span className="atend-detail-key">Idiomas</span>
              <span className="atend-detail-val">Português · Inglês · Espanhol</span>
            </div>
            <div className="atend-detail">
              <span className="atend-detail-key">Duração</span>
              <span className="atend-detail-val">60 minutos</span>
            </div>
            <div className="atend-detail">
              <span className="atend-detail-key">Indicado para</span>
              <span className="atend-detail-val">
                Segunda opinião, revisão de diagnóstico, orientação terapêutica
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
