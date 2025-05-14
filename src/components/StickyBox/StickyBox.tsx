import type { PropsWithChildren, HTMLAttributes } from 'react'
import cn from 'classnames'

interface props extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const StickyBox = ({ className, children, ...props }: PropsWithChildren<props>) => {
  return (
    <>
      <aside className={cn('sticky_box', className)} {...props}>
        {children}
      </aside>
    </>
  )
}

export default StickyBox
