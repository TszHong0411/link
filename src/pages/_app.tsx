import { ColorScheme, ColorSchemeProvider, Global, MantineProvider } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { getCookie, setCookies } from 'cookies-next'
import { GetServerSidePropsContext } from 'next'
import type { AppProps } from 'next/app'
import React from 'react'

import Layout from '@/components/Layout'

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(props.colorScheme)

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
    setCookies('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily:
            'Sora,Noto Sans TC,Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
          primaryColor: 'red',
          breakpoints: {
            xs: 375,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
          },
        }}
      >
        <ModalsProvider>
          <NotificationsProvider>
            <Global
              styles={() => ({
                html: {
                  scrollBehavior: 'smooth',
                },
                'ol, ul, menu': {
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                },
                '::selection': {
                  background: 'rgb(249, 6, 6, 0.05)',
                  color: '#f90606',
                },
                '::-webkit-scrollbar': {
                  width: 7,
                  height: 5,
                },
                '::-webkit-scrollbar-thumb': {
                  background: '#ef4444',
                  transition: '0.25s',
                  borderRadius: 2,
                },
                '::-webkit-scrollbar-track': {
                  background: '0 0',
                },
                // https://stackoverflow.com/questions/61083813/how-to-avoid-internal-autofill-selected-style-to-be-applied
                'input:-webkit-autofill, input:-webkit-autofill:focus': {
                  transition: 'background-color 600000s 0s, color 600000s 0s',
                },
              })}
            />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
})
