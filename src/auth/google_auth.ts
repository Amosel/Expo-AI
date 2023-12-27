import {
  statusCodes,
  GoogleSignin,
  // type OneTapUser,
} from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
  // iosClientId: client[0].client_info.mobilesdk_app_id,
})

export const coerce_to_google_sign_in_error_or_bail = (error: any) => {
  if (
    typeof error === 'object' &&
    !!error &&
    'code' in error &&
    Object.keys(statusCodes).includes(error.code)
  ) {
    return (
      error as {
        code: keyof typeof statusCodes
      }
    ).code
  } else {
    return null
  }
}

export const google_auth_login = async () => {
  await GoogleSignin.hasPlayServices()
  return GoogleSignin.signIn()
}
