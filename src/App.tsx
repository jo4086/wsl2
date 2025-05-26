import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './global.css'
// import './index.scss'
import './styles/global.scss'
import { Content, Home, Post } from './domain'
import { Wrapper } from '@components/Wrapper'
import { Navbar } from '@components/Navbar'
import { ScrollToTop } from '@components/utils'
import { Spacer } from '@components/Spacer'
import { Layout } from '@/components'

function App() {
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

  return (
    <div id="App_wrap">
      <ScrollToTop />

      <Navbar isScrolled={isScrolled} />
      <Wrapper isScrolled={isScrolled}>
        {/*        <Spacer>여백</Spacer>*/}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/content" element={<Content />} />
            <Route path="/post/new" element={<Post />} />
          </Routes>
        </Layout>
        {/*        <Spacer></Spacer> */}
      </Wrapper>
    </div>
  )
}

export default App
