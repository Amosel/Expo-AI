import React from 'react'
import { StyleSheet, View, Platform, TouchableHighlight } from 'react-native'
import { Feather } from '@expo/vector-icons'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 15,
  },
  button: {
    borderRadius: 25,
  },
  content: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const NavBottomFAB = ({
  visible,
  onPress,
  isThread,
}: {
  visible: boolean
  onPress: Function
  isThread: boolean
}): React.ReactElement | null => {
  if (!visible) {
    return null
  }

  return (
    <View
      style={[
        styles.container,
        {
          ...Platform.select({
            ios: {
              bottom: 100 + (isThread ? 40 : 0),
            },
            android: {
              top: 15,
              scaleY: -1,
            },
          }),
        },
      ]}
      testID='nav-jump-to-bottom'>
      <TouchableHighlight
        onPress={() => onPress()}
        className='rounded-md border-green-200'>
        <View className='w-[50] he-[50] rounded-md border-[0.1] items-center justify-center'>
          <Feather name='chevron-down' color={'green'} size={36} />
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default NavBottomFAB
