interface TabProps {
  children: React.ReactNode
}

const tabStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',

  padding: '2rem',
  borderRadius: '1rem',
}

export const Tab = ({ children }: TabProps) => {
  return <div style={tabStyle}>{children}</div>
}
