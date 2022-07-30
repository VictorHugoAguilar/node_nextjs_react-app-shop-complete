import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

import { lightTheme } from '../themes'

import '../styles/globals.css'
import { SWRConfig } from 'swr'
import { AuthProvider, CartProvider, UiProvider } from '../context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          // Interval a modo de refresh para obtención de datos
          // refreshInterval: 500,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }} >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
