import '../styles/globals.css'
import {ThemeProvider} from 'next-themes'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SessionProvider } from "next-auth/react"
import 'animate.css';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <SessionProvider session={session}>
          <ThemeProvider defaultTheme="system">
            <Component {...pageProps} />
          </ThemeProvider>
      </SessionProvider>
  )
}
export default MyApp
