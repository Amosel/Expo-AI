import ExpoSecureStorage from 'expo-secure-store'

export const AuthCache = {
  getAppleLoginName: (username: string) =>
    ExpoSecureStorage.getItemAsync(`login/${username}`),
}

export const auth_backend_create_account = async (
  _cachedName: string,
  _user: string,
  _identityToken: string,
) => {}
export const auth_backend_login = async (_identityToken: string) => {}
