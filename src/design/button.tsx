import {
  TouchableOpacity as ReactNativeTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { styled } from 'nativewind'

export const TouchableOpacity = styled<TouchableOpacityProps>(
  ReactNativeTouchableOpacity,
)

export const ButtonContainerA: React.FunctionComponent<
  TouchableOpacityProps
> = ({ children, ...props }) => (
  <TouchableOpacity
    {...props}
    className='w-4/5 flex-row h-12 snap-center justify-center rounded-xl my-2 bg-black'>
    {children}
  </TouchableOpacity>
)
