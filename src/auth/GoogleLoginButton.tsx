import { Text } from '~/design/typography'
import { ButtonContainerA } from '~/design/button'
import { Image } from '~/design/image'
import {
  statusCodes,
  GoogleSignin,
  type OneTapUser,
} from '@react-native-google-signin/google-signin'
import { client } from '../../google-services.json'

interface userInfo {
  idToken: string
  serverAuthCode: string
  scopes: Array<string>
  user: {
    email: string
    id: string
    givenName: string
    familyName: string
    photo: string // url
    name: string // full name
  }
}

GoogleSignin.configure({
  // iosClientId: client[0].client_info.mobilesdk_app_id,
})

export const GoogleLoginButton = () => {
  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log('Google Sign in', userInfo)
      // setState({ userInfo })
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  return (
    <ButtonContainerA onPress={signIn}>
      <Image
        source={require('../assets/images/google.png')}
        className='w-[18] h-[18] self-center'
      />
      <Text className='border-x text-center self-center text-white font-bold'>
        {' '}
        Continue with Google{' '}
      </Text>
    </ButtonContainerA>
  )
}
