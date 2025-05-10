import React from 'react'

interface TabItemProps {
  label: string
  link: string
}

const TabItemStyle: React.CSSProperties = {
  display: 'flex',
  textAlign: 'center',
  justifyItems: 'center',
  alignItems: 'center',
}

export const TabItem = ({ label, link }: TabItemProps) => {
  return (
    <a href={link} style={TabItemStyle}>
      {label}
    </a>
  )
}
