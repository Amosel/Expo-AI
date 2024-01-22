import { SafeAreaView } from 'react-native-safe-area-context'
import { Zocial } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { View } from '~/design/view'
import { Text } from '~/design/typography'
import { Image } from '~/design/image'
import { ButtonContainerA } from '~/design/button'
import { useAuth } from '~/auth'
import { Redirect } from 'expo-router'

const SHOW_AUTH0 = false
const SHOW_APPLE = true

export default function Root() {
  const {
    user,
    onAppleButtonPress,
    onSignUpButtonPress,
    onEmailLoginButtonPress,
    onGoogleButtonPress,
  } = useAuth()

  // TODO: I expected (app)/_layout.tsx to re-evaluate when serss not refresh after user changes.
  if (user) {
    return <Redirect href='/(app)' />
  }

  return (
    <View className='flex-1 bg-pink-500 flex-col-reverse'>
      <SafeAreaView
        edges={['bottom']}
        className='justify-center items-center bg-pitchBlack rounded-t-3xl bottom-0 border-white '>
        <Text className='text-[20] text-center m-[10]'>
          Auth0Sample - Login
        </Text>
        <ButtonContainerA className='bg-white' onPress={onAppleButtonPress}>
          <View className='w-[24] h-[24] self-center'>
            <FontAwesome name='apple' size={24} color='black' />
          </View>
          <Text className='border-x text-center self-center text-black font-bold'>
            {' '}
            Continue with Apple{' '}
          </Text>
        </ButtonContainerA>
        {SHOW_APPLE && (
          <ButtonContainerA onPress={onGoogleButtonPress}>
            <Image
              source={require('../assets/images/google.png')}
              className='w-[18] h-[18] self-center'
            />
            <Text className='border-x text-center self-center text-white font-bold'>
              {' '}
              Continue with Google{' '}
            </Text>
          </ButtonContainerA>
        )}
        {SHOW_AUTH0 && (
          <ButtonContainerA onPress={onSignUpButtonPress}>
            <View className='w-[24] h-[24] self-center'>
              <Zocial name='email' size={24} color='white' />
            </View>
            <Text className='border-x text-center self-center text-white font-bold'>
              {' '}
              Sign up with email{' '}
            </Text>
          </ButtonContainerA>
        )}
        {SHOW_AUTH0 && (
          <ButtonContainerA
            className='bg-pitchBlack border-x border-y border-black'
            onPress={onEmailLoginButtonPress}>
            <Text className='border-x text-center self-center text-white font-bold'>
              {' '}
              Log In{' '}
            </Text>
          </ButtonContainerA>
        )}
      </SafeAreaView>
    </View>
  )
}
