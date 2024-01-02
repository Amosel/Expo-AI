import { Button } from 'react-native'
import { View } from '~/design/view'
import { Text } from '~/design/typography'
import { useAuth } from '~/auth'

export default function () {
  const { user, signOut } = useAuth()
  // let error: { message: string } | null = null
  return (
    <View className='flex-1 justify-center items-center bg-lightWhite'>
      <Text className='text-[20] text-center m-[10]'>
        {' '}
        Auth0Sample - Login{' '}
      </Text>
      {user && <Text>You are logged in as {user?.email}</Text>}
      {!user && <Text>You are not logged in</Text>}
      <Button onPress={signOut} title={'Log Out'} />
      {/* {error && (
        <Text className='m-[20] text-center text-error'>{error.message}</Text>
      )} */}
    </View>
  )
}
