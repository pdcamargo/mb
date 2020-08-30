import React from 'react'

import { AppProps } from 'next/app'

import AuthContainer from '@/contexts/auth/AuthContainer'
import ThemeContainer from '@/contexts/theme/ThemeContainer'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthContainer>
      <ThemeContainer>
        <Component {...pageProps} />
      </ThemeContainer>
    </AuthContainer>
  )
}

export default MyApp
