import { config, fields, singleton, collection } from '@keystatic/core'

const hasGithubCreds = Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID)

export default config({
  storage: hasGithubCreds
    ? {
        kind: 'github',
        repo: {
          owner: process.env.NEXT_PUBLIC_GITHUB_OWNER ?? 'GITHUB_OWNER',
          name:  process.env.NEXT_PUBLIC_GITHUB_REPO  ?? 'siteroberta',
        },
        branchPrefix: 'cms/',
      }
    : { kind: 'local' },

  ui: {
    brand: { name: 'Dra. Roberta Ramos — CMS' },
  },

  singletons: {

    // ── CONFIGURAÇÃO GLOBAL ───────────────────────────────────────────────
    config: singleton({
      label: 'Configuração Global',
      path: 'content/config',
      schema: {
        whatsappNumber: fields.text({
          label: 'Número do WhatsApp (apenas dígitos, com DDI)',
          description: 'Ex: 5511912345678',
          defaultValue: '5511999999999',
        }),
        email: fields.text({
          label: 'E-mail de contato',
          defaultValue: 'contato@robertaramos.med.br',
        }),
        crm: fields.text({
          label: 'CRM (ex: CRM/SP 123456)',
          defaultValue: 'CRM/SP XXXXXX',
        }),
        siteUrl: fields.url({ label: 'URL do site' }),
        googleVerificationToken: fields.text({
          label: 'Google Search Console — token de verificação',
        }),
      },
    }),

    // ── ENDEREÇO ─────────────────────────────────────────────────────────
    endereco: singleton({
      label: 'Endereço do Consultório',
      path: 'content/endereco',
      schema: {
        rua:    fields.text({ label: 'Rua e número', defaultValue: 'Rua XXXXXXX, 000' }),
        bairro: fields.text({ label: 'Bairro',       defaultValue: 'Jardins' }),
        cidade: fields.text({ label: 'Cidade',       defaultValue: 'São Paulo' }),
        estado: fields.text({ label: 'Estado',       defaultValue: 'SP' }),
        cep:    fields.text({ label: 'CEP',          defaultValue: '01000-000' }),
        mapsEmbedUrl: fields.url({
          label: 'URL do embed do Google Maps',
          description: 'maps.google.com → Compartilhar → Incorporar um mapa → copiar a URL do src',
        }),
        horarios: fields.text({
          label: 'Horário de funcionamento',
          defaultValue: 'Segunda a Sexta, 08h às 18h',
        }),
      },
    }),

    // ── HERO ─────────────────────────────────────────────────────────────
    hero: singleton({
      label: 'Hero — Seção Principal',
      path: 'content/hero',
      schema: {
        eyebrow: fields.text({
          label: 'Texto acima do título (eyebrow)',
          defaultValue: 'Pneumologia · São Paulo · Telemedicina Global',
        }),
        h1: fields.text({
          label: 'Título principal (H1)',
          multiline: true,
          defaultValue: 'Pneumologista em São Paulo especializada em doenças respiratórias',
        }),
        corpo: fields.text({
          label: 'Parágrafo de apoio',
          multiline: true,
          defaultValue: 'Diagnóstico preciso para tosse crônica, falta de ar, asma e hipertensão pulmonar.',
        }),
        ctaPrimario:   fields.text({ label: 'CTA primário (WhatsApp)', defaultValue: 'Agendar consulta' }),
        ctaSecundario: fields.text({ label: 'CTA secundário',          defaultValue: 'Como funciona' }),
      },
    }),

    // ── QUANDO CONSULTAR ─────────────────────────────────────────────────
    quandoConsultar: singleton({
      label: 'Quando Consultar — Sinais de Alerta',
      path: 'content/quando-consultar',
      schema: {
        heading: fields.text({
          label: 'Título da seção',
          defaultValue: 'Quando devo procurar um pneumologista?',
        }),
        lead: fields.text({
          label: 'Parágrafo de introdução',
          multiline: true,
        }),
        sinais: fields.array(
          fields.object({
            titulo: fields.text({ label: 'Título do sinal' }),
            desc:   fields.text({ label: 'Descrição', multiline: true }),
          }, { label: 'Sinal de alerta' }),
          {
            label: 'Sinais de alerta',
            itemLabel: (props) => props.fields.titulo.value ?? 'Sinal',
          }
        ),
      },
    }),

    // ── SOBRE ────────────────────────────────────────────────────────────
    sobre: singleton({
      label: 'Sobre — A Especialista',
      path: 'content/sobre',
      schema: {
        heading: fields.text({
          label: 'Título',
          multiline: true,
          defaultValue: 'Diagnóstico que vai além do exame de repouso.',
        }),
        paragrafos: fields.array(
          fields.text({ label: 'Parágrafo', multiline: true }),
          { label: 'Parágrafos', itemLabel: (props) => (props.value?.slice(0, 55) ?? '') + '…' }
        ),
        credenciais: fields.array(
          fields.text({ label: 'Credencial' }),
          { label: 'Credenciais', itemLabel: (props) => props.value ?? '' }
        ),
        lattesUrl: fields.url({ label: 'URL Currículo Lattes' }),
      },
    }),

    // ── COMO FUNCIONA ────────────────────────────────────────────────────
    comoFunciona: singleton({
      label: 'Como Funciona — Processo',
      path: 'content/como-funciona',
      schema: {
        heading: fields.text({
          label: 'Título',
          defaultValue: 'Como funciona uma consulta de pneumologia',
        }),
        lead: fields.text({ label: 'Introdução', multiline: true }),
        passos: fields.array(
          fields.object({
            titulo: fields.text({ label: 'Nome do passo' }),
            desc:   fields.text({ label: 'Descrição', multiline: true }),
          }, { label: 'Passo' }),
          {
            label: 'Passos',
            itemLabel: (props) => props.fields.titulo.value ?? 'Passo',
          }
        ),
      },
    }),

    // ── CTA ──────────────────────────────────────────────────────────────
    cta: singleton({
      label: 'CTA — Seção Agendar',
      path: 'content/cta',
      schema: {
        heading: fields.text({
          label: 'Título',
          multiline: true,
          defaultValue: 'Pronto para ter uma resposta fundamentada?',
        }),
        subtitulo: fields.text({
          label: 'Subtítulo',
          multiline: true,
        }),
      },
    }),

    // ── SEO ──────────────────────────────────────────────────────────────
    seo: singleton({
      label: 'SEO — Metadados',
      path: 'content/seo',
      schema: {
        title:       fields.text({ label: 'Title tag' }),
        description: fields.text({ label: 'Meta description', multiline: true }),
      },
    }),
  },

  collections: {
    // ── CONDIÇÕES ────────────────────────────────────────────────────────
    condicoes: collection({
      label: 'Condições Tratadas',
      path: 'content/condicoes/*',
      slugField: 'nome',
      schema: {
        nome:      fields.slug({ name: { label: 'Nome da condição' } }),
        num:       fields.text({ label: 'Número (ex: 01)' }),
        definicao: fields.text({ label: 'Definição breve (1 linha)', multiline: false }),
        descricao: fields.text({ label: 'Descrição completa', multiline: true }),
        ordem:     fields.integer({ label: 'Ordem de exibição' }),
      },
    }),

    // ── FAQ ──────────────────────────────────────────────────────────────
    faqs: collection({
      label: 'FAQ — Perguntas Frequentes',
      path: 'content/faqs/*',
      slugField: 'pergunta',
      schema: {
        pergunta: fields.slug({ name: { label: 'Pergunta' } }),
        resposta: fields.text({ label: 'Resposta completa', multiline: true }),
        ordem:    fields.integer({ label: 'Ordem de exibição' }),
      },
    }),

    // ── ESPECIALIDADES ───────────────────────────────────────────────────
    especialidades: collection({
      label: 'Especialidades (seção avançada)',
      path: 'content/especialidades/*',
      slugField: 'titulo',
      schema: {
        titulo:    fields.slug({ name: { label: 'Título' } }),
        num:       fields.text({ label: 'Número' }),
        descricao: fields.text({ label: 'Descrição', multiline: true }),
        ordem:     fields.integer({ label: 'Ordem' }),
      },
    }),
  },
})
