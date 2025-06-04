import { type ReactNode, type ReactElement, useEffect, useRef, useState, createContext, useContext } from 'react'
import * as React from 'react'
import { mergeRefs } from '../utils' // 유틸 함수가 있다면 사용
import cn from 'classnames'
import './Popover.scss'

// Context 정의
const PopoverContext = createContext<{
  id: string
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  interactingInside: boolean
  setInteractingInside: (v: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
} | null>(null)

const usePopoverContext = () => {
  const ctx = useContext(PopoverContext)
  if (!ctx) throw new Error(`Popover compound components must be used inside <Popover>`)
  return ctx
}

interface CommonProps {
  children: ReactNode
  className?: string
}

interface PopoverButtonProps extends Omit<CommonProps, 'children'> {
  icon?: ReactElement<any>
  label?: string
  src?: string
  children?: ReactNode
}

interface PopoverProps extends CommonProps {
  id: string
}

// 최상위 Popover 컴포넌트
export const Popover = ({ children, id, className }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [interactingInside, setInteractingInside] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, interactingInside, setInteractingInside, triggerRef, id }}>
      <div className={cn(`popover-wrapper`, className)}>{children}</div>
    </PopoverContext.Provider>
  )
}

// Trigger
Popover.Button = ({ children, label, icon, src, className }: PopoverButtonProps) => {
  const { isOpen, setIsOpen, interactingInside, triggerRef, id } = usePopoverContext()

  const handleClick = () => {
    if (interactingInside) return // 내부 조작 중이면 무시
    setIsOpen(!isOpen)
  }
  const renderIcon = () => {
    if (!icon) return null
    return React.cloneElement(icon, {
      className: cn(icon.props.className, 'popover-button-icon'),
    })
  }

  return (
    <button
      className={cn('popover-button', className, {
        // [`${label}-open`]:
        open: isOpen,
        close: !isOpen,
      })}
      // popoverTarget={id}
      ref={triggerRef}
      onClick={handleClick}
    >
      {renderIcon()}
      {src && <img src={`/${src}`} className={cn('popover-button-img')} />}
      {label && <span>{label}</span>}
      {children}
    </button>
  )
}

// Content
Popover.Content = ({ children }: { children: ReactNode }) => {
  const { isOpen, setIsOpen, setInteractingInside, triggerRef, id } = usePopoverContext()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      const clickedOutside = !contentRef.current?.contains(target) && !triggerRef.current?.contains(target)

      if (clickedOutside) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, setIsOpen, triggerRef])

  if (!isOpen) return null

  return (
    <div
      id={id}
      className="popover-content"
      ref={contentRef}
      // popover="auto"
      // popover="manual"
      onMouseDown={() => setInteractingInside(true)}
      onMouseUp={() => setTimeout(() => setInteractingInside(false), 0)}
    >
      {children}
    </div>
  )
}

type TimeUnit = `${number}s` | `${number}ms`

interface TooltipProps {
  desc: string | ReactNode
  // action?: 'hover'
  isOpen: boolean
  // state: 'open' | 'close'
  duration?: TimeUnit
  label: string
}
Popover.Tooltip = ({ isOpen, label, desc, duration = '0.2s' }: TooltipProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const handleHoverTooltip = (e: React.MouseEvent) => {
    if (e.type === 'mouseenter') {
      setIsTooltipOpen(true)
    } else if (e.type === 'mouseleave') {
      setIsTooltipOpen(false)
    }
  }

  return (
    <span
      role="tooltip"
      aria-hidden={!isOpen}
      className={cn('popover-tooltip', `tooltip-${label}`, {
        open: isOpen,
        close: !isOpen,
      })}
      style={{
        transition: `opacity ${duration} ease 0.2s`,
      }}
      data-action={isOpen}
    >
      {desc}
    </span>
  )
}

/* Popover.Tooltip = ({ children }: { children: ReactNode }) => {
  return <div className={cn('popover-tooltip')}>{children}</div>
} */
