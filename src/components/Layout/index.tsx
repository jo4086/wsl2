import type { Commonprops } from '../types'
import cn from 'classnames'
import './layout.scss'

export const Layout = ({ children, className }: Commonprops) => {
  return (
    <>
      <div className="side left"></div>
      <div className={cn('center', className)}>{children}</div>
      <div className="side right"></div>
    </>
  )
}
