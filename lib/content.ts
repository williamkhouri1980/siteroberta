import { supabaseAdmin } from './supabase'
import {
  WHATSAPP_NUMBER, WHATSAPP_MESSAGE, EMAIL, CRM, LATTES_URL, SITE_URL, ADDRESS, MAPS_EMBED_URL
} from './constants'

// Busca um singleton do Supabase com fallback para o valor default
async function getSection<T>(key: string, fallback: T): Promise<T> {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .select('value')
      .eq('key', key)
      .single()

    if (error || !data?.value || Object.keys(data.value).length === 0) return fallback
    return data.value as T
  } catch {
    return fallback
  }
}

// ── Config ────────────────────────────────────────────────────────────────────
export type ConfigData = {
  whatsapp:  string
  email:     string
  crm:       string
  siteUrl:   string
  lattesUrl: string
}

export async function getConfig(): Promise<ConfigData> {
  return getSection<ConfigData>('config', {
    whatsapp:  WHATSAPP_NUMBER,
    email:     EMAIL,
    crm:       CRM,
    siteUrl:   SITE_URL,
    lattesUrl: LATTES_URL,
  })
}

// ── Endereço ──────────────────────────────────────────────────────────────────
export type EnderecoData = {
  rua:          string
  bairro:       string
  cidade:       string
  estado:       string
  cep:          string
  horarios:     string
  mapsEmbedUrl: string
}

export async function getEndereco(): Promise<EnderecoData> {
  return getSection<EnderecoData>('endereco', {
    rua:          ADDRESS.street,
    bairro:       ADDRESS.neighborhood,
    cidade:       ADDRESS.city,
    estado:       ADDRESS.state,
    cep:          ADDRESS.cep,
    horarios:     'Segunda a Sexta, 08h às 18h',
    mapsEmbedUrl: MAPS_EMBED_URL,
  })
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export type HeroData = {
  eyebrow:       string
  h1:            string
  corpo:         string
  ctaPrimario:   string
  ctaSecundario: string
}

export async function getHero(): Promise<HeroData> {
  return getSection<HeroData>('hero', {
    eyebrow:       'Pneumologia · São Paulo · Telemedicina Global',
    h1:            'Pneumologista em São Paulo especializada em doenças respiratórias',
    corpo:         'Diagnóstico preciso para tosse crônica, falta de ar, asma e hipertensão pulmonar.',
    ctaPrimario:   'Agendar consulta',
    ctaSecundario: 'Como funciona',
  })
}

// ── Quando Consultar ──────────────────────────────────────────────────────────
export type Sinal = { titulo: string; desc: string }
export type QuandoConsultarData = { heading: string; lead: string; sinais: Sinal[] }

export async function getQuandoConsultar(): Promise<QuandoConsultarData> {
  return getSection<QuandoConsultarData>('quando_consultar', {
    heading: 'Quando devo procurar um pneumologista?',
    lead:    'Alguns sintomas indicam que é hora de uma avaliação especializada.',
    sinais:  [],
  })
}

// ── Sobre ─────────────────────────────────────────────────────────────────────
export type SobreData = {
  heading:     string
  paragrafos:  string[]
  credenciais: string[]
  lattesUrl:   string
}

export async function getSobre(): Promise<SobreData> {
  return getSection<SobreData>('sobre', {
    heading:     'Diagnóstico que vai além do exame de repouso.',
    paragrafos:  [],
    credenciais: [],
    lattesUrl:   LATTES_URL,
  })
}

// ── Como Funciona ─────────────────────────────────────────────────────────────
export type Passo = { titulo: string; desc: string }
export type ComoFuncionaData = { heading: string; lead: string; passos: Passo[] }

export async function getComoFunciona(): Promise<ComoFuncionaData> {
  return getSection<ComoFuncionaData>('como_funciona', {
    heading: 'Como funciona uma consulta de pneumologia',
    lead:    '',
    passos:  [],
  })
}

// ── Reconhecimento ────────────────────────────────────────────────────────────
export type Stat       = { num: string; label: string }
export type Diferencial = { titulo: string; desc: string }
export type ReconhecimentoData = { stats: Stat[]; diferenciais: Diferencial[] }

export async function getReconhecimento(): Promise<ReconhecimentoData> {
  return getSection<ReconhecimentoData>('reconhecimento', {
    stats:        [],
    diferenciais: [],
  })
}

// ── CTA ───────────────────────────────────────────────────────────────────────
export type CtaData = { heading: string; subtitulo: string }

export async function getCta(): Promise<CtaData> {
  return getSection<CtaData>('cta', {
    heading:   'Pronto para ter uma resposta fundamentada?',
    subtitulo: 'Agende sua consulta pelo WhatsApp.',
  })
}

// ── SEO ───────────────────────────────────────────────────────────────────────
export type SeoData = {
  title:         string
  description:   string
  ogTitle:       string
  ogDescription: string
  keywords:      string[]
}

export async function getSeo(): Promise<SeoData> {
  return getSection<SeoData>('seo', {
    title:         'Pneumologista em São Paulo | Dra. Roberta Pulcheri Ramos',
    description:   'Pneumologista em São Paulo especializada em tosse crônica, falta de ar, asma e hipertensão pulmonar.',
    ogTitle:       'Pneumologista em São Paulo | Dra. Roberta Pulcheri Ramos',
    ogDescription: 'Especialista em tosse crônica, falta de ar, asma e hipertensão pulmonar.',
    keywords:      [],
  })
}

// ── Coleções ──────────────────────────────────────────────────────────────────
export type Condicao = {
  id:        string
  num:       string
  nome:      string
  definicao: string
  descricao: string
  ordem:     number
}

export async function getCondicoes(): Promise<Condicao[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('condicoes')
      .select('*')
      .order('ordem')

    if (error || !data?.length) return []
    return data as Condicao[]
  } catch {
    return []
  }
}

export type FaqItem = { id: string; pergunta: string; resposta: string; ordem: number }

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('faqs')
      .select('*')
      .order('ordem')

    if (error || !data?.length) return []
    return data as FaqItem[]
  } catch {
    return []
  }
}
