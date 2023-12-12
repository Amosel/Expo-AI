import { Text } from '~/design/typography'
import { ButtonContainerA } from '~/design/button'
import { FontAwesome } from '@expo/vector-icons'
import {
  signInAsync,
  AppleAuthenticationScope,
} from 'expo-apple-authentication'
import { View } from '~/design/view'
import { Platform } from 'react-native'

export const AppleLoginButton = () => {
  if (Platform.OS !== 'ios') {
    return null
  }
  async function login() {
    try {
      const credential = await signInAsync({
        requestedScopes: [
          // AppleAuthenticationScope.FULL_NAME,
          AppleAuthenticationScope.EMAIL,
        ],
      })
      console.log('Signed in')

      // signed in
    } catch (e) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        console.error('Apple Auth', e)
        // handle other errors
      }
    }
  }
  return (
    <ButtonContainerA className='bg-white' onPress={login}>
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
