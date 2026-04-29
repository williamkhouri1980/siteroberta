'use client'
import { useState, useEffect, useCallback } from 'react'

export type SaveStatus = 'idle' | 'saving-draft' | 'publishing' | 'saved-draft' | 'published' | 'error'

export function useContent<T>(key: string, initial: T) {
  const [data, setData]         = useState<T>(initial)
  const [published, setPublished] = useState<T>(initial)
  const [hasDraft, setHasDraft] = useState(false)
  const [loading, setLoading]   = useState(true)
  const [status, setStatus]     = useState<SaveStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetch(`/api/admin/content?key=${key}`)
      .then(r => r.json())
      .then(d => {
        if (d && Object.keys(d).length) {
          setData(d)
          setPublished(d)
        }
      })
      .finally(() => setLoading(false))
  }, [key])

  const saveDraft = useCallback(async (value: T) => {
    setStatus('saving-draft')
    const res = await fetch(`/api/admin/draft?key=${key}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(value),
    })
    if (res.ok) {
      setData(value)
      setHasDraft(true)
      setStatus('saved-draft')
    } else {
      const e = await res.json()
      setErrorMsg(e.error ?? 'Erro ao salvar')
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 3000)
  }, [key])

  const publish = useCallback(async (value: T) => {
    setStatus('publishing')
    const res = await fetch(`/api/admin/publish?key=${key}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(value),
    })
    if (res.ok) {
      setData(value)
      setPublished(value)
      setHasDraft(false)
      setStatus('published')
    } else {
      const e = await res.json()
      setErrorMsg(e.error ?? 'Erro ao publicar')
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 3000)
  }, [key])

  return { data, setData, published, hasDraft, loading, status, errorMsg, saveDraft, publish }
}
