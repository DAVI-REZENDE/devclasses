import { Header } from '../components/Header'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />  
      </NextAuthProvider>
    </>
  )
}

export default MyApp
