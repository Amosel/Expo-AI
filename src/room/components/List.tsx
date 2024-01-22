import React, { useState, type RefObject } from 'react'
import { FlatListProps, Platform, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'
import NavBottomFAB from './NavBottomFAB'

export type TListRef = RefObject<FlatList<TAnyMessageModel>>

export interface ListProps extends FlatListProps<TAnyMessageModel> {
  listRef: TListRef
  jumpToBottom: () => void
  isThread: boolean
}
export const SCROLL_LIMIT = 200
export type TAnyMessageModel = {}

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<TAnyMessageModel>>(FlatList)

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 10,
  },
})

export const List = ({
  listRef,
  jumpToBottom,
  isThread,
  ...props
}: ListProps) => {
  const [visible, setVisible] = useState(false)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (event.contentOffset.y > SCROLL_LIMIT) {
        runOnJS(setVisible)(true)
      } else {
        runOnJS(setVisible)(false)
      }
    },
  })

  return (
    <>
      <AnimatedFlatList
        testID='room-view-messages'
        // @ts-ignore createAnimatedComponent is making this fail
        ref={listRef}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
        inverted={Platform.OS === 'ios'}
        removeClippedSubviews={Platform.OS === 'ios'}
        initialNumToRender={7}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={5}
        windowSize={10}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        {...props}
        {...{
          keyboardShouldPersistTaps: 'handled',
          keyboardDismissMode: 'interactive',
        }}
      />
      <NavBottomFAB
        visible={visible}
        onPress={jumpToBottom}
        isThread={isThread}
      />
    </>
  )
}
