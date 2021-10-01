import styled, { createGlobalStyle } from 'styled-components';

import ProductView from './components/ProductView';
import AddRating from './components/AddRating';

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
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: var(--background);
  padding-bottom: 20px;

  @media screen and (max-width: 600px) {
    height: 100%;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <Container>
        <ProductView />
        <AddRating />
      </Container>
    </div>
  );
}

export default App;
