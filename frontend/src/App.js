import GlobalStyle from './styles/global'
import { Container, Content } from './style'

import Upload from './components/Upload'

function App() {
  return (
    <>
      <Container>
        <Content>
          <Upload />
        </Content>
      </Container>
      <GlobalStyle />
    </>
  );
}

export default App;
