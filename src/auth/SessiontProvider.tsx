import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Auth0Provider, useAuth0 } from 'react-native-auth0'
import { apple_auth_login } from './apple_auth'
import { coerce_to_google_sign_in_error_or_bail } from './google_auth'
import {
  statusCodes,
  GoogleSignin,
  // type OneTapUser,
} from '@react-native-google-signin/google-signin'
export { apple_auth_login } from './apple_auth'
export { auth0_loging } from './auth0_auth'
import { type Auth0ContextInterface } from 'react-native-auth0/lib/typescript/src/hooks/auth0-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginMethodsNames = ['apple', 'google', 'auth0']
type LogingMethods = (typeof LoginMethodsNames)[number]
type Auth =
  | {
      provider: 'google'
      user: Awaited<ReturnType<typeof GoogleSignin.signIn>>
    }
  | { provider: 'apple'; user: Awaited<ReturnType<typeof apple_auth_login>> }
  | {
      provider: 'auth0'
      user: Awaited<
        ReturnType<NonNullable<Auth0ContextInterface['getCredentials']>>
      >
    }

interface SessionData {
  loading: LogingMethods | false
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
  const [initializing, setSetInitializing] = useState(true)
  const [loading, setLoading] = useState<LogingMethods | false>(false)
  const [auth, setAuth] = useState<Auth>()
  const [error, setError] = useState<any>()

  useEffect(() => {
    if (initializing) {
      AsyncStorage.getItem('auth').then(async data => {
        if (typeof data === 'string' && LoginMethodsNames.includes(data)) {
          const d = data as LogingMethods
          switch (d) {
            case 'apple': {
              setSetInitializing(false)
              break
            }
            case 'auth0': {
              try {
                const user = await auth0.getCredentials()
                setAuth({
                  provider: 'auth0',
                  user,
                })
              } catch (e) {
                console.log('Failed getting auth0 creds', e)
              } finally {
                setSetInitializing(false)
              }
              break
            }
            case 'google': {
              setLoading('google')
              GoogleSignin.signInSilently()
                .then(() => {})
                .finally(() => {
                  setSetInitializing(false)
                })

              break
            }
          }
        }
      })
      setSetInitializing(true)
    }
  }, [initializing, auth0])

  useEffect(() => {
    switch (auth?.provider) {
      case 'apple': {
        break
      }
      case 'auth0': {
        break
      }
      case 'google': {
        break
      }
    }
    auth0.getCredentials()
  }, [auth?.user, auth?.provider, auth0])

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
      if (await GoogleSignin.hasPlayServices()) {
        return GoogleSignin.signIn()
      }
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
    } finally {
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
