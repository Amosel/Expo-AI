import { SplashScreen, Redirect, Stack } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { View } from '~/design/view'
import { Text } from '~/design/typography'
import { ActivityIndicator } from 'react-native'
import { useAuth } from '~/auth'
import { useEffect } from 'react'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function AppLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('~/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  const { initializing, user } = useAuth()

  console.log('\n\nLayout: ', {
    initializing,
    user,
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  if (!loaded) {
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
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
    </Stack>
  )
}
