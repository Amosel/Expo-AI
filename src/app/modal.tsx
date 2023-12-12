import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { View } from '~/design/view';
import { Text } from '~/design/typography';

export default function ModalScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-xl font-bold'>Modal</Text>
      <View className='my-6 h-[1] w-4/5 dark:text-dark text-light' />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}