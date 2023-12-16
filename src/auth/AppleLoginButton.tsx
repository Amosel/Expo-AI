import { Text } from '~/design/typography'
import { ButtonContainerA } from '~/design/button'
import { FontAwesome } from '@expo/vector-icons'
import {
  signInAsync,
  AppleAuthenticationScope,
  AppleAuthenticationCredential,
  // AppleAuthenticationFullName
} from 'expo-apple-authentication'
import { View } from '~/design/view'
import { Platform } from 'react-native'
import { } from 'expo-secure-store'
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

export const AppleLoginButton = () => {
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
          const cachedName: string = await Cache.getAppleLoginName(
            credential.user,
          )
          const givenName = credential.fullName?.givenName
          const detailsArePopulated: boolean = !!givenName && !!credential.email
          if (!detailsArePopulated && !cachedName) {
            await login(credential.identityToken)
          } else if (!detailsArePopulated && cachedName) {
            await createAccount(
              cachedName,
              credential.user,
              credential.identityToken,
            )
          } else {
            await createAccount(
              givenName,
              credential.user,
              credential.identityToken,
            )
          }
        } catch (error) {
          if (error.code === 'ERR_CANCELED') {
            onError('Continue was cancelled.')
          } else {
            onError(error.message)
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
