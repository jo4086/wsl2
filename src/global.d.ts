import 'react'
import type * as React from 'react'

type XPos = 'left' | 'center' | 'right'
type YPos = 'top' | 'center' | 'bottom'
/**
 * position: 'X Y' string format / 문자열 형식
 * - X-axis / X축: `'left'` | `'center'` | `'right'`
 * - Y-axis / Y축: `'top'` | `'center'` | `'bottom'`
 *
 * e.g.
 * - `position="center"`       →  fully centered / 수평·수직 모두 중앙 정렬
 * - `position="left center"`  →  aligned to the left, vertically centered / 왼쪽 정렬 + 수직 중앙 정렬
 * - `position="right top"`    →  aligned to the right and top / 오른쪽 정렬 + 위쪽 정렬
 */
type Position = 'center' | `${XPos} ${YPos}` | `${XPos} center` | `center ${YPos}`

/* declare module 'react' {
  namespace JSX {
         interface IntrinsicElements {
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
        anchor?: string
      }
    } 
         interface IntrinsicElements {
      button: React.ButtonHTMLAttributes<HTMLButtonElement> & { anchor?: string }
    } 
    interface IntrinsicElements {
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
        anchor?: string
      }
    }
  }
} */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
        anchor?: any
      }
    }
  }
}

/* declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
        anchor?: string
        'anchor-positionX'?: XPos
        'anchor-positionY'?: YPos
        'anchor-position'?: Position
      }
    }
  }
} */

export {}
