import { SafeAreaView } from 'react-native-safe-area-context'
import { Zocial } from '@expo/vector-icons'
import { View } from '~/design/view'
import { Text } from '~/design/typography'
import { Image } from '~/design/image'
import { ButtonContainerA } from '~/design/button'
import { FontAwesome } from '@expo/vector-icons'
import { useSession } from '~/auth'

export default function Root() {
  const session = useSession()
  return (
    <View className='flex-1 bg-pink-500 flex-col-reverse'>
      <SafeAreaView
        edges={['bottom']}
        className='justify-center items-center bg-pitchBlack rounded-t-3xl bottom-0 border-white'>
        <Text className='text-[20] text-center m-[10]'>
          Auth0Sample - Login
        </Text>
        <ButtonContainerA
          className='bg-white'
          onPress={session?.handleAppleSignIn}>
          <View className='w-[24] h-[24] self-center'>
            <FontAwesome name='apple' size={24} color='black' />
          </View>
          <Text className='border-x text-center self-center text-black font-bold'>
            {' '}
            Continue with Apple{' '}
          </Text>
        </ButtonContainerA>
        <ButtonContainerA onPress={session?.handleGoogleSignIn}>
          <Image
            source={require('../assets/images/google.png')}
            className='w-[18] h-[18] self-center'
          />
          <Text className='border-x text-center self-center text-white font-bold'>
            {' '}
            Continue with Google{' '}
          </Text>
        </ButtonContainerA>

        <ButtonContainerA onPress={session?.handleAuth0SignUp}>
          <View className='w-[24] h-[24] self-center'>
            <Zocial name='email' size={24} color='white' />
          </View>
          <Text className='border-x text-center self-center text-white font-bold'>
            {' '}
            Sign up with email{' '}
          </Text>
        </ButtonContainerA>
        <ButtonContainerA
          className='bg-pitchBlack border-x border-y border-black'
          onPress={session?.handleAuth0Login}>
          <Text className='border-x text-center self-center text-white font-bold'>
            {' '}
            Log In{' '}
          </Text>
        </ButtonContainerA>
      </SafeAreaView>
    </View>
  )
}
