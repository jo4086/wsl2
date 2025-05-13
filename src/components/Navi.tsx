import { useEffect, useRef, useState } from 'react'

import { Link } from 'react-router-dom'
import cn from 'classnames'
import '../styles/App.css'
import '../styles/nav.scss'
import { Snake } from './Snake.tsx'
import type { BreadCrumbItem } from '../types/navi.type'
import { SearchBox } from './shared/SearchBox.tsx'

interface NavbarProps {
  isScrolled: boolean
}

export const Navbar = ({ isScrolled }: NavbarProps) => {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  const breadcrumb: BreadCrumbItem[] = [
    { label: 'Home', link: '/' },
    { label: 'Content', link: '/content' },
    { label: 'Current Page' }, // 현재 페이지
  ]

  return (
    <nav
      className={cn('navbar', {
        scrolled: isScrolled,
        'search-focused': focused,
      })}
    >
      <Link className="logo HOME" to="/">
        My Blog
      </Link>
      <div className="nav-style">
        <Snake className="snake" items={breadcrumb} />
        <SearchBox
          value={value}
          onChange={setValue}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      <div className="nav-blank"></div>
    </nav>
  )
}
