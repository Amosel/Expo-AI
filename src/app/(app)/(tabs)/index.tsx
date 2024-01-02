import { View } from '~/design/view'
import { Text } from '~/design/typography'
import { Link } from 'expo-router'
import { Pressable } from 'react-native'

export default function TabOneScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-xl font-bold'>Tab One</Text>
      <View className='my-5 h-[1] w-4/5 dark:text-dark text-light' />
      <Link href='/login' asChild>
        <Pressable>{() => <Text>Login</Text>}</Pressable>
      </Link>
    </View>
  )
}
