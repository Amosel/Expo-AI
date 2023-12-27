import { Redirect, Stack } from 'expo-router'
import { View } from '~/design/view'
import { Text } from '~/design/typography'
import { ActivityIndicator } from 'react-native'
import { useSession } from '~/auth'

export default function AppLayout() {
  const { loading, auth, error } = useSession()
  if (loading) {
    return (
      <View className='flex-1 justify-center items-center bg-lightWhite'>
        <ActivityIndicator />
        <Text>Loading</Text>
      </View>
    )
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!auth) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/auth' />
  } else if (error) {
    return <Redirect href='/auth' />
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />
}
