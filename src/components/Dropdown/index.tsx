// components/Dropdown/index.ts
import { useState, forwardRef, useRef, useEffect } from 'react'
import { mergeRefs } from '../utils'

import type { ReactProps } from '../types'
import type { SlotItem, DropdownProps, DropdownItemProps } from './types'

import './Dropdown.scss'
import cn from 'classnames'
// import * as React from 'react'

/**
 * React Components
 *
 * Dropdown         - 드롭다운 전체 컴포넌트. 상태 관리 및 키보드/마우스 인터랙션 처리
 * DropdownButton   - 드롭다운을 여닫는 버튼 UI 영역
 * SelectedItem     - 현재 선택된 항목을 렌더링하는 컴포넌트 (아이콘, 텍스트 등 표시)
 * DropdownMenu     - 드롭다운 항목 리스트를 감싸는 컨테이너 (<ul>)
 * DropdownItem     - 드롭다운 내의 개별 선택 항목 (<li>), 클릭 및 포커스 대응
 * IconRenderer     - 각 항목의 아이콘 또는 이미지 렌더링 처리
 */

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
      {item.label && <span className="selected-item-label">{item.label}</span>}
    </div>
  )
}

const DropdownMenu = forwardRef<HTMLUListElement, ReactProps<HTMLUListElement>>(
  ({ children, className, onMouseMove, ...rest }: ReactProps<HTMLUListElement>, ref) => {
    return (
      <ul onMouseMove={onMouseMove} ref={ref} role="listbox" className={cn('dropdown-menu-root', className)} {...rest}>
        {children}
      </ul>
    )
  }
)

const DropdownItem = ({ item, isSelected, isPseudoHovered, onClick, onFocus, refCallback }: DropdownItemProps) => {
  return (
    <li
      role="option"
      aria-selected={isSelected}
      tabIndex={-1}
      ref={refCallback}
      className={cn('dropdown-menu-item', {
        selected: isSelected,
      })}
      onClick={onClick}
      onFocus={onFocus}
    >
      <IconRenderer item={item} />
      {item.label && (
        <span
          className={cn('item-label', {
            'pseudo-hover': isPseudoHovered,
          })}
        >
          {item.label}
        </span>
      )}
    </li>
  )
}

const IconRenderer = ({ item, id, className }: { item: SlotItem; className?: string; id?: string }) => {
  if (item.icon) return <div className="selected-item-img-wrap">{item.icon}</div>
  if (item.src)
    return (
      <div className={cn('selected-item-img-wrap', className)}>
        <img id={id} className={cn('selected-item-img')} src={item.src} alt={`${item.label ?? ''}`} />
      </div>
    )
  return null
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ slots, selectedIndex: controlledIndex, className, onChange, ...rest }: DropdownProps, ref) => {
    /**
     * useRef
     *
     * internalRef           - 드롭다운 루트 컨테이너에 대한 참조 (포커스 제어 및 외부 클릭 감지용)
     * combinedRef           - 외부 전달 ref와 internalRef를 병합한 ref (mergeRefs 사용)
     * itemRefs              - 각 DropdownItem 항목의 DOM 참조 배열 (포커스 이동, 스크롤 처리용)
     * dropdownMenuRef       - 드롭다운 메뉴(<ul>) 영역의 스크롤 컨트롤을 위한 참조
     * lastInteractionMethod - 사용자 입력 방식 추적 (keyboard, tab, mouse) → 스크롤/포커스 판단 기준
     */
    const internalRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<(HTMLLIElement | null)[]>([])
    const dropdownMenuRef = useRef<HTMLUListElement>(null)
    const lastInteractionMethod = useRef<'tab' | 'keyboard' | 'mouse' | null>(null)
    const combinedRef = mergeRefs(ref, internalRef)

    /**
     * useState
     *
     * focusedIndex      - 키보드 탐색 시 포커스된 항목 인덱스
     * uncontrolledIndex - 선택 상태를 외부에서 제어하지 않는 경우 내부에서 관리하는 인덱스
     * open              - 드롭다운 열림 여부
     * hasMouseEntered   - 마우스로 드롭다운 안에 진입했는지 여부 (초기 pseudo-hover용)
     */
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
    const [uncontrolledIndex, setUncontrolledIndex] = useState(0)
    const [open, setOpen] = useState(false)
    const [hasMouseEntered, setHasMouseEntered] = useState(false)

    /**
     * variables
     *
     * isControlled  - selectedIndex가 props로 넘어왔는지 여부 (controlled vs uncontrolled 판단용)
     * currentIndex  - 현재 선택된 인덱스 (controlledIndex or uncontrolledIndex)
     * currentItem   - 현재 선택된 항목 객체 (slots[currentIndex])
     */
    const isControlled = controlledIndex !== undefined
    const currentIndex = isControlled ? controlledIndex! : uncontrolledIndex
    const currentItem = slots[currentIndex]

    /**
     * constant
     *
     * VISIBLE_COUNT - 드롭다운에서 한 번에 보여줄 항목 수
     * ITEM_HEIGHT   - 각 항목의 높이(px 단위) → 스크롤 계산 시 사용
     * CENTER_INDEX  - 포커스가 유지될 중심 인덱스 (VISIBLE_COUNT 기준)
     */
    const VISIBLE_COUNT = 9
    const ITEM_HEIGHT = 40
    const CENTER_INDEX = Math.ceil(VISIBLE_COUNT / 2)

    /**
     * function
     *
     * closeAndRestoreFocus: 드롭다운 닫기 + 포커스 복구
     * handleSelect: 인덱스 선택 처리 및 onChange 호출
     * handleItemFocus: 포커스된 아이템 인덱스 추적
     * handleKeyDown: 키보드 탐색 및 선택 제어
     */
    const closeAndRestoreFocus = () => {
      setOpen(false)
      setFocusedIndex(null)
      setTimeout(() => {
        internalRef.current?.focus()
      }, 0)
    }

    const handleSelect = (idx: number) => {
      if (!isControlled) setUncontrolledIndex(idx)
      onChange?.(idx, slots[idx])
    }

    const handleItemFocus = (e: React.FocusEvent<HTMLLIElement>) => {
      const idx = itemRefs.current.findIndex((el) => el === e.currentTarget)
      if (idx !== -1) {
        setFocusedIndex(idx)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const key = e.key as string
      if (!open && (key === 'Enter' || key === ' ')) {
        e.preventDefault()
        setOpen(true)
        const method = lastInteractionMethod.current
        if (method === 'tab') {
          const idx = itemRefs.current.findIndex((el) => el === document.activeElement)
          if (idx !== -1) {
            setFocusedIndex(idx)
          } else {
            setFocusedIndex(currentIndex)
          }
        } else {
          setFocusedIndex(currentIndex)
        }
        return
      }

      if (open) {
        switch (key) {
          case 'ArrowDown':
            e.preventDefault()
            setFocusedIndex((prev) => {
              if (prev === null) {
                const fallback = itemRefs.current.findIndex((el) => el === document.activeElement)
                return fallback !== -1 ? fallback : currentIndex
              }
              return (prev + 1) % slots.length
            })
            break

          case 'ArrowUp':
            e.preventDefault()
            setFocusedIndex((prev) => {
              if (prev === null) {
                const fallback = itemRefs.current.findIndex((el) => el === document.activeElement)
                return fallback !== -1 ? fallback : currentIndex
              }
              return (prev - 1 + slots.length) % slots.length
            })
            break

          case 'Enter':
          case ' ':
            const index = focusedIndex ?? currentIndex
            if (index != null && slots[index]) {
              handleSelect(index)
              closeAndRestoreFocus()
            }

            break

          case 'Escape':
            closeAndRestoreFocus()
            break

          case 'Tab': {
            // 마지막 아이템일 때는 드롭다운 닫고, Tab 기본 동작 허용 (포커스가 다음 요소로 감)
            if (focusedIndex === slots.length - 1 || currentIndex === slots.length - 1) {
              setOpen(false)
              setFocusedIndex(null)
              return // 여기선 preventDefault 안 함
            }

            e.preventDefault() // 기본 Tab 이동 방지
            setFocusedIndex((prev) => {
              if (prev === null) {
                const fallback = itemRefs.current.findIndex((el) => el === document.activeElement)
                return fallback !== -1 ? fallback : currentIndex
              }
              return (prev + 1) % slots.length
            })
            break
          }

          default:
            break
        }
      }
    }

    /**
     * useEffect
     *
     * trackInputMethod         - document 전역 keydown/mousedown 이벤트로 입력 방식 추적
     * initFocusedIndexOnOpen   - 드롭다운 열릴 때 focusedIndex 초기화 (lastInteractionMethod 기반)
     * closeOnOutsideClick      - 외부 영역 클릭 시 드롭다운 닫기
     * closeOnFocusOut          - 드롭다운 내부 focus 빠져나가면 닫기
     * scrollToFocusedIndex     - focusedIndex 변경 시 키보드 탐색에 따른 스크롤 위치 조정 (mouse일 경우 제외)
     */

    // trackInputMethod
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          lastInteractionMethod.current = 'tab'
        } else {
          lastInteractionMethod.current = 'keyboard'
        }
      }

      const handleMouseDown = () => {
        lastInteractionMethod.current = 'mouse'
      }

      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleMouseDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('mousedown', handleMouseDown)
      }
    }, [])

    // initFocusedIndexOnOpen
    useEffect(() => {
      if (!open) return

      setHasMouseEntered(false)

      switch (lastInteractionMethod.current) {
        case 'tab': {
          const idx = itemRefs.current.findIndex((el) => el === document.activeElement)
          if (idx !== -1) {
            setFocusedIndex(idx)
          }
          break
        }
        case 'keyboard':
        case 'mouse':
        default:
          setFocusedIndex(currentIndex)
          break
      }
    }, [open])

    // closeOnOutsideClick
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (internalRef.current && !internalRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // closeOnFocusOut
    useEffect(() => {
      if (!open) return

      const handleFoucsOut = () => {
        setTimeout(() => {
          if (internalRef.current && !internalRef.current.contains(document.activeElement)) {
            setOpen(false)
          }
        }, 0)
      }
      const container = internalRef.current
      container?.addEventListener('focusout', handleFoucsOut)
      return () => {
        container?.removeEventListener('focusout', handleFoucsOut)
      }
    }, [open])

    // scrollToFocusedIndex
    useEffect(() => {
      if (!open || focusedIndex === null) return
      if (lastInteractionMethod.current !== 'keyboard' && lastInteractionMethod.current !== 'tab') return

      itemRefs.current[focusedIndex]?.focus()

      const container = dropdownMenuRef.current
      if (!container) return

      const scrollTargetIndex = focusedIndex < CENTER_INDEX ? 0 : focusedIndex - CENTER_INDEX + 1

      const targetScrollTop = scrollTargetIndex * ITEM_HEIGHT

      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      })
    }, [focusedIndex, open])

    // render
    return (
      <div
        ref={combinedRef}
        onKeyDown={handleKeyDown}
        className={cn('dropdown-root', className, {
          ['dropdown-open']: open,
          ['dropdown-close']: !open,
        })}
        tabIndex={0}
        {...rest}
      >
        <DropdownButton data-focused={open || undefined} onClick={() => setOpen(true)}>
          <SelectedItem item={currentItem} />
        </DropdownButton>

        {open && slots.length > 0 && (
          <DropdownMenu
            ref={dropdownMenuRef}
            onMouseMove={() => {
              if (!hasMouseEntered) setHasMouseEntered(true)
            }}
          >
            {slots.map((item, idx) => (
              <DropdownItem
                key={idx}
                item={item}
                isSelected={idx === currentIndex}
                isPseudoHovered={!hasMouseEntered && idx === currentIndex}
                onFocus={handleItemFocus}
                onClick={() => {
                  // if (!scrollSettled) return
                  handleSelect(idx)
                  setOpen(false)
                }}
                refCallback={(el) => (itemRefs.current[idx] = el)}
              />
            ))}
          </DropdownMenu>
        )}
      </div>
    )
  }
)
