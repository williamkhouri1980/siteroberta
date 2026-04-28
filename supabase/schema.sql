-- ============================================================
-- Schema do site Dra. Roberta Pulcheri Ramos
-- Rodar no Supabase → SQL Editor
-- ============================================================

-- Conteúdo singleton (chave → JSON)
CREATE TABLE IF NOT EXISTS site_content (
  key        TEXT PRIMARY KEY,
  value      JSONB        NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Coleção: condições tratadas
CREATE TABLE IF NOT EXISTS condicoes (
  id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  num        TEXT         NOT NULL DEFAULT '',
  nome       TEXT         NOT NULL DEFAULT '',
  definicao  TEXT         NOT NULL DEFAULT '',
  descricao  TEXT         NOT NULL DEFAULT '',
  ordem      INTEGER      NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Coleção: FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  pergunta   TEXT         NOT NULL DEFAULT '',
  resposta   TEXT         NOT NULL DEFAULT '',
  ordem      INTEGER      NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Índices para ordenação
CREATE INDEX IF NOT EXISTS condicoes_ordem_idx ON condicoes (ordem);
CREATE INDEX IF NOT EXISTS faqs_ordem_idx      ON faqs      (ordem);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_site_content_updated ON site_content;
CREATE TRIGGER trg_site_content_updated
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_condicoes_updated ON condicoes;
CREATE TRIGGER trg_condicoes_updated
  BEFORE UPDATE ON condicoes
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_faqs_updated ON faqs;
CREATE TRIGGER trg_faqs_updated
  BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS: leitura pública, escrita apenas via service role
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE condicoes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs         ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "public read condicoes"    ON condicoes    FOR SELECT USING (true);
CREATE POLICY "public read faqs"         ON faqs         FOR SELECT USING (true);

-- ============================================================
-- Seed: conteúdo inicial (execute após criar as tabelas)
-- ============================================================

INSERT INTO site_content (key, value) VALUES

('config', '{
  "whatsapp": "5511998833215",
  "email": "contato@robertaramos.med.br",
  "crm": "CRM-SP 118819 / RQE 71760",
  "siteUrl": "https://www.robertaramos.med.br",
  "lattesUrl": "http://lattes.cnpq.br/3674430003360595"
}'),

('endereco', '{
  "rua": "Rua Borges Lagoa, 971 — cj. 32",
  "bairro": "Vila Clementino",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "04038-032",
  "horarios": "Segunda a Sexta, 08h às 18h",
  "mapsEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1999161775457!2d-46.64871642219773!3d-23.59716217877532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a247c06fc19%3A0xfbed801b83a98143!2sR.%20Borges%20Lagoa%2C%20971%20-%20Vila%20Clementino%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004038-032!5e0!3m2!1spt-BR!2sbr!4v1777404174949!5m2!1spt-BR!2sbr"
}'),

('hero', '{
  "eyebrow": "Pneumologia · São Paulo · Telemedicina Global",
  "h1": "Pneumologista em São Paulo especializada em doenças respiratórias",
  "corpo": "Diagnóstico preciso para tosse crônica, falta de ar, asma e hipertensão pulmonar. Primeira consulta de 60 a 90 minutos.",
  "ctaPrimario": "Agendar consulta",
  "ctaSecundario": "Como funciona"
}'),

('quando_consultar', '{
  "heading": "Quando devo procurar um pneumologista?",
  "lead": "Alguns sintomas indicam que é hora de uma avaliação especializada. Quanto antes o diagnóstico, mais efetivo o tratamento.",
  "sinais": [
    {"titulo": "Tosse persistente", "desc": "Tosse que dura mais de 3 semanas, mesmo sem infecção ativa, pode indicar asma, refluxo ou outra condição tratável."},
    {"titulo": "Falta de ar ao esforço", "desc": "Dificuldade para respirar ao subir escadas, caminhar rápido ou fazer atividades simples que antes eram tranquilas."},
    {"titulo": "Chiado ou aperto no peito", "desc": "Sensação de aperto, chiado ao respirar ou respiração difícil podem ser sinais de asma ou obstrução das vias aéreas."},
    {"titulo": "Infecções pulmonares frequentes", "desc": "Mais de 2 pneumonias ou bronquites por ano sugerem uma condição de base que merece investigação."},
    {"titulo": "Alteração em imagem de tórax", "desc": "Nódulo, infiltrado ou qualquer achado em tomografia ou raio-X que o médico não conseguiu explicar."},
    {"titulo": "Diagnóstico sem acompanhamento", "desc": "Asma, DPOC, hipertensão pulmonar ou fibrose pulmonar diagnosticadas mas sem seguimento regular com pneumologista."}
  ]
}'),

('sobre', '{
  "heading": "Diagnóstico que vai além do exame de repouso.",
  "paragrafos": [
    "A Dra. Roberta Pulcheri Ramos é pneumologista com pós-doutorado pela Universidade de São Paulo (USP), especializada em hipertensão pulmonar, fisiologia do exercício e doenças respiratórias complexas.",
    "Sua abordagem diferenciada parte de uma premissa: o pulmão precisa ser avaliado em movimento. Por isso utiliza o teste cardiopulmonar de exercício (CPET) como ferramenta diagnóstica central — o único exame capaz de identificar, simultaneamente, a origem pulmonar, cardíaca ou muscular da falta de ar.",
    "Atende presencialmente em São Paulo e por telemedicina para pacientes em qualquer parte do mundo, em português, inglês ou espanhol."
  ],
  "credenciais": [
    "Médica formada pela Universidade de São Paulo (USP)",
    "Especialização em Pneumologia — Hospital das Clínicas / USP",
    "Pós-doutorado em Fisiologia do Exercício — USP",
    "Membro da Sociedade Brasileira de Pneumologia e Tisiologia (SBPT)",
    "Membro da European Respiratory Society (ERS)",
    "CRM-SP 118819 / RQE 71760"
  ],
  "lattesUrl": "http://lattes.cnpq.br/3674430003360595"
}'),

('como_funciona', '{
  "heading": "Como funciona uma consulta de pneumologia",
  "lead": "Uma consulta com a Dra. Roberta não começa pelo sintoma isolado — começa pela história completa do paciente.",
  "passos": [
    {"titulo": "Agendamento pelo WhatsApp", "desc": "Entre em contato pelo WhatsApp. A equipe orienta sobre o envio prévio de exames e histórico clínico para otimizar o tempo de consulta."},
    {"titulo": "Revisão completa do histórico", "desc": "A primeira consulta dura entre 60 e 90 minutos. Todo o histórico clínico é revisado — sintomas, exames anteriores, medicamentos e impacto na qualidade de vida."},
    {"titulo": "Exames complementares quando indicados", "desc": "Quando necessário, exames como espirometria, tomografia ou o teste cardiopulmonar de exercício (CPET) são solicitados ou realizados no mesmo dia."},
    {"titulo": "Diagnóstico explicado com clareza", "desc": "Ao final, você recebe uma explicação clara do que está acontecendo, sem jargão médico desnecessário. Tudo documentado."},
    {"titulo": "Plano de tratamento e acompanhamento", "desc": "O plano de tratamento é individualizado. O acompanhamento pode ser presencial em São Paulo ou por telemedicina, conforme a necessidade."}
  ]
}'),

('reconhecimento', '{
  "stats": [
    {"num": "15+", "label": "Anos de experiência em pneumologia"},
    {"num": "USP", "label": "Pós-doutorado — maior universidade da América Latina"},
    {"num": "SBPT", "label": "Membro ativa da sociedade brasileira de referência"},
    {"num": "3", "label": "Idiomas — PT · EN · ES"}
  ],
  "diferenciais": [
    {"titulo": "Especialista em casos complexos", "desc": "Referência em hipertensão pulmonar e fisiologia do exercício — condições que frequentemente chegam com diagnóstico errado ou incompleto."},
    {"titulo": "CPET como diferencial diagnóstico", "desc": "Único exame que avalia simultaneamente coração, pulmão e músculos durante esforço. Disponível para pacientes presenciais."},
    {"titulo": "Segunda opinião fundamentada", "desc": "Para quem tem diagnóstico duvidoso ou sintomas que não respondem ao tratamento. Disponível por telemedicina em qualquer país."},
    {"titulo": "Sem pressa", "desc": "Primeiras consultas de 60 a 90 minutos. Tempo para entender o histórico completo e explicar o diagnóstico sem atalhos."}
  ]
}'),

('cta', '{
  "heading": "Pronto para ter uma resposta fundamentada?",
  "subtitulo": "Agende sua consulta pelo WhatsApp. Atendimento presencial em São Paulo e telemedicina global."
}'),

('seo', '{
  "title": "Pneumologista em São Paulo | Dra. Roberta Pulcheri Ramos",
  "description": "Pneumologista em São Paulo especializada em tosse crônica, falta de ar, asma e hipertensão pulmonar. Pós-doutorado. Consultas presenciais em São Paulo e telemedicina global. Agende pelo WhatsApp.",
  "ogTitle": "Pneumologista em São Paulo | Dra. Roberta Pulcheri Ramos",
  "ogDescription": "Especialista em tosse crônica, falta de ar, asma e hipertensão pulmonar. Pós-doutorado. Atende em São Paulo e por telemedicina global.",
  "keywords": ["pneumologista São Paulo", "pneumologista SP", "hipertensão pulmonar", "tosse crônica São Paulo", "falta de ar especialista São Paulo", "asma adultos São Paulo", "DPOC tratamento São Paulo", "CPET São Paulo", "segunda opinião pneumologia", "telemedicina pneumologia", "Roberta Pulcheri Ramos"]
}')

ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Condições
INSERT INTO condicoes (num, nome, definicao, descricao, ordem) VALUES
('01', 'Tosse Crônica',        'Tosse persistente por mais de 8 semanas.',                                     'A tosse crônica é um dos sintomas mais subestimados da pneumologia. Pode ter origem em múltiplos sistemas — vias aéreas superiores, pulmão, esôfago — e frequentemente é tratada empiricamente por meses sem diagnóstico correto. A investigação adequada identifica a causa e define o tratamento certo na primeira tentativa.', 1),
('02', 'Dispneia',             'Falta de ar ao esforço ou em repouso.',                                        'A dispneia de esforço — falta de ar ao subir escadas, caminhar rápido ou praticar atividade física — é muitas vezes atribuída ao sedentarismo ou ao envelhecimento. Quando avaliada com o teste cardiopulmonar de exercício (CPET), é possível identificar exatamente se a limitação é pulmonar, cardíaca ou muscular.', 2),
('03', 'Asma',                 'Inflamação crônica das vias aéreas com obstrução variável e reversível.',       'A asma em adultos pode se manifestar de formas atípicas — tosse seca, aperto no peito ou falta de ar sem chiado evidente. O diagnóstico correto exige espirometria com broncodilatador e, em casos selecionados, testes de provocação brônquica. O tratamento bem ajustado permite vida sem limitações.', 3),
('04', 'DPOC',                 'Obstrução progressiva e irreversível ao fluxo de ar, geralmente pelo tabagismo.', 'A doença pulmonar obstrutiva crônica (DPOC) é subdiagnosticada no Brasil. Muitos pacientes só recebem o diagnóstico quando já perderam função pulmonar significativa. O acompanhamento especializado reduz exacerbações, hospitalizations e melhora a qualidade de vida.', 4),
('05', 'Hipertensão Pulmonar', 'Aumento da pressão nas artérias pulmonares.',                                   'A hipertensão pulmonar é uma doença rara e grave que costuma ser confundida com asma ou sedentarismo nos estágios iniciais. O diagnóstico médio leva 2 anos para ser feito. A Dra. Roberta é especialista nessa área e acompanha pacientes com todas as formas da doença, incluindo casos de difícil controle.', 5),
('06', 'Nódulos Pulmonares',   'Achados em tomografia que exigem investigação e seguimento.',                   'O achado de um nódulo pulmonar em tomografia gera ansiedade e dúvidas. A conduta depende de características específicas — tamanho, densidade, localização, histórico de tabagismo. A investigação correta evita tanto a subvalorização de lesões relevantes quanto cirurgias desnecessárias.', 6)
ON CONFLICT DO NOTHING;

-- FAQ
INSERT INTO faqs (pergunta, resposta, ordem) VALUES
('Quando devo consultar um pneumologista?', 'Consulte um pneumologista se você tiver: tosse que persiste por mais de 3 semanas; falta de ar ao fazer esforços simples como subir escadas; chiado ou aperto no peito; infecções pulmonares frequentes (mais de 2 por ano); nódulo identificado em tomografia do tórax; ou diagnóstico de asma, DPOC ou hipertensão pulmonar sem acompanhamento regular.', 1),
('Tosse por mais de 3 semanas é sinal de alerta?', 'Sim. Tosse que persiste por mais de 3 semanas é chamada de tosse subaguda, e acima de 8 semanas é considerada tosse crônica. As causas mais comuns em adultos incluem gotejamento pós-nasal, asma, refluxo gastroesofágico e, menos frequentemente, doenças pulmonares estruturais. A investigação correta com pneumologista evita meses de tratamento empírico incorreto.', 2),
('O que causa falta de ar ao subir escadas ou caminhar rápido?', 'A falta de ar ao esforço pode ter origem pulmonar, cardíaca ou ser consequência de descondicionamento físico. O teste cardiopulmonar de exercício (CPET) avalia o pulmão, o coração e os músculos durante esforço e é o exame mais preciso para identificar a causa.', 3),
('Qual a diferença entre asma e DPOC?', 'Asma é uma doença inflamatória das vias aéreas com obstrução variável e reversível, com boa resposta a broncodilatadores. DPOC é uma obstrução progressiva e irreversível ao fluxo de ar, causada principalmente pelo tabagismo. Ambas podem coexistir no mesmo paciente (síndrome ACO) e têm tratamentos diferentes.', 4),
('Como é uma consulta de pneumologia com a Dra. Roberta?', 'A primeira consulta dura entre 60 e 90 minutos. O histórico clínico é revisado completamente, incluindo todos os exames anteriores, medicamentos em uso e impacto dos sintomas na vida diária. Quando indicado, exames complementares como o CPET são solicitados. Ao final, o paciente recebe explicação clara do diagnóstico e do plano de tratamento.', 5),
('A Dra. Roberta realiza consultas por telemedicina?', 'Sim. A Dra. Roberta Pulcheri Ramos oferece telemedicina para pacientes em qualquer parte do Brasil e do mundo, em português, inglês ou espanhol. Indicada para segunda opinião, revisão de diagnóstico e acompanhamento. Requer envio prévio de exames e histórico clínico.', 6),
('O que é hipertensão pulmonar e quais os sintomas?', 'Hipertensão pulmonar é o aumento da pressão nas artérias que levam sangue aos pulmões. Os principais sintomas são: falta de ar ao esforço (progressiva), fadiga, palpitações e, nos casos avançados, inchaço nas pernas e síncope. É frequentemente confundida com asma ou sedentarismo, e o diagnóstico médio leva 2 anos para ser feito. A Dra. Roberta é especialista nessa área.', 7),
('O que é o teste cardiopulmonar de exercício (CPET)?', 'O CPET avalia simultaneamente o coração, os pulmões e os músculos durante esforço em bicicleta ergométrica. É o único exame capaz de identificar qual sistema está limitando a capacidade ao exercício. Indicado para investigar dispneia sem causa definida, avaliar a gravidade da hipertensão pulmonar e nos casos em que os exames de repouso estão normais mas o paciente continua com sintomas.', 8)
ON CONFLICT DO NOTHING;
