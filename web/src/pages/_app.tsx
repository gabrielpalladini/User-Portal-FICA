import React from 'react';
import {ThemeProvider, CSSReset} from '@chakra-ui/react'
import theme from '../theme'
import { Provider, createClient } from "urql";

const client = createClient({
  url: "http://localhost:5001/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({Component, pageProps}: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CSSReset/>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
