import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import {
  signInAsync,
  AppleAuthenticationScope,
  type AppleAuthenticationCredential,
} from 'expo-apple-authentication'
import { digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto'

GoogleSignin.configure({
  webClientId: '',
})

const fn = {
  onGoogleButtonPress,
  onAppleButtonPress,
  onSignUpButtonPress,
  onEmailLoginButtonPress,
  signOut: () => auth().signOut(),
} as const

type SessionData = {
  initializing: boolean
  user?: FirebaseAuthTypes.User
  error?: any
} & typeof fn

const SessionContext = createContext<SessionData>({
  initializing: true,
  ...fn,
})

async function onSignUpButtonPress() {}

async function onEmailLoginButtonPress() {}

async function onAppleButtonPress() {
  const nonce = await digestStringAsync(
    CryptoDigestAlgorithm.SHA256,
    Math.random().toString(36).substring(2, 10),
  )
  const appleAuthRequestResponse: AppleAuthenticationCredential =
    await signInAsync({
      nonce,
      requestedScopes: [
        AppleAuthenticationScope.FULL_NAME,
        AppleAuthenticationScope.EMAIL,
      ],
    })
  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned')
  }

  // Create a Firebase credential from the response
  const { identityToken } = appleAuthRequestResponse
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  )

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential)
}

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn()

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential)
}

let once = true

export const SessionProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User>()

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(_user => {
      setUser(_user ?? undefined)
      if (initializing) {
        setInitializing(false)
      }
    })
    return subscriber // unsubscribe on unmount
  }, [initializing, user])

  useEffect(() => {
    if (user && once) {
      once = false
      console.log('Auth User')
      // console.log('Auth User', JSON.stringify(user, null, 2))
    } else if (!user && !once) {
      once = true
      console.log('logged out')
    }
  }, [user])

  // Provide the authentication functions and session data to the context
  return (
    <SessionContext.Provider
      value={{
        initializing,
        user,
        ...fn,
      }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useAuth = () => useContext(SessionContext)
