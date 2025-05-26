import type { ReactNode, HTMLAttributes, SyntheticEvent, MouseEvent } from 'react'
import cn from 'classnames'
import './DropdownButton.scss'

interface DropdownButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  expanded?: boolean
}

export const DropdownTrigger = ({ expanded, className, onClick, id, children, ...rest }: DropdownButtonProps) => {
  const handleActivate = (e: SyntheticEvent) => {
    onClick?.(e as unknown as MouseEvent<HTMLDivElement>)
  }
  return (
    <div
      id={id}
      role="button"
      tabIndex={0}
      className={cn('dropdown-button', className, {
        'dropdown-open': expanded,
        'dropdown-close': !expanded,
      })}
      aria-haspopup="menu"
      aria-expanded={expanded}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleActivate(e)
        }
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
