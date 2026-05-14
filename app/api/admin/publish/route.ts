import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase'

// PUT /api/admin/publish?key=hero  — publica o rascunho (copia draft → value)
export async function PUT(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key) return NextResponse.json({ error: 'key obrigatório' }, { status: 400 })

  const value = await req.json()

  const { error } = await supabaseAdmin
    .from('site_content')
    .upsert({ key, value, draft: value }, { onConflict: 'key' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Invalida o cache do Next.js para que o site reflita imediatamente
  revalidatePath('/', 'layout')

  return NextResponse.json({ ok: true })
}
