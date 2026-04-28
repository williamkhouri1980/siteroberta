import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://www.robertaramos.med.br'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dra. Roberta Pulcheri Ramos | Pneumologia e Hipertensão Pulmonar',
    template: '%s | Dra. Roberta Pulcheri Ramos',
  },
  description:
    'Pneumologista especializada em hipertensão pulmonar e fisiologia do exercício. Atendimento presencial no Brasil e telemedicina global. Pós-doutorado, pesquisa clínica e segunda opinião para casos complexos.',
  keywords: [
    'pneumologista',
    'hipertensão pulmonar',
    'fisiologia do exercício',
    'teste cardiopulmonar',
    'CPET',
    'telemedicina pneumologia',
    'segunda opinião pneumologia',
    'Roberta Pulcheri Ramos',
    'pneumologia Brasil',
    'dispneia ao esforço',
    'hipertensão arterial pulmonar',
    'HAP',
  ],
  authors: [{ name: 'Dra. Roberta Pulcheri Ramos' }],
  creator: 'Dra. Roberta Pulcheri Ramos',
  publisher: 'Dra. Roberta Pulcheri Ramos',
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Dra. Roberta Pulcheri Ramos',
    title: 'Dra. Roberta Pulcheri Ramos | Pneumologia e Hipertensão Pulmonar',
    description:
      'Pneumologista com pós-doutorado especializada em hipertensão pulmonar e fisiologia do exercício. Atendimento presencial no Brasil e telemedicina global em português, inglês e espanhol.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dra. Roberta Pulcheri Ramos — Pneumologia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dra. Roberta Pulcheri Ramos | Pneumologia e Hipertensão Pulmonar',
    description:
      'Pneumologista especializada em hipertensão pulmonar e fisiologia do exercício. Telemedicina global.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GOOGLE_SEARCH_CONSOLE_TOKEN',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Physician',
      '@id': `${SITE_URL}/#physician`,
      name: 'Dra. Roberta Pulcheri Ramos',
      givenName: 'Roberta',
      familyName: 'Pulcheri Ramos',
      honorificPrefix: 'Dra.',
      description:
        'Pneumologista com pós-doutorado especializada em hipertensão pulmonar, fisiologia clínica do exercício e terapia intensiva. Avalia o pulmão em movimento — não apenas em repouso — identificando alterações que exames convencionais não capturam.',
      medicalSpecialty: [
        'https://schema.org/Pulmonary',
        'Hipertensão Pulmonar',
        'Fisiologia do Exercício',
        'Terapia Intensiva',
      ],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Pós-doutorado em Pneumologia',
      },
      sameAs: ['http://lattes.cnpq.br/3674430003360595'],
      url: SITE_URL,
      email: 'contato@robertaramos.med.br',
      availableService: [
        {
          '@type': 'MedicalTherapy',
          name: 'Hipertensão Pulmonar',
          description:
            'Diagnóstico, estratificação e tratamento da hipertensão arterial pulmonar e demais formas de HP, incluindo casos de difícil controle e diagnósticos tardios.',
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Fisiologia do Exercício — Teste Cardiopulmonar (CPET)',
          description:
            'Avaliação da capacidade ao exercício por teste cardiopulmonar. Investigação de dispneia ao esforço, limitação funcional e respostas hemodinâmicas que não aparecem em exames de repouso.',
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Segunda Opinião em Pneumologia',
          description:
            'Revisão de casos com diagnóstico inconclusivo, sintomas inexplicados ou insatisfação com condutas em andamento. Fundamentada em evidências, disponível em português, inglês e espanhol.',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Modalidades de Atendimento',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Consulta Presencial — Brasil',
            description:
              'Atendimento presencial no Brasil com tempo dedicado ao caso. Inclui revisão de histórico, análise de exames e, quando indicado, teste cardiopulmonar de exercício.',
          },
          {
            '@type': 'Offer',
            name: 'Telemedicina Global',
            description:
              'Consulta por telemedicina para pacientes em qualquer parte do mundo. Conduzida em português, inglês ou espanhol. Indicada para segunda opinião e revisão de diagnóstico.',
            availableLanguage: ['Portuguese', 'English', 'Spanish'],
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Dra. Roberta Pulcheri Ramos',
      description: 'Site oficial da Dra. Roberta Pulcheri Ramos — Pneumologia e Hipertensão Pulmonar',
      inLanguage: 'pt-BR',
      publisher: { '@id': `${SITE_URL}/#physician` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é hipertensão pulmonar e como é tratada?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hipertensão pulmonar é o aumento da pressão nas artérias dos pulmões, podendo causar falta de ar, fadiga e limitação funcional progressiva. A Dra. Roberta Pulcheri Ramos especializa-se no diagnóstico, estratificação e tratamento de todas as formas de HP — incluindo hipertensão arterial pulmonar (HAP), HP tromboembólica crônica e casos de difícil controle.',
          },
        },
        {
          '@type': 'Question',
          name: 'O que é o teste cardiopulmonar de exercício (CPET)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O teste cardiopulmonar de exercício (CPET) avalia simultaneamente as respostas cardiovascular, respiratória e metabólica ao esforço. Permite identificar a causa exata da dispneia ao esforço e alterações hemodinâmicas que não aparecem em exames de repouso — como espirometria ou ecocardiograma padrão. É uma ferramenta essencial no diagnóstico de hipertensão pulmonar e limitação funcional inexplicada.',
          },
        },
        {
          '@type': 'Question',
          name: 'A Dra. Roberta Pulcheri Ramos atende pacientes internacionais por telemedicina?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. A Dra. Roberta oferece consultas por telemedicina para pacientes em qualquer parte do mundo, em português, inglês ou espanhol. O atendimento é indicado para segunda opinião, revisão de diagnóstico e orientação terapêutica, com duração de 60 minutos. É necessário enviar exames e histórico clínico com antecedência.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quais são as especialidades da Dra. Roberta Pulcheri Ramos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Dra. Roberta Pulcheri Ramos é pneumologista com formação até pós-doutorado, com atuação clínica focada em: (1) Hipertensão Pulmonar — diagnóstico, estratificação e tratamento; (2) Fisiologia do Exercício — avaliação pelo teste cardiopulmonar (CPET); (3) Segunda Opinião — para casos com diagnóstico inconclusivo ou sintomas inexplicados; e (4) Terapia Intensiva. Sua diferencial é integrar a avaliação do pulmão em movimento na prática clínica diária.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como agendar uma consulta com a Dra. Roberta Pulcheri Ramos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Para agendar uma consulta, entre em contato pelo e-mail contato@robertaramos.med.br. Atendimentos presenciais são realizados no Brasil. Para pacientes em outros países, a telemedicina está disponível em português, inglês e espanhol. Consultas iniciais têm duração de 60 a 90 minutos.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
