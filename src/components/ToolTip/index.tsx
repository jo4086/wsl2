import type { ReactNode } from 'react'
// import './ToolTip.scss'
import styles from './Tooltip.module.css'

interface TooltipProps {
  children: ReactNode
  desc: string
}

export const ToolTip = ({ children, desc }: TooltipProps) => {
  return (
    <div className={styles.tooltipWrapper}>
      {children}
      <div className={styles.tooltipDesc}>{desc}</div>
    </div>
  )
}
