import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, JSX } from 'react'
import * as React from 'react'

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

export interface Commonprops extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export interface CommonInputProps extends InputHTMLAttributes<HTMLInputElement> {}
export interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

export interface ReactProps<T extends HTMLElement = HTMLDivElement> extends HTMLAttributes<T> {
  children?: ReactNode
  // as?: keyof JSX.IntrinsicElements
}
