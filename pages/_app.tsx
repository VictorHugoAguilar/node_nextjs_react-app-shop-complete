import type { AppProps } from 'next/app'

import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

import { lightTheme } from '../themes'

import '../styles/globals.css'
import { SWRConfig } from 'swr'
import { UiProvider } from '../context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // Interval a modo de refresh para obtención de datos
        // refreshInterval: 500,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }} >
      <UiProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </SWRConfig>
  )
}

export default MyApp
