import { Container } from '@components/index'

export const Home = ({}) => {
  return (
    <Container
      className="main_container"
      style={{
        width: '100%',
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: '500px',
      }}
    >
      <Container className="main_content">
        <p className="annots" style={{ display: 'block' }}>
          <span style={{ display: 'block', backgroundColor: 'orange' }}>11</span>
          <span>22</span>
        </p>
        <p className="annots">hiasdasdsasadsa</p>
        <p className="annots">hiasdasdsasadsa</p>
      </Container>
      <Container className="scroll_content">
        <p className="annots">hi</p>
      </Container>
    </Container>
  )
}
