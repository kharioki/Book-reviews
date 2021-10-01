import React, { useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

import ProductView from './components/ProductView';
import AddRating from './components/AddRating';
import { API_URL, WSS_URL } from './Utils';

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

const link = new WebSocketLink({
  uri: WSS_URL,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  uri: API_URL,
  cache: new InMemoryCache(),
});

function App() {
  const ref = useRef();
  const handleFocus = () => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Container>
        <ProductView onClick={() => handleFocus()} />
        <AddRating ref={ref} />
      </Container>
    </ApolloProvider>
  );
}

export default App;
