import { Redirect, Stack } from 'expo-router'
import { useAuth0 } from 'react-native-auth0'
import { View } from '~/design/view'
import { Text } from '~/design/typography'

export default function AppLayout() {
  const { user, error, isLoading } = useAuth0()

  const loggedIn = user !== undefined && user !== null
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center bg-lightWhite'>
        <Text>Loading</Text>
      </View>
    )
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!loggedIn) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/sign-in' />
  } else if (error) {
    return <Redirect href='/sign-in' />
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />
}
