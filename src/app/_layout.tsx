import { Auth0Provider } from 'react-native-auth0'
import { Slot } from 'expo-router'

console.log('Auth:', {
  domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN as string,
  clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID as string,
})
export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <Auth0Provider
      domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN as string}
      clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID as string}>
      <Slot />
    </Auth0Provider>
  )
}
