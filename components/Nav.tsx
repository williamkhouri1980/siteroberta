'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
          <span className="nav-name">
            <span className="nav-name-short">Roberta Ramos</span>
            <span className="nav-name-full">Roberta Pulcheri Ramos</span>
          </span>
        </Link>

        <ul className="nav-links">
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#especialidades">Especialidades</a></li>
          <li><a href="#atendimento">Atendimento</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#agendar">Contato</a></li>
        </ul>

        <button
          className={`nav-toggle${open ? ' open' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <nav
        className={`nav-drawer${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        <a href="#sobre"          onClick={closeMenu}>Sobre</a>
        <a href="#especialidades" onClick={closeMenu}>Especialidades</a>
        <a href="#atendimento"    onClick={closeMenu}>Atendimento</a>
        <a href="#faq"            onClick={closeMenu}>FAQ</a>
        <a href="#agendar"        onClick={closeMenu}>Contato</a>
      </nav>
    </>
  )
}
