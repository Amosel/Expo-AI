import { Text } from '~/design/typography'
import { ButtonContainerA } from '~/design/button'
import { Image } from '~/design/image'
import {
  statusCodes,
  GoogleSignin,
  // type OneTapUser,
} from '@react-native-google-signin/google-signin'
// import { client } from '../../google-services.json'

// interface userInfo {
//   idToken: string
//   serverAuthCode: string
//   scopes: Array<string>
//   user: {
//     email: string
//     id: string
//     givenName: string
//     familyName: string
//     photo: string // url
//     name: string // full name
//   }
// }

GoogleSignin.configure({
  // iosClientId: client[0].client_info.mobilesdk_app_id,
})

const coerce_to_google_sign_in_error_or_bail = (error: any) => {
  if (
    typeof error === 'object' &&
    !!error &&
    'code' in error &&
    Object.keys(statusCodes).includes(error.code)
  ) {
    const google_signin_error = error as {
      code: keyof typeof statusCodes
    }
    switch (google_signin_error.code) {
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
  } else {
  }
}
export const GoogleLoginButton = () => {
  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log('Google Sign in', userInfo)
      // setState({ userInfo })
    } catch (error) {
      coerce_to_google_sign_in_error_or_bail(error)
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
