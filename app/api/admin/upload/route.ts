import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const file = form.get('file') as File | null

  if (!file) return NextResponse.json({ error: 'Arquivo obrigatório' }, { status: 400 })

  const ext      = file.name.split('.').pop()
  const filename = `hero-foto.${ext}`
  const buffer   = Buffer.from(await file.arrayBuffer())

  const { error } = await supabaseAdmin.storage
    .from('site-images')
    .upload(filename, buffer, {
      contentType: file.type,
      upsert:      true,
    })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data } = supabaseAdmin.storage
    .from('site-images')
    .getPublicUrl(filename)

  return NextResponse.json({ url: data.publicUrl })
}
