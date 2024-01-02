import { Redirect, Stack } from 'expo-router'
import { View } from '~/design/view'
import { Text } from '~/design/typography'
import { ActivityIndicator } from 'react-native'
import { useAuth } from '~/auth'

export default function AppLayout() {
  const { initializing, user } = useAuth()
  console.log('\n\nLayout: ', {
    initializing,
    user,
  })

  if (initializing) {
    return (
      <View className='flex-1 justify-center items-center bg-lightWhite'>
        <ActivityIndicator />
        <Text>Loading</Text>
      </View>
    )
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/signin' />
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />
}
