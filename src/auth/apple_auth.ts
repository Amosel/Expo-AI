import type { AppleAuthenticationCredential } from 'expo-apple-authentication'
import {
  signInAsync,
  AppleAuthenticationScope,
} from 'expo-apple-authentication'
import {
  AuthCache,
  auth_backend_create_account,
  auth_backend_login,
} from './auth_backend'

export const apple_auth_login = async () => {
  try {
    const credential: AppleAuthenticationCredential = await signInAsync({
      requestedScopes: [
        AppleAuthenticationScope.FULL_NAME,
        AppleAuthenticationScope.EMAIL,
      ],
    })
    const cachedName = await AuthCache.getAppleLoginName(credential.user)
    const givenName = credential.fullName?.givenName
    const detailsArePopulated: boolean = !!givenName && !!credential.email
    if (!detailsArePopulated && !cachedName) {
      await auth_backend_login(credential.identityToken!)
    } else if (!detailsArePopulated && cachedName) {
      await auth_backend_create_account(
        cachedName,
        credential.user,
        credential.identityToken!,
      )
    } else {
      if (!givenName) {
        throw Error('Given Name is null')
      }
      if (!credential.identityToken) {
        throw Error('Given Name is null')
      }
      await auth_backend_create_account(
        givenName,
        credential.user,
        credential.identityToken,
      )
      return 'apple-login'
    }
  } catch (error) {
    if (
      typeof error === 'object' &&
      !!error &&
      'code' in error &&
      error.code === 'ERR_CANCELED'
    ) {
      throw new Error('Continue was cancelled.')
    } else {
      throw new Error((error as { messaage: string }).messaage)
    }
  }
}
