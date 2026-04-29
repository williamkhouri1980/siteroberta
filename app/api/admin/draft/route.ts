import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// PUT /api/admin/draft?key=hero  — salva como rascunho (não afeta o site ao vivo)
export async function PUT(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key) return NextResponse.json({ error: 'key obrigatório' }, { status: 400 })

  const draft = await req.json()

  const { error } = await supabaseAdmin
    .from('site_content')
    .upsert({ key, value: draft, draft }, { onConflict: 'key' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
