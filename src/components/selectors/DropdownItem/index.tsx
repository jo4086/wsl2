// import { ItemForm } from '@/components/selectors'
import { ItemForm } from '@/components/ItemForm'
import type { ComponentProps } from 'react'

interface DropdownItemProps extends Omit<ComponentProps<typeof ItemForm>, 'context'> {}

export const DropdownItem = (props: DropdownItemProps) => {
  return <ItemForm context="dropdown" {...props} />
}
