import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { PokemonProvider } from '@/src/store';

export default function App({ Component, pageProps }: AppProps) {
  return <PokemonProvider pokemon={  pageProps.pokemon  }>
          <Component {...pageProps} />
        </PokemonProvider>
}
