export interface BreadCrumbItemProps {
  label: string
  link?: string
  className?: string
}

export interface BreadCrumbProps {
  items: BreadCrumbItemProps[]
  className?: string
  itemClassName?: string
}

export interface NavbarProps {
  isScrolled: boolean
}

export interface WrapperProps {
  isScrolled: boolean
}

export interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  onFocus: () => void
  onBlur: () => void
}
