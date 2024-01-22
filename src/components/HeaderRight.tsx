import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link } from 'expo-router'
import { Pressable } from 'react-native'
import colors from '~/design/colors'
import { useColorScheme } from 'nativewind'

export function HeaderSettingsButton() {
  const { colorScheme } = useColorScheme()
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
