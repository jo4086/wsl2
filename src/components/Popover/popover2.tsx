import type { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react'
import { createContext, useContext } from 'react'
import * as React from 'react'

import cn from 'classnames'

const PopoverContext = createContext<{
  targetId: string
  anchorId?: string
  popover?: 'auto' | 'manual'
} | null>(null)

interface MergedProps {
  children: ReactNode
  className?: string
}

interface PopoverProps extends MergedProps {
  targetId: string
  anchorId?: string
  popover?: 'auto' | 'manual'
}

interface ButtonProps extends MergedProps {
  action?: 'hide' | 'show' | 'toggle'
}

type BoxProps<T extends ElementType> = {
  as?: T
  anchor?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'anchor'>

interface ContentProps extends MergedProps {
  as?: ElementType
  popover?: 'auto' | 'manual'
}

const Box = <T extends ElementType = 'div'>({ as, anchor, ...rest }: BoxProps<T>) => {
  const Component = (as || 'div') as ElementType

  return <Component {...rest} anchor={anchor} />
}

const usePopoverContext = () => {
  const context = useContext(PopoverContext)
  if (!context) throw new Error('Popover compound components must be used inside <Popover>')
  return context
}

export const Popover = ({ targetId, anchorId, popover = 'auto', children, className }: PopoverProps) => {
  return (
    <PopoverContext.Provider value={{ targetId, anchorId, popover }}>
      <div className={cn('popover_root', className)}>{children}</div>
    </PopoverContext.Provider>
  )
}

Popover.Button = ({ children, className, action = 'toggle' }: ButtonProps) => {
  const { anchorId, targetId } = usePopoverContext()
  return (
    <button
      className={className}
      // id={anchorId}
      popoverTarget={targetId}
      popoverTargetAction={action}
    >
      {children}
    </button>
  )
}

Popover.Content = ({ children, className, popover: overridePopover, as = 'div' }: ContentProps) => {
  const { anchorId, targetId, popover } = usePopoverContext()

  const effectivePopover = overridePopover ?? popover

  return (
    <Box
      className={className}
      id={targetId}
      // anchor={anchorId}
      popover={effectivePopover}
      as={as}
    >
      {children}
    </Box>
  )
}
