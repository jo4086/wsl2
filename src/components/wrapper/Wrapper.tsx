import type { PropsWithChildren } from 'react'
import cn from 'classnames'
import type { WrapperProps } from '@components/types'

export const Wrapper = ({ isScrolled, children }: PropsWithChildren<WrapperProps>) => {
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

export default Wrapper
