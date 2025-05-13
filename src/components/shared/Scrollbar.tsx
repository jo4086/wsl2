import type { PropsWithChildren } from 'react'
import '../../styles/scrollbar.scss'

interface Props {
  maxHeight?: string
  className?: string
}

export const Scrollbar = ({ maxHeight, className, children }: PropsWithChildren<Props>) => {
  return (
    <div style={{ maxHeight }} className={`scrollbar ${className}`}>
      {children}
    </div>
  )
}
