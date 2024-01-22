import { FlashList } from '@shopify/flash-list'
import { personas } from '~/stub/persona'
import { FlatList } from 'react-native'
import { View } from '~/design/view'
import { Text } from '~/design/typography'
import { Link } from 'expo-router'
import { Image } from '~/design/image'

export const AvatarList = () => (
  <FlashList
    data={personas}
    className='bg-slate-200 w-full h-full'
    renderItem={({ item, index }) => (
      <Link href={`/chat/${item.id}`} key={index}>
        <View className='flex flex-row items-center p-4 w-full'>
          <Image
            className='h-12 w-12 rounded-full mr-4'
            source={{ uri: item.image }}
          />
          <View className='flex-1'>
            <Text className='text-lg font-semibold'>{item.name}</Text>
            <Text className='text-gray-600'>
              {item.intro?.substring(0, 80)}
            </Text>
          </View>
        </View>
      </Link>
    )}
    estimatedItemSize={personas.length}
  />
)

export const AvatarListUsingNativeFlatList = () => (
  <FlatList
    data={personas}
    className='bg-slate-100 w-full h-full'
    keyExtractor={item => item.id}
    renderItem={({ item, index }) => (
      <Link href={`/chat/${item.id}`} key={index}>
        <View className='flex flex-row items-center p-4 w-full'>
          <Image
            className='h-12 w-12 rounded-full mr-4'
            source={{ uri: item.image }}
          />
          <View className='flex-1'>
            <Text className='text-lg font-semibold'>{item.name}</Text>
            <Text className='text-gray-600'>
              {item.intro?.substring(0, 80)}
            </Text>
          </View>
        </View>
      </Link>
    )}
  />
)
