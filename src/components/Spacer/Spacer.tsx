import type { PropsWithChildren } from 'react'
import cn from 'classnames'

interface SpacerProps {
  className?: string
}

const Spacer = ({ children, className }: PropsWithChildren<SpacerProps>) => {
  return <div className={cn('spacer', className)}>{children}</div>
}

export default Spacer
