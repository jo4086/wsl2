import type { ReactNode, HTMLAttributes } from 'react'
import cn from 'classnames'

interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  id?: string
  className?: string
  expanded?: boolean
}

export const DropdownMenu = ({ id, children, expanded, className, ...rest }: DropdownMenuProps) => {
  return (
    <div
      id={id}
      className={cn('dropdown-menu', className, {
        open: expanded,
        close: !expanded,
      })}
      role="menu"
      aria-expanded={expanded}
      onClick={(e) => {
        e.stopPropagation()
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
