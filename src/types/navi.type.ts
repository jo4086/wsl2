export interface BreadCrumbItem {
  label: string
  link?: string
}

export interface SnakeProps {
  items: BreadCrumbItem[]
  className?: string
}
