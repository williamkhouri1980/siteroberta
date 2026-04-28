// ─── SUBSTITUA OS VALORES ABAIXO ANTES DO DEPLOY ───────────────────────────

export const WHATSAPP_NUMBER = '5511999999999' // Ex: 5511912345678
export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Olá! Gostaria de agendar uma consulta com a Dra. Roberta Pulcheri Ramos.'
)
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

export const EMAIL = 'contato@robertaramos.med.br'
export const CRM   = 'CRM/SP XXXXXX' // Substituir pelo CRM real

export const LATTES_URL = 'http://lattes.cnpq.br/3674430003360595'

export const SITE_URL = 'https://www.robertaramos.med.br'

// Endereço — preencher após confirmar localização do consultório
export const ADDRESS = {
  street:       'Rua XXXXXXX, 000 — cj. 00',
  neighborhood: 'Jardins',
  city:         'São Paulo',
  state:        'SP',
  cep:          '01000-000',
  full:         'Rua XXXXXXX, 000 — Jardins, São Paulo/SP',
  mapsQuery:    'Pneumologista+São+Paulo+Jardins',
}

// Google Maps embed — substituir pelo iframe da sua localização
// Para gerar: maps.google.com → Compartilhar → Incorporar um mapa
export const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117744.33!2d-46.6696!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2sSão%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1000000000000'
