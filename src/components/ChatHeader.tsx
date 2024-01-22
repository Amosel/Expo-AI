import { Image } from '~/design/image'
import { View } from '~/design/view'
import { Text } from '~/design/typography'

export const ChatHeader = ({
  image,
  name,
}: {
  image: string
  name: string
}) => {
  return (
    <View className='flex-row px-3 items-center'>
      <Image className='h-10 w-10 rounded-full mr-4' source={{ uri: image }} />
      <Text className='text-xl font-bold'>{name}</Text>
    </View>
  )
}
