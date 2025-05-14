import { useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import type { NavbarProps, BreadCrumbItemProps } from '@components/types'
import { SearchBox } from '@components/searchBox'
import { BreadCrumb } from '@components/bread crumb'

export const Navbar = ({ isScrolled }: NavbarProps) => {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  const breadcrumb: BreadCrumbItemProps[] = [
    { label: 'Home', link: '/' },
    { label: 'Content', link: '/content' },
    { label: 'Current Page', link: '/page' },
  ]

  return (
    <div
      className={cn('navbar', {
        scrolled: isScrolled,
        'search-focused': focused,
      })}
    >
      <Link className="logo" to="/">
        My Blog
      </Link>
      <div className="nav-style">
        <BreadCrumb items={breadcrumb} />
        <SearchBox
          value={value}
          onChange={setValue}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      <div className="nav-blank"></div>
    </div>
  )
}
export default Navbar
