import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/react'
import theme from '../theme'
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange, Cache, QueryInput} from '@urql/exchange-graphcache';
import { MeDocument } from '../generated/graphql';

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any)
}

const client = createClient({
  url: "http://localhost:5001/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (result, args, cache, info) => {
          cache.updateQuery({query: MeDocument}, )
        }
      }
    }
  }), fetchExchange],
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
