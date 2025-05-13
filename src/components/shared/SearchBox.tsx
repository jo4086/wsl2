import { useState, useEffect, useRef, type ReactEventHandler } from 'react'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  onFocus: () => void
  onBlur: () => void
}

export const SearchBox = ({ value, onChange, onFocus, onBlur }: SearchBoxProps) => {
  return (
    <div className="search">
      <input
        placeholder="search"
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <img alt="search-icon" src="search-line.svg" />
    </div>
  )
}
