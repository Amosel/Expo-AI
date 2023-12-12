import { Button } from 'react-native'
import { View } from '~/design/view'
import { Text } from '~/design/typography'
import { useAuth0 } from 'react-native-auth0'

export default function () {
  const { user, error, clearSession } = useAuth0()
  const onLogout = async () => {
    await clearSession({}, {})
  }

  return (
    <View className='flex-1 justify-center items-center bg-lightWhite'>
      <Text className='text-[20] text-center m-[10]'>
        {' '}
        Auth0Sample - Login{' '}
      </Text>
      {user && <Text>You are logged in as {user.name}</Text>}
      {!user && <Text>You are not logged in</Text>}
      <Button onPress={onLogout} title={'Log Out'} />
      {error && (
        <Text className='m-[20] text-center text-error'>{error.message}</Text>
      )}
    </View>
  )
}
