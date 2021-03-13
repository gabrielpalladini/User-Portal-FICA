import React from 'react';
import {ThemeProvider, CSSReset} from '@chakra-ui/react'
import theme from '../theme'
import { Provider, createClient } from "urql";

const client = createClient({url: "localhost:5000/graphql"})

function MyApp({Component, pageProps}) {
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
