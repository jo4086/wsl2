import { Link } from 'react-router-dom' // react-router 기준
import type { BreadCrumbProps } from '@components/types'
import cn from 'classnames'

export const BreadCrumb = ({ items, className, itemClassName }: BreadCrumbProps) => {
  if (!items || !Array.isArray(items)) return null
  return (
    <nav className={cn('bread-crumb', className)}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <span className={cn('bread-crumb-item', itemClassName, item.className)} key={idx}>
            {!isLast && item.link ? <Link to={item.link}>{item.label}</Link> : <span>{item.label.trim()}</span>}
          </span>
        )
      })}
    </nav>
  )
}

export default BreadCrumb
