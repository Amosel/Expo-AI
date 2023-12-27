import React, { ReactNode, createContext, useContext, useState } from 'react'
import { Auth0Provider, useAuth0 } from 'react-native-auth0'
import { apple_auth_login } from './apple_auth'
import {
  coerce_to_google_sign_in_error_or_bail,
  google_auth_login,
} from './google_auth'
import { statusCodes } from '@react-native-google-signin/google-signin'
export { apple_auth_login } from './apple_auth'
export { auth0_loging } from './auth0_auth'
import { type Auth0ContextInterface } from 'react-native-auth0/lib/typescript/src/hooks/auth0-context'

type LoadingMethods = 'apple' | 'google' | 'auth0'
type Auth =
  | { provider: 'google'; user: Awaited<ReturnType<typeof google_auth_login>> }
  | { provider: 'apple'; user: Awaited<ReturnType<typeof apple_auth_login>> }
  | {
      provider: 'auth0'
      user: Awaited<
        ReturnType<NonNullable<Auth0ContextInterface['getCredentials']>>
      >
    }

interface SessionData {
  loading: LoadingMethods | false
  auth?: Auth
  error?: any
  handleAppleSignIn(): void
  handleAuth0SignUp(): void
  handleAuth0Login(): void
  handleGoogleSignIn(): void
}

const SessionContext = createContext<SessionData>({
  loading: false,
  handleAppleSignIn() {},
  handleAuth0SignUp() {},
  handleAuth0Login() {},
  handleGoogleSignIn() {},
})

type SessionProviderProps = {
  children: ReactNode
}

const SessionProviderInner: React.FC<SessionProviderProps> = ({ children }) => {
  const auth0 = useAuth0()
  const [loading, setLoading] = useState<LoadingMethods | false>(false)
  const [auth, setAuth] = useState<Auth>()
  const [error, setError] = useState<any>()

  const handleAppleSignIn = async () => {
    if (loading) {
      return
    }
    setLoading('apple')
    await apple_auth_login()
    setLoading(false)
  }

  const handleAuth0SignUp = async () => {
    if (loading) {
      return
    }
    setLoading('auth0')
    try {
      await auth0.authorize({}, {})
      const user = await auth0.getCredentials()
      if (user) {
        setAuth({
          provider: 'auth0',
          user,
        })
      } else {
        setAuth(undefined)
      }
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const handleAuth0Login = async () => {
    if (loading) {
      return
    }
    setLoading('auth0')
    try {
      await auth0.authorize({}, {})
      const user = await auth0.getCredentials()
      if (user) {
        setAuth({
          provider: 'auth0',
          user,
        })
      } else {
        setAuth(undefined)
      }
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    if (loading) {
      return
    }
    setLoading('google')
    try {
      google_auth_login()
    } catch (e) {
      switch (coerce_to_google_sign_in_error_or_bail(e)) {
        case statusCodes.SIGN_IN_CANCELLED: {
          // user cancelled the login flow
          break
        }
        case statusCodes.IN_PROGRESS: {
          // operation (e.g. sign in) is in progress already
          break
        }
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: {
          // play services not available or outdated
          break
        }
        default: {
        }
      }
      setLoading(false)
    }
  }

  // Provide the authentication functions and session data to the context
  return (
    <SessionContext.Provider
      value={{
        loading,
        auth,
        error,
        handleAppleSignIn,
        handleAuth0SignUp,
        handleAuth0Login,
        handleGoogleSignIn,
      }}>
      {children}
    </SessionContext.Provider>
  )
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => (
  <Auth0Provider
    domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN as string}
    clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID as string}>
    <SessionProviderInner>{children}</SessionProviderInner>
  </Auth0Provider>
)
export const useSession = () => useContext(SessionContext)
