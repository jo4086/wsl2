import type { ReactNode } from 'react'
import '../../styles/scss/index.scss'

interface homeMainProps {
  children: ReactNode
}

export const Main = ({ children }: homeMainProps) => {
  return <div>{children}</div>
}
