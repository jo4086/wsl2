import { useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import type { NavbarProps, BreadCrumbItemProps } from '@components/types'
import { SearchBox } from '@components/SearchBox'
import { BreadCrumb } from '@components/BreadCrumb'
import useTheme from '@/hooks'

export const Navbar = ({ isScrolled }: NavbarProps) => {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const breadcrumb: BreadCrumbItemProps[] = [
    { label: 'Home', link: '/' },
    { label: 'Content', link: '/content' },
    { label: 'Post', link: '/post/new' },
    { label: 'Current Page', link: 'page' },
  ]

  return (
    <div
      className={cn('navbar', {
        scrolled: isScrolled,
        'search-focused': focused,
      })}
    >
      <div className="navbar-bg"></div>
      <Link className="logo h1" to="/">
        My Blog
      </Link>
      <div className="navbar-content">
        <BreadCrumb items={breadcrumb} />
        <div className="right">
          <SearchBox
            value={value}
            onChange={setValue}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <i className="ri-contrast-2-fill theme-toggle" onClick={toggleTheme}></i>
        </div>
      </div>
      <div className="nav-blank" style={{ flexDirection: 'column', display: 'flex' }}></div>
    </div>
  )
}
export default Navbar
