import { View, Text, Platform } from 'react-native'
import { ButtonContainerA } from '~/design/button'
import { FontAwesome } from '@expo/vector-icons'
import type { AppleAuthenticationCredential } from 'expo-apple-authentication'
import {
  signInAsync,
  AppleAuthenticationScope,
  // AppleAuthenticationFullName
} from 'expo-apple-authentication'
// import { Platform } from 'react-native'
import ExpoSecureStorage from 'expo-secure-store'
import { useState } from 'react'
// import { z } from 'zod';

// const cancelled = z.object({
//   user: z.string(),
//   state: z.string().nullable,
//   fullName: AppleAuthenticationFullName | null;
//   email: string | null;
//   realUserStatus: AppleAuthenticationUserDetectionStatus;
//   identityToken: string | null;
//   authorizationCode: string | null;
// };

/*

@returns Email and name access
Be warned!

The email and fullName will only be populated ONCE. The first time they press the button, this applies even if they change their device or update the app. A user's email is still available in the JWT token, but once fullName gets pulled down the first time, you can never request it again and subsequent requests will return null.
*/

const Cache = {
  getAppleLoginName: (username: string) =>
    ExpoSecureStorage.getItemAsync(`login/${username}`),
}

async function createAccount(
  _cachedName: string,
  _user: string,
  _identityToken: string,
) {}
async function login(_identityToken: string) {}

export const AppleLoginButton = () => {
  const [_, onError] = useState<string>()
  if (Platform.OS !== 'ios') {
    return null
  }
  return (
    <ButtonContainerA
      className='bg-white'
      onPress={async () => {
        try {
          const credential: AppleAuthenticationCredential = await signInAsync({
            requestedScopes: [
              AppleAuthenticationScope.FULL_NAME,
              AppleAuthenticationScope.EMAIL,
            ],
          })
          const cachedName = await Cache.getAppleLoginName(credential.user)
          const givenName = credential.fullName?.givenName
          const detailsArePopulated: boolean = !!givenName && !!credential.email
          if (!detailsArePopulated && !cachedName) {
            await login(credential.identityToken!)
          } else if (!detailsArePopulated && cachedName) {
            await createAccount(
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
            await createAccount(
              givenName,
              credential.user,
              credential.identityToken,
            )
          }
        } catch (error) {
          if (
            typeof error === 'object' &&
            !!error &&
            'code' in error &&
            error.code === 'ERR_CANCELED'
          ) {
            onError('Continue was cancelled.')
          } else {
            onError((error as { messaage: string }).messaage)
          }
        }
      }}>
      <View className='w-[24] h-[24] self-center'>
        <FontAwesome name='apple' size={24} color='black' />
      </View>
      <Text className='border-x text-center self-center text-black font-bold'>
        {' '}
        Continue with Apple{' '}
      </Text>
    </ButtonContainerA>
  )
}
