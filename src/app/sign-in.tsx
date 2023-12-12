import { router } from 'expo-router'
import { View } from '~/design/view'
import { Text } from '~/design/typography'
import { useAuth0 } from 'react-native-auth0'
import { Alert } from 'react-native'

export default function SignIn() {
  const { authorize, getCredentials } = useAuth0()

  const signIn = async () => {
    await authorize({}, {})
    const credentials = await getCredentials()
    Alert.alert('AccessToken: ' + credentials?.accessToken)
  }

  return (
    <View className='flex-1 justify-center items-center'>
      <Text
        onPress={() => {
          signIn()
            .then(() => {
              // Navigate after signing in
              router.replace('/')
            })
            .catch(error => {
              Alert.alert('Failed Loggin in: ' + error)
              // router.replace('/error')
            })
        }}>
        Sign In
      </Text>
    </View>
  )
}
