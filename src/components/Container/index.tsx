import './Container.scss'
import cn from 'classnames'
import type { Commonprops } from '@components/types'

export const Container = ({ children, className, ...props }: Commonprops) => {
  return (
    <div className={cn('container', className)} {...props}>
      {children}
    </div>
  )
}

export default Container
