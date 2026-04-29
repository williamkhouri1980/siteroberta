'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { WHATSAPP_URL } from '@/lib/constants'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="main-nav">
        <Link className="nav-brand" href="#hero">
          <span className="nav-dra">Dra.</span>
          <span className="nav-name">Roberta Pulcheri Ramos</span>
        </Link>

        <ul className="nav-links">
          <li><a href="#quando-consultar">Quando consultar</a></li>
          <li><a href="#condicoes">Condições</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              Agendar
            </a>
          </li>
        </ul>

        <button
          className={`nav-toggle${open ? ' open' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </nav>

      <nav className={`nav-drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <a href="#quando-consultar" onClick={closeMenu}>Quando consultar</a>
        <a href="#condicoes"        onClick={closeMenu}>Condições tratadas</a>
        <a href="#sobre"            onClick={closeMenu}>Sobre</a>
        <a href="#como-funciona"    onClick={closeMenu}>Como funciona</a>
        <a href="#faq"              onClick={closeMenu}>FAQ</a>
        <a href="#localizacao"      onClick={closeMenu}>Localização</a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-drawer-cta"
          onClick={closeMenu}
        >
          Agendar consulta
        </a>
      </nav>
    </>
  )
}
