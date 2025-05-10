import { TabItem } from './TabItem'
import { Tab } from './Tab'
import { Logo } from './Logo'

const naviStyle: React.CSSProperties = {
  display: 'flex',

  position: 'fixed',
  top: '0',
  left: '0',

  width: '100%',
  height: '80px',
  padding: '0',

  backgroundColor: '#f3f3f3',
  zIndex: '999',
}

export const Navigate = () => {
  return (
    <div style={naviStyle}>
      <Logo
        viewBox={{ x: 0, y: 0, width: 300, height: 100 }}
        width={290}
        height={80}
        rect={{
          x: 0,
          y: 10,
          width: 300,
          height: 80,
          rx: 10,
          ry: 10,
          fill: '#2196F3',
        }}
        text={{ size: '3rem' }}
      />
      <Tab>
        <TabItem label="탭1" link="/home" />
      </Tab>
    </div>
  )
}
