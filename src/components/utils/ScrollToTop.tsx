import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

function ScrollToTop() {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'PUSH') {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return null
}

export default ScrollToTop
