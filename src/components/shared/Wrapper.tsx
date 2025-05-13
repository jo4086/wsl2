import type { PropsWithChildren } from 'react'
import cn from 'classnames'

interface Props {
  isScrolled: boolean
}
export const Wrapper = ({ isScrolled, children }: PropsWithChildren<Props>) => {
  return (
    <main
      className={cn('wrapper', {
        scrolled: isScrolled,
      })}
    >
      {children}
    </main>
  )
}
