import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable, useColorScheme } from 'react-native'
import colors from '~/design/colors'
export default function TabLayout() {
  const colorScheme = useColorScheme()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Tab One',
          tabBarIcon: TabBarIcon('code'),
          headerRight: HeaderRight,
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          title: 'Tab Two',
          tabBarIcon: TabBarIcon('code'),
        }}
      />
    </Tabs>
  )
}

function HeaderRight() {
  const colorScheme = useColorScheme()
  return (
    <Link href='/modal' asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name='info-circle'
            size={25}
            color={colors[colorScheme ?? 'light'].text}
            className={`mr-[15] opacity-${pressed ? '1' : '0.5'}`}
          />
        )}
      </Pressable>
    </Link>
  )
}

const TabBarIcon =
  (name: keyof typeof FontAwesome.glyphMap) =>
  ({
    color,
    size,
    focused,
  }: {
    focused: boolean
    color: string
    size: number
  }) => {
    return (
      <FontAwesome
        name={name}
        size={size}
        className='mb-[-3]'
        {...{ color, focused }}
      />
    )
  }
