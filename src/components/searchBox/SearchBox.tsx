import type { SearchBoxProps } from '@components/types'

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

export default SearchBox
