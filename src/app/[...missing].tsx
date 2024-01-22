import { Link, Stack, usePathname } from 'expo-router'

import { View } from '~/design/view'
import { Text } from '~/design/typography'

export default function NotFoundScreen() {
  const path = usePathname()
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className='flex-1 items-center justify-center p-5'>
        <Text className='text-xl font-bold mb-4'>
          {(path && `${path} doesn't exist`) || 'Unknown Path'}
        </Text>
        <Link href='/' className='mt-3 px-3'>
          <Text className='text-l text-link'>Go to home screen!</Text>
        </Link>
      </View>
    </>
  )
}
