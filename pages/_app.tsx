import type { AppProps } from 'next/app'

import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

import { lightTheme } from '../themes'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
