import { Auth0Provider } from 'react-native-auth0'
// import * as AppleAuthentication from 'expo-apple-authentication'
import { Slot } from 'expo-router'
import config from '~/auth/auth0.config'

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <Slot />
    </Auth0Provider>
  )
}
