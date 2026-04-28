import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/admin/content?key=hero
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key) return NextResponse.json({ error: 'key obrigatório' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('site_content')
    .select('value')
    .eq('key', key)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data?.value ?? {})
}

// PUT /api/admin/content?key=hero  body: { ...fields }
export async function PUT(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key) return NextResponse.json({ error: 'key obrigatório' }, { status: 400 })

  const value = await req.json()

  const { error } = await supabaseAdmin
    .from('site_content')
    .upsert({ key, value }, { onConflict: 'key' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
