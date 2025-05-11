import { useEffect, useRef, useState } from 'react'
import { Logo } from './shared/Logo'
import '../styles/App.css'
import { Snake } from './Snake'
import type { BreadCrumbItem } from '@/types/navi.type'

export const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [isScrolled, setIsScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [logoHeight, setLogoHeight] = useState(60)

  const breadcrumb: BreadCrumbItem[] = [
    { label: 'Home', link: '/' },
    { label: 'Content', link: '/content' },
    { label: 'Current Page' }, // 현재 페이지
  ]

  useEffect(() => {
    let lastScrollY = window.scrollY
    const stopTop = 70
    let lastTop = 1000

    const handleScroll = () => {
      const currentY = window.scrollY
      const isScrollingDown = currentY > lastScrollY

      if (isScrollingDown && currentY > 0) {
        setIsScrolled(true)
        setLogoHeight(80)
      } else if (!isScrollingDown && currentY < 30) {
        setIsScrolled(false)
        setLogoHeight(80)
      }

      lastScrollY = currentY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      id="navbar"
      ref={navbarRef}
      className={`${isScrolled ? 'scrolled' : ''} ${searchFocused ? 'search-focused}' : ''}`}
    >
      <div className={`logo-wrapper ${isScrolled ? 'shrink' : ''}`} style={{ height: `${logoHeight}px` }}>
        {/*  <Logo
          viewBox={{ x: 0, y: 0, width: 300, height: 80 }}
          width={290}
          height={logoHeight}
          rect={{
            x: 0,
            y: isScrolled ? 15 : 10,
            width: 300,
            height: 80,
            rx: 10,
            ry: 10,
            fill: 'transparent',
          }}
          text={{ size: '2rem' }}
        /> */}
      </div>
      <Snake items={breadcrumb} />
    </nav>
  )
}
