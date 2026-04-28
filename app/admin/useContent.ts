'use client'
import { useState, useEffect, useCallback } from 'react'

export function useContent<T>(key: string, initial: T) {
  const [data, setData]       = useState<T>(initial)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [msg, setMsg]         = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  useEffect(() => {
    fetch(`/api/admin/content?key=${key}`)
      .then(r => r.json())
      .then(d => { if (d && Object.keys(d).length) setData(d) })
      .finally(() => setLoading(false))
  }, [key])

  const save = useCallback(async (value: T) => {
    setSaving(true)
    setMsg(null)
    const res = await fetch(`/api/admin/content?key=${key}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(value),
    })
    setSaving(false)
    if (res.ok) {
      setMsg({ type: 'ok', text: 'Salvo com sucesso!' })
      setData(value)
    } else {
      const err = await res.json()
      setMsg({ type: 'err', text: err.error ?? 'Erro ao salvar' })
    }
    setTimeout(() => setMsg(null), 3000)
  }, [key])

  return { data, setData, loading, saving, msg, save }
}
