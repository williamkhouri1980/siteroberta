import type { Metadata } from 'next'
import './globals.css'
import { SITE_URL, ADDRESS, EMAIL, WHATSAPP_NUMBER } from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  'Pneumologista em São Paulo | Dra. Roberta Pulcheri Ramos',
    template: '%s | Dra. Roberta Pulcheri Ramos — Pneumologista SP',
  },
  description:
    'Pneumologista em São Paulo especializada em tosse crônica, falta de ar, asma e hipertensão pulmonar. Pós-doutorado. Consultas presenciais em São Paulo e telemedicina global. Agende pelo WhatsApp.',
  keywords: [
    'pneumologista São Paulo',
    'pneumologista SP',
    'pneumologista hipertensão pulmonar',
    'tosse crônica São Paulo',
    'falta de ar especialista São Paulo',
    'asma adultos São Paulo',
    'DPOC tratamento São Paulo',
    'teste cardiopulmonar CPET São Paulo',
    'segunda opinião pneumologia',
    'telemedicina pneumologia',
    'Roberta Pulcheri Ramos',
    'pneumologista Jardins São Paulo',
    'dispneia esforço investigação',
    'hipertensão arterial pulmonar HAP',
  ],
  authors: [{ name: 'Dra. Roberta Pulcheri Ramos' }],
  creator:   'Dra. Roberta Pulcheri Ramos',
  publisher: 'Dra. Roberta Pulcheri Ramos',
  alternates: { canonical: '/' },
  openGraph: {
    type:        'website',
    locale:      'pt_BR',
    url:          SITE_URL,
    siteName:    'Dra. Roberta Pulcheri Ramos — Pneumologista SP',
    title:       'Pneumologista em São Paulo | Dra. Roberta Pulcheri Ramos',
    description: 'Especialista em tosse crônica, falta de ar, asma e hipertensão pulmonar. Pós-doutorado. Atende em São Paulo e por telemedicina global.',
    images: [{
      url:    '/og-image.jpg',
      width:  1200,
      height: 630,
      alt:    'Dra. Roberta Pulcheri Ramos — Pneumologista em São Paulo',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Pneumologista em São Paulo | Dra. Roberta Pulcheri Ramos',
    description: 'Especialista em tosse crônica, falta de ar, asma e hipertensão pulmonar. Consultas presenciais em SP e telemedicina.',
    images:      ['/og-image.jpg'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
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
      '@type': ['Physician', 'MedicalBusiness', 'LocalBusiness'],
      '@id': `${SITE_URL}/#physician`,
      name:    'Dra. Roberta Pulcheri Ramos — Pneumologia',
      alternateName: 'Roberta Pulcheri Ramos',
      description:
        'Pneumologista em São Paulo com pós-doutorado, especializada em hipertensão pulmonar, fisiologia do exercício e doenças respiratórias. Avalia o pulmão em movimento para identificar o que exames de repouso não capturam.',
      medicalSpecialty: [
        'Pulmonary Medicine',
        'Hipertensão Pulmonar',
        'Fisiologia do Exercício',
        'Terapia Intensiva',
      ],
      address: {
        '@type':         'PostalAddress',
        streetAddress:   ADDRESS.street,
        addressLocality: ADDRESS.city,
        addressRegion:   ADDRESS.state,
        postalCode:      ADDRESS.cep,
        addressCountry:  'BR',
      },
      geo: {
        '@type':   'GeoCoordinates',
        latitude:  ADDRESS.lat,
        longitude: ADDRESS.lng,
      },
      areaServed: [
        { '@type': 'City', name: 'São Paulo' },
        { '@type': 'Country', name: 'Brasil' },
        { '@type': 'Country', name: 'Global (Telemedicina)' },
      ],
      telephone:      `+${WHATSAPP_NUMBER}`,
      email:           EMAIL,
      url:             SITE_URL,
      openingHours:   ['Mo-Fr 08:00-18:00'],
      priceRange:     '$$',
      availableLanguage: ['Portuguese', 'English', 'Spanish'],
      sameAs: ['http://lattes.cnpq.br/3674430003360595'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Modalidades de Atendimento',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Consulta Presencial — São Paulo',
            description:
              'Atendimento presencial em São Paulo. Primeira consulta de 60 a 90 minutos com revisão completa do histórico, análise de exames e, quando indicado, teste cardiopulmonar de exercício (CPET).',
            areaServed: { '@type': 'City', name: 'São Paulo' },
          },
          {
            '@type': 'Offer',
            name: 'Telemedicina Global',
            description:
              'Consulta online para pacientes em qualquer parte do mundo. 60 minutos. Indicada para segunda opinião, revisão de diagnóstico e acompanhamento.',
            availableLanguage: ['Portuguese', 'English', 'Spanish'],
          },
        ],
      },
      availableService: [
        {
          '@type': 'MedicalTherapy',
          name: 'Diagnóstico e Tratamento de Hipertensão Pulmonar',
          description:
            'Diagnóstico, estratificação e tratamento da hipertensão arterial pulmonar (HAP) e demais formas de hipertensão pulmonar, incluindo casos de difícil controle e diagnósticos tardios.',
          relevantSpecialty: 'Pulmonary Medicine',
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Investigação de Tosse Crônica em São Paulo',
          description:
            'Avaliação especializada de tosse persistente por mais de 8 semanas. Investigação das causas mais comuns: asma, refluxo, gotejamento pós-nasal, infecções e doenças pulmonares estruturais.',
          relevantSpecialty: 'Pulmonary Medicine',
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Investigação de Dispneia — Falta de Ar',
          description:
            'Avaliação de falta de ar ao esforço ou em repouso com teste cardiopulmonar de exercício (CPET), o exame mais completo para identificar a causa da dispneia.',
          relevantSpecialty: 'Pulmonary Medicine',
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Teste Cardiopulmonar de Exercício (CPET)',
          description:
            'Avaliação da capacidade ao exercício com análise simultânea do sistema cardiovascular, respiratório e metabólico. Identifica a causa da falta de ar e limitação funcional que exames de repouso não detectam.',
          relevantSpecialty: 'Pulmonary Medicine',
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Segunda Opinião em Pneumologia',
          description:
            'Revisão de diagnósticos inconclusivos, sintomas inexplicados ou condutas em andamento. Disponível presencialmente em São Paulo e por telemedicina.',
          relevantSpecialty: 'Pulmonary Medicine',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url:         SITE_URL,
      name:        'Dra. Roberta Pulcheri Ramos — Pneumologista em São Paulo',
      description: 'Site oficial da Dra. Roberta Pulcheri Ramos — Pneumologista especializada em doenças respiratórias em São Paulo.',
      inLanguage:  'pt-BR',
      publisher:   { '@id': `${SITE_URL}/#physician` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quando devo consultar um pneumologista?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Consulte um pneumologista se você tiver: tosse que persiste por mais de 3 semanas; falta de ar ao fazer esforços simples como subir escadas; chiado ou aperto no peito; infecções pulmonares frequentes (mais de 2 por ano); nódulo identificado em tomografia do tórax; ou diagnóstico de asma, DPOC ou hipertensão pulmonar sem acompanhamento regular.',
          },
        },
        {
          '@type': 'Question',
          name: 'Tosse por mais de 3 semanas é sinal de alerta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Tosse que persiste por mais de 3 semanas é chamada de tosse subaguda, e acima de 8 semanas é considerada tosse crônica. As causas mais comuns em adultos incluem gotejamento pós-nasal, asma, refluxo gastroesofágico e, menos frequentemente, doenças pulmonares estruturais. A investigação correta com pneumologista evita meses de tratamento empírico incorreto.',
          },
        },
        {
          '@type': 'Question',
          name: 'O que causa falta de ar ao subir escadas ou caminhar rápido?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A falta de ar ao esforço pode ter origem pulmonar, cardíaca ou ser consequência de descondicionamento físico. O teste cardiopulmonar de exercício (CPET) avalia o pulmão, o coração e os músculos durante esforço e é o exame mais preciso para identificar a causa.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual a diferença entre asma e DPOC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Asma é uma doença inflamatória das vias aéreas com obstrução variável e reversível, com boa resposta a broncodilatadores. DPOC é uma obstrução progressiva e irreversível ao fluxo de ar, causada principalmente pelo tabagismo. Ambas podem coexistir no mesmo paciente (síndrome ACO) e têm tratamentos diferentes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como é uma consulta de pneumologia com a Dra. Roberta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A primeira consulta dura entre 60 e 90 minutos. O histórico clínico é revisado completamente, incluindo todos os exames anteriores, medicamentos em uso e impacto dos sintomas na vida diária. Quando indicado, exames complementares como o CPET são solicitados. Ao final, o paciente recebe explicação clara do diagnóstico e do plano de tratamento.',
          },
        },
        {
          '@type': 'Question',
          name: 'A Dra. Roberta realiza consultas por telemedicina?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. A Dra. Roberta Pulcheri Ramos oferece telemedicina para pacientes em qualquer parte do Brasil e do mundo, em português, inglês ou espanhol. Indicada para segunda opinião, revisão de diagnóstico e acompanhamento. Requer envio prévio de exames e histórico clínico.',
          },
        },
        {
          '@type': 'Question',
          name: 'O que é hipertensão pulmonar e quais os sintomas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hipertensão pulmonar é o aumento da pressão nas artérias que levam sangue aos pulmões. Os principais sintomas são: falta de ar ao esforço (progressiva), fadiga, palpitações e, nos casos avançados, inchaço nas pernas e síncope. É frequentemente confundida com asma ou sedentarismo, e o diagnóstico médio leva 2 anos para ser feito. A Dra. Roberta é especialista nessa área.',
          },
        },
        {
          '@type': 'Question',
          name: 'O que é o teste cardiopulmonar de exercício (CPET)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O CPET avalia simultaneamente o coração, os pulmões e os músculos durante esforço em bicicleta ergométrica. É o único exame capaz de identificar qual sistema está limitando a capacidade ao exercício. Indicado para investigar dispneia sem causa definida, avaliar a gravidade da hipertensão pulmonar e nos casos em que os exames de repouso estão normais mas o paciente continua com sintomas.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [{
        '@type':    'ListItem',
        position:   1,
        name:       'Pneumologista em São Paulo',
        item:        SITE_URL,
      }],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
