// components/Dropdown/index.ts
import { useState } from 'react'
import type { ReactProps } from '../types'
import type { SlotItem, DropdownProps, DropdownItemProps } from './types'
import './Dropdown.scss'
import cn from 'classnames'

const DropdownButton = ({ children, className, ...rest }: ReactProps) => {
  return (
    <div className={cn('dropdown-button-root', className)} {...rest}>
      {children}
    </div>
  )
}

const SelectedItem = ({ item }: { item: SlotItem }) => {
  return (
    <div className="dropdown-selected-item">
      <IconRenderer item={item} />
      {item.label && <span>{item.label}</span>}
    </div>
  )
}

const DropdownMenu = ({ children, className, ...rest }: ReactProps<HTMLUListElement>) => {
  return (
    <ul className={cn('dropdown-menu-root', className)} {...rest}>
      {children}
    </ul>
  )
}

const DropdownItem = ({ item, isSelected, onClick }: DropdownItemProps) => {
  return (
    <li
      role="option"
      aria-selected={isSelected}
      className={cn('dropdown-menu-item', {
        selected: isSelected,
      })}
      onClick={onClick}
    >
      <IconRenderer item={item} />
      {item.label && <span className="item-label">{item.label}</span>}
    </li>
  )
}

const IconRenderer = ({ item }: { item: SlotItem }) => {
  if (item.icon) return <>{item.icon}</>
  if (item.src) return <img src={item.src} alt={`${item.label ?? ''}`} />
  return null
}

export const Dropdown = ({ slots, selectedIndex: controlledIndex, className, onChange, ...rest }: DropdownProps) => {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(0)
  const isControlled = controlledIndex !== undefined
  const currentIndex = isControlled ? controlledIndex! : uncontrolledIndex
  const currentItem = slots[currentIndex]
  const [open, setOpen] = useState(false)

  const handleSelect = (idx: number) => {
    if (!isControlled) setUncontrolledIndex(idx)
    onChange?.(idx, slots[idx])
  }

  return (
    <div
      className={cn('dropdown-root', className, {
        ['dropdown-open']: open,
        ['dropdown-close']: !open,
      })}
      {...rest}
    >
      <DropdownButton onClick={() => setOpen((prev) => !prev)}>
        <SelectedItem item={currentItem} />
      </DropdownButton>

      {open && slots.length > 0 && (
        <DropdownMenu>
          {slots.map((item, idx) => (
            <DropdownItem
              key={idx}
              item={item}
              isSelected={idx === currentIndex}
              onClick={() => {
                handleSelect(idx)
                setOpen(false)
              }}
            />
          ))}
        </DropdownMenu>
      )}
    </div>
  )
}

export * from './DropdownMenu'
export * from './DropdownItem'
export * from './DropdownTrigger'
