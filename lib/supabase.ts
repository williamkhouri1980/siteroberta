import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const svc  = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side (anon key, RLS applies)
export const supabase = createClient(url, anon)

// Server-side (service role, bypasses RLS — use only in API routes / server components)
export const supabaseAdmin = createClient(url, svc, {
  auth: { persistSession: false },
})
