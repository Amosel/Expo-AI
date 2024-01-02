import { View } from '~/design/view'
import { Text } from '~/design/typography'

export default function TabTwoScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-xl font-bold'>Tab Two</Text>
      <View className='my-6 h-[1] w-4/5' />
    </View>
  )
}
