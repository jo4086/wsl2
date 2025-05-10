import { Link } from 'react-router-dom' // react-router 기준
import type { SnakeProps } from '../types/navi.type'

export const Snake = ({ items }: SnakeProps) => {
  if (!items || !Array.isArray(items)) return null
  return (
    <nav className="snake">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <span className="snake-item" key={idx}>
            {!isLast && item.link ? <Link to={item.link}>{item.label}</Link> : <span>{item.label.trim()}</span>}
          </span>
        )
      })}
    </nav>
  )
}
