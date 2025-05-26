import './TextArea.scss'
import cn from 'classnames'
import type { CommonInputProps } from '@components/types'

interface TextAreaProps extends CommonInputProps {
  fullWidth?: boolean
}

export const TextArea = ({ className, fullWidth, ...props }: TextAreaProps) => {
  return (
    <>
      <input
        className={cn('text-area', className, {
          '--full-width': fullWidth,
        })}
        {...props}
      />
    </>
  )
}
