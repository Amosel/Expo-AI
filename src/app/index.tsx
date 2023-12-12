import { View } from '~/design/view'
import { Text } from '~/design/typography'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppleLoginButton } from '../auth/AppleLoginButton'
import { GoogleLoginButton } from '../auth/GoogleLoginButton'
import { Auth0LoginButton, Auth0SignupButton } from '../auth/Auth0LoginButton'

export default function root() {
  return (
    <View className='flex-1 bg-pink-500 flex-col-reverse'>
      <SafeAreaView
        edges={['bottom']}
        className='justify-center items-center bg-pitchBlack rounded-t-3xl bottom-0 border-white'>
        <Text className='text-[20] text-center m-[10]'>
          Auth0Sample - Login
        </Text>
        <AppleLoginButton />
        <GoogleLoginButton />
        <Auth0LoginButton />
        <Auth0SignupButton />
      </SafeAreaView>
    </View>
  )
}
