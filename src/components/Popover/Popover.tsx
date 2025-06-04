import * as classNames from 'classnames'
import type { ReactNode, ElementType, ComponentPropsWithoutRef, ReactElement, ButtonHTMLAttributes } from 'react'
import { cloneElement } from 'react'

type AnchorProps<T extends ElementType> = {
  as?: T
  anchor?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'anchor'>

interface ContentProps {
  as?: ElementType
  popover?: 'auto' | 'manual'
}

interface PopoverProps {
  children: ReactNode
  buttonEl?: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
  buttonElment: ReactNode
}

export const Popover = ({ children, buttonEl, buttonElment }: PopoverProps) => {
  return (
    <div className="Popover-root">
      {buttonEl ? buttonEl : <button className="Popover-button"></button>}
      {!buttonEl ? (
        <button className="Popover-button-root"></button>
      ) : (
        cloneElement(buttonEl, {
          className: `${buttonEl.props?.className ?? ''} Popover-button-root`,
        })
      )}
      <button className="Popover-button">{buttonElment}</button>
      <div>{children}</div>
    </div>
  )
}
