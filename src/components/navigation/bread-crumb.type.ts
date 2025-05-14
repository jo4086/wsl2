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
