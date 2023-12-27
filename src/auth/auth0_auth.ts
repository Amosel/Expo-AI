import { Auth0ContextInterface } from 'react-native-auth0/lib/typescript/src/hooks/auth0-context'

export const auth0_loging = async ({
  authorize,
  getCredentials,
}: Auth0ContextInterface) => {
  await authorize({}, {})
  return await getCredentials()
}
