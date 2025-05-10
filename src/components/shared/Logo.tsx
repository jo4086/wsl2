interface LogoTypes {
  viewBox: {
    x: number
    y: number
    width: number
    height: number
  }
  width: number
  height: number
  rect: {
    x: number
    offsetX?: number
    y: number
    offsetY?: number
    width: number
    height: number
    fill: string
    rx?: number
    ry?: number
  }
  text: {
    size: string | number
  }
  className?: string
}

export const Logo = ({ viewBox, rect, width, height, text, className }: LogoTypes) => {
  const parsedFontSize =
    typeof text.size === 'string'
      ? parseFloat(text.size) // '3rem' → 3
      : text.size

  const dy = parsedFontSize * 1 // 보정 계수 (경험상 0.3~0.4 적당)

  return (
    <svg
      className={className}
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <a href="/">
        <rect
          x={rect.x + (rect.offsetX ?? 0)}
          y={rect.y + (rect.offsetY ?? 0)}
          width={rect.width}
          height={rect.height}
          fill={rect.fill}
          rx={rect.rx ?? 0}
          ry={rect.ry ?? 0}
        />
        <text
          x={viewBox.x + viewBox.width / 2}
          y={viewBox.y + viewBox.height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          dy={`${dy}`}
          fill="white"
          fontSize={text.size}
          fontFamily="JetBrains Mono"
        >
          My Blog
        </text>
      </a>
    </svg>
  )
}
