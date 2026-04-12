import '../styles/globals.css'
import type {AppProps} from 'next/app'
import AuthContext from "@/contexts/AuthContext";
import CollectionContext from "@/contexts/CollectionContext";
import AlertContext from "@/contexts/AlertContext";


function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthContext>
      <AlertContext>
        <CollectionContext>
          <Component {...pageProps} />
        </CollectionContext>
      </AlertContext>
    </AuthContext>
  )
}

export default MyApp
