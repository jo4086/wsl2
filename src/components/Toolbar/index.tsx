import type { Commonprops } from '@components/types'
import cn from 'classnames'

export const Toolbar = ({ className, children }: Commonprops) => {
  return <div className={cn('toolbar', className)}>{children}</div>
}

type ToolbarItemType = 'button' | 'dropdown' | 'popup' | 'gridSelector'

interface BaseToolbarItem {
  id: string
  type: ToolbarItemType
  icon: string
  label: string
  onClick?: () => void
}

interface DropdownItem {
  id: string
  icon?: string
  label: string
  onClick: () => void
}

interface DropdownToolbarItem {
  type: 'button'
  items: DropdownItem[]
}
