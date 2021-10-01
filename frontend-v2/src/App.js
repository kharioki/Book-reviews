import styled, { createGlobalStyle } from 'styled-components';

import ProductView from './components/ProductView';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }

  html {
    --gold: #ffcc00;
    --background: gainsboro;
    --light-gray: #ccc;
    --dark-gray: #555;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    /* box-sizing: inherit; */
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: var(--background);
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <Container>
        <ProductView />
      </Container>
    </div>
  );
}

export default App;
