import { Text } from '~/design/typography'
import { ButtonContainerA } from '~/design/button'
import { View } from '~/design/view'
import { Zocial } from '@expo/vector-icons'
import { Alert } from 'react-native'
import { useAuth0 } from 'react-native-auth0'

export const Auth0LoginButton = () => {
  const { getCredentials, authorize } = useAuth0()
  const onLogin = async () => {
    await authorize({}, {})
    const credentials = await getCredentials()
    Alert.alert('AccessToken: ' + credentials?.accessToken)
  }
  return (
    <ButtonContainerA onPress={onLogin}>
      <View className='w-[24] h-[24] self-center'>
        <Zocial name='email' size={24} color='white' />
      </View>
      <Text className='border-x text-center self-center text-white font-bold'>
        {' '}
        Sign up with email{' '}
      </Text>
    </ButtonContainerA>
  )
}

export const Auth0SignupButton = () => {
  const { getCredentials, authorize } = useAuth0()
  const onLogin = async () => {
    await authorize({}, {})
    const credentials = await getCredentials()
    Alert.alert('AccessToken: ' + credentials?.accessToken)
  }
  return (
    <ButtonContainerA
      className='bg-pitchBlack border-x border-y border-black'
      onPress={onLogin}>
      <Text className='border-x text-center self-center text-white font-bold'>
        {' '}
        Log In{' '}
      </Text>
    </ButtonContainerA>
  )
}
