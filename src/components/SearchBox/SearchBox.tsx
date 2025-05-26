import type { SearchBoxProps } from '@components/types'

export const SearchBox = ({ value, onChange, onFocus, onBlur }: SearchBoxProps) => {
  return (
    <div className="search">
      <input
        placeholder="search..."
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <i className="ri-search-line search-icon"></i>
    </div>
  )
}

export default SearchBox
