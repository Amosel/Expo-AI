import { GiftedChat, type IMessage } from 'react-native-gifted-chat'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ChatHeader } from '~/components/ChatHeader'
import { personas, PersonaId } from '~/stub/persona'
import { SafeAreaView } from 'react-native-safe-area-context'
import useGPT from '~/gpt/useGPT'

type SearchParams = { id: PersonaId }

const ChatNavigationScree: React.FunctionComponent<SearchParams> = ({ id }) => {
  const HeaderTitle = useMemo(() => {
    const persona = personas.find(p => p.id === id)
    if (persona) {
      return () => <ChatHeader {...persona} />
    }
  }, [id])
  return (
    <Stack.Screen
      options={{
        headerBackTitleVisible: false,
        headerShown: true,
        title: 'Chat',
        // https://reactnavigation.org/docs/headers#adjusting-header-styles
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        headerTitle: HeaderTitle,
        // headerRight:  (props) => <AvatarIcon />
      }}
    />
  )
}

export default function () {
  const { id } = useLocalSearchParams<SearchParams>()
  const [messages, setMessages] = useState<IMessage[]>([])
  const { sendMessages } = useGPT(id)

  useEffect(() => {
    setMessages([
      // Mock message data
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  const onSend = useCallback(
    (messagesToSend: IMessage[] = []) => {
      sendMessages(
        messagesToSend.map(message => ({
          content: message.text,
          role: 'user',
        })),
      )
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messagesToSend),
      )
    },
    [sendMessages],
  )

  return (
    <SafeAreaView className='w-full h-full bg-green-50'>
      <ChatNavigationScree id={id} />
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  )
}
