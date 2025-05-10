import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Navigate } from './components/shared/Navigate'
import './global.css'
import { Navbar } from './components/Navi'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div style={{ height: '1000px' }}>
      <Navbar />
    </div>
  )
}

export default App
