import type { ReactNode, HTMLAttributes } from 'react'
import cn from 'classnames'

interface ItemFormProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 메뉴의 라벨 텍스트입니다.
   * 'src'와 함께 사용될 경우, <img> 태그의 alt 속성에도 사용됩니다.
   * */
  label?: string

  /**
   * ReactNode 타입의 아이콘 컴포넌트입니다.
   * e.g ) <IconBell />, <CustomIcon />
   * */
  icon?: ReactNode

  /**
   * 아이콘의 이미지 경로입니다.
   * ReactNode가 아닌 이미지 URL을 사용할 경우 이 속성을 사용하세요.
   * e.g ) "/icons/settings.svg"
   * */
  src?: string
  selected?: boolean
  expanded?: boolean
  context: 'dropdown' | 'accordion' | 'menu'
  onClick?: () => void
}

export const ItemForm = ({
  label,
  icon,
  src,
  selected,
  expanded,
  id,
  className,
  context = 'dropdown',
  onClick,
  ...rest
}: ItemFormProps) => {
  const hasIcon = !!icon
  const hasLabel = !!label

  return (
    <div
      id={id}
      className={cn(`${context}-item`, className, {
        [`${context}-item-seleted`]: selected,
        [`${context}-item-expanded`]: expanded,
      })}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      {...rest}
    >
      {src && <img src={src} alt={label ?? ''} className={`${context}-item-icon`} />}
      {icon}
      {hasLabel && <span className={`${context}-item-label`}>{label}</span>}
    </div>
  )
}
