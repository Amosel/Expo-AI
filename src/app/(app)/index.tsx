import { ErrorBoundaryProps, Redirect } from 'expo-router'
import { View } from '~/design/view'
import { Text } from '~/design/typography'

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <View className='flex bg-red-600'>
      <Text>{props.error.message}</Text>
      <Text onPress={props.retry}>Try Again?</Text>
    </View>
  )
}

export default function Home() {
  return <Redirect href='/chats' />
}
