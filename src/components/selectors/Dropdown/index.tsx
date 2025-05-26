import { useState, type ReactNode } from 'react'
import type { Commonprops } from '@/components/types'
import cn from 'classnames'

interface BaseProps {
  icon?: string | ReactNode
  label?: string
  alt?: string
}

interface DropdownItem extends BaseProps {
  id: string
  onClick: () => void
}

interface DropdownProps extends BaseProps, Commonprops {
  items: DropdownItem[]
}

export const Dropdown = ({ items, icon, label, alt, children, className, ...props }: DropdownProps) => {
  const [open, setOpen] = useState(false)

  const hasIcon = !!icon
  const hasLabel = !!label

  return (
    <div className={cn('dropdown-container', className)} {...props}>
      <div className={cn('dropdown-trigger')} onClick={() => setOpen(!open)}>
        {hasIcon && (typeof icon === 'string' ? <img src={icon} alt={alt} className="dropdown-icon" /> : icon)}
        {hasLabel && <span className="dropdown-label">{label}</span>}
      </div>
      {open && (
        <ul className="dropdown-menu">
          {items.map((item) => (
            <li key={item.id} onClick={item.onClick}>
              {item.icon &&
                (typeof item.icon === 'string' ? (
                  <img src={item.icon} alt="" className="dropdown-item-icon" />
                ) : (
                  item.icon
                ))}
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
