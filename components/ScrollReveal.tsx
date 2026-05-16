'use client'
import { useEffect } from 'react'

/**
 * Observa todas as <section id="..."> exceto #hero e aplica fade-in
 * quando entram no viewport. SSR-safe: sem JS todas as seções ficam
 * visíveis normalmente (data-scroll-ready nunca é adicionado).
 */
export default function ScrollReveal() {
  useEffect(() => {
    // Sinaliza ao CSS que o JS está ativo
    document.documentElement.setAttribute('data-scroll-ready', '')

    const sections = document.querySelectorAll('section[id]:not(#hero)')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', '')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.07, rootMargin: '0px 0px -32px 0px' }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return null
}
