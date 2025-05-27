import { type HTMLAttributes, forwardRef, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { mergeRefs } from '../utils'
import './Scrollbar.scss'

interface ScollbarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Scrollbar = forwardRef<HTMLDivElement, ScollbarProps>(
  ({ children, className, ...rest }: ScollbarProps, ref) => {
    // Ref 설정
    const internalRef = useRef<HTMLDivElement>(null)
    const combinedRef = mergeRefs(ref, internalRef)

    // useState 설정
    const [thumbTop, setThumbTop] = useState(0)
    const [thumbHeight, setThumbHeight] = useState(0)

    // useEffect 설정
    useEffect(() => {
      const container = internalRef.current
      if (!container) return

      const update = () => {
        const { scrollTop, scrollHeight, clientHeight } = container

        const rawHeight = (clientHeight / scrollHeight) * clientHeight
        const thumbHeight = Math.max(rawHeight, 20) // 최소 높이 설정

        const maxScroll = scrollHeight - clientHeight
        const maxThumbTop = clientHeight - thumbHeight

        const thumbTop = (scrollTop / maxScroll) * maxThumbTop

        setThumbHeight(thumbHeight)
        setThumbTop(thumbTop)
      }

      update()
      container.addEventListener('scroll', update)
      return () => container.removeEventListener('scroll', update)
    }, [])
    /*     useEffect(() => {
      const container = internalRef.current
      if (!container) {
        return
      }

      const update = () => {
        const { scrollTop, scrollHeight, clientHeight } = container
        setThumbTop((scrollTop / scrollHeight) * clientHeight)
        setThumbHeight((clientHeight / scrollHeight) * clientHeight)
      }

      update()
      container.addEventListener('scroll', update)
      return () => container.removeEventListener('scroll', update)
    }, []) */

    return (
      <div ref={combinedRef} className={cn('scroll-container', className)} {...rest}>
        {children}
        <div
          className="custom-scrollbar-thumb"
          style={{
            top: thumbTop,
            height: thumbHeight,
          }}
        />
      </div>
    )
  }
)
