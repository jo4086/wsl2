import type { Ref, RefCallback, MutableRefObject } from 'react'

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        // ref가 객체일 경우 (React.createRef / useRef 등)
        ;(ref as MutableRefObject<T>).current = value
      }
    })
  }
}
