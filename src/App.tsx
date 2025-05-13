import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Navigate } from './components/shared/Navigate'
import Home from './domain/home/Home'
// import Homie
import './global.css'
import { Scrollbar } from './components/shared/Scrollbar'
import { Navbar } from './components/Navi'
import { Wrapper } from './components/shared/Wrapper'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const stopTop = 70
    let lastTop = 1000

    const handleScroll = () => {
      const currentY = window.scrollY
      const isScrollingDown = currentY > lastScrollY

      if (isScrollingDown && currentY > 0) {
        setIsScrolled(true)
      } else if (!isScrollingDown && currentY < 30) {
        setIsScrolled(false)
      }

      lastScrollY = currentY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ height: '3000px' }}>
      <Scrollbar maxHeight="10px">
        <Navbar isScrolled={isScrolled} />
        <Wrapper isScrolled={isScrolled}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Wrapper>
      </Scrollbar>
    </div>
  )
}

export default App
