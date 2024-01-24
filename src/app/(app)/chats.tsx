import { AvatarListUsingNativeFlatList as List } from '~/components/AvatarList'
import { Stack } from 'expo-router'
import { HeaderSettingsButton } from '~/components/HeaderRight'

export default function Home() {
  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          title: 'Chats',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          // headerTitle: HeaderTitle,
          headerRight: () => <HeaderSettingsButton />,
        }}
      />
      <List />
    </>
  )
}
