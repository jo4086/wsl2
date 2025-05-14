import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
// import { Home } from '@domain/home'
import { Content, Home } from './domain'
import './global.css'

import { Wrapper } from '@components/wrapper'
import { Navbar } from '@components/navbar'
import { ScrollToTop } from '@components/utils'

function App() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(window.scrollY)
  const lastTop = useRef(100)
  const stickyRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const stopTop = 70
    const currentY = window.scrollY
    const isScrollingDown = currentY > lastScrollY.current

    if (isScrollingDown && currentY > 0) {
      setIsScrolled(true)
    } else if (!isScrollingDown && currentY < 30) {
      setIsScrolled(false)
    }

    const stickyTop = currentY < stopTop ? Math.max(100 - currentY, stopTop) : stopTop
    if (stickyRef.current && stickyTop !== lastTop.current) {
      stickyRef.current.style.top = `${stickyTop}px`
      lastTop.current = stickyTop
    }

    lastScrollY.current = currentY
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      handleScroll()
      window.addEventListener('scroll', handleScroll)
    })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 라우트 변경 시 스크롤 상태 체크
  useEffect(() => {
    requestAnimationFrame(() => {
      handleScroll()
    })
  }, [location.pathname])

  return (
    <div style={{ height: '2000px' }}>
      <ScrollToTop />
      <Navbar isScrolled={isScrolled} />
      <Wrapper isScrolled={isScrolled}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content" element={<Content />} />
        </Routes>
      </Wrapper>
    </div>
  )
}

export default App
