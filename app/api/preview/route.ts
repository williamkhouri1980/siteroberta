import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const action   = searchParams.get('action') ?? 'enable'
  const redirect = searchParams.get('redirect') ?? '/'

  const draft = await draftMode()

  if (action === 'disable') {
    draft.disable()
    return NextResponse.redirect(new URL('/', req.url))
  }

  draft.enable()
  return NextResponse.redirect(new URL(redirect, req.url))
}
