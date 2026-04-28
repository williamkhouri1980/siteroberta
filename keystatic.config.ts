import { config, fields, singleton, collection } from '@keystatic/core'

const hasGithubCreds = Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID)

export default config({
  storage: hasGithubCreds
    ? {
        kind: 'github',
        repo: {
          owner: process.env.NEXT_PUBLIC_GITHUB_OWNER ?? 'GITHUB_OWNER',
          name: process.env.NEXT_PUBLIC_GITHUB_REPO ?? 'roberta-ramos-site',
        },
      }
    : { kind: 'local' },

  ui: {
    brand: {
      name: 'Dra. Roberta Ramos — CMS',
    },
  },

  singletons: {
    hero: singleton({
      label: 'Hero — Seção Principal',
      path: 'content/hero',
      schema: {
        eyebrow: fields.text({
          label: 'Eyebrow (especialidades)',
          defaultValue: 'Pneumologia · Hipertensão Pulmonar · Fisiologia do Exercício',
        }),
        heading: fields.text({
          label: 'Título principal (H1)',
          multiline: true,
          defaultValue: 'O pulmão revela\no que o repouso\nnão mostra.',
        }),
        body: fields.text({
          label: 'Texto de apoio',
          multiline: true,
        }),
        ctaPrimary: fields.text({ label: 'Botão primário', defaultValue: 'Agendar consulta' }),
        ctaSecondary: fields.text({ label: 'Botão secundário', defaultValue: 'Telemedicina global' }),
      },
    }),

    sobre: singleton({
      label: 'Sobre — Seção Sobre',
      path: 'content/sobre',
      schema: {
        heading: fields.text({
          label: 'Título da seção',
          multiline: true,
          defaultValue: 'Uma visão que\npoucos especialistas\nno mundo possuem.',
        }),
        paragraphs: fields.array(
          fields.text({ label: 'Parágrafo', multiline: true }),
          { label: 'Parágrafos', itemLabel: (props) => (props.value?.slice(0, 60) ?? '') + '…' }
        ),
        credentials: fields.array(
          fields.text({ label: 'Credencial' }),
          { label: 'Credenciais', itemLabel: (props) => props.value ?? '' }
        ),
        lattesUrl: fields.url({ label: 'URL Currículo Lattes' }),
      },
    }),

    atendimento: singleton({
      label: 'Atendimento — Modalidades',
      path: 'content/atendimento',
      schema: {
        presencial: fields.object({
          label: fields.text({ label: 'Rótulo', defaultValue: 'Presencial' }),
          title: fields.text({ label: 'Título', multiline: true }),
          body: fields.text({ label: 'Descrição', multiline: true }),
          localizacao: fields.text({ label: 'Localização', defaultValue: 'Brasil' }),
          duracao: fields.text({ label: 'Duração', defaultValue: '60–90 minutos (primeira consulta)' }),
          indicado: fields.text({ label: 'Indicado para', multiline: true }),
        }, { label: 'Consulta Presencial' }),
        telemedicina: fields.object({
          label: fields.text({ label: 'Rótulo', defaultValue: 'Telemedicina' }),
          title: fields.text({ label: 'Título', multiline: true }),
          body: fields.text({ label: 'Descrição', multiline: true }),
          idiomas: fields.text({ label: 'Idiomas', defaultValue: 'Português · Inglês · Espanhol' }),
          duracao: fields.text({ label: 'Duração', defaultValue: '60 minutos' }),
          indicado: fields.text({ label: 'Indicado para', multiline: true }),
        }, { label: 'Telemedicina' }),
      },
    }),

    cta: singleton({
      label: 'CTA — Seção Agendar',
      path: 'content/cta',
      schema: {
        heading: fields.text({
          label: 'Título',
          multiline: true,
          defaultValue: 'Pronto para uma\nresposta fundamentada?',
        }),
        sub: fields.text({
          label: 'Subtítulo',
          multiline: true,
        }),
        email: fields.text({
          label: 'Email de contato',
          defaultValue: 'contato@robertaramos.med.br',
        }),
      },
    }),
  },

  collections: {
    especialidades: collection({
      label: 'Especialidades',
      path: 'content/especialidades/*',
      slugField: 'title',
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        num: fields.text({ label: 'Número (ex: 01)' }),
        description: fields.text({ label: 'Descrição', multiline: true }),
        order: fields.integer({ label: 'Ordem de exibição' }),
      },
    }),

    faqs: collection({
      label: 'FAQ — Perguntas Frequentes',
      path: 'content/faqs/*',
      slugField: 'question',
      schema: {
        question: fields.slug({ name: { label: 'Pergunta' } }),
        answer: fields.text({ label: 'Resposta', multiline: true }),
        order: fields.integer({ label: 'Ordem de exibição' }),
      },
    }),
  },
})
