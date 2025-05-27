import type { ReactNode, HTMLAttributes } from 'react'
import type { ReactProps } from '../types'

export interface SlotItem {
  label?: string
  /**
   * ReactNode 타입의 아이콘 컴포넌트입니다.
   * e.g ) <CustomIcon />
   * */
  icon?: ReactNode

  /**
   * 아이콘의 이미지 경로입니다.
   * ReactNode가 아닌 이미지 URL을 사용할 경우 이 속성을 사용하세요.
   * */
  src?: string
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  slots: SlotItem[]
  selectedIndex?: number
  onChange?: (index: number, item: SlotItem) => void
}

export interface DropdownItemProps extends ReactProps<HTMLLIElement> {
  item: SlotItem
  isSelected: boolean
  isPseudoHovered: boolean
  refCallback?: (el: HTMLLIElement | null) => void
  onClick: () => void
}
