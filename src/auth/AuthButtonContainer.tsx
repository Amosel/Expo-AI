import { TouchableOpacity } from "~/design/button"

export const AuthButtonContainer = ({ children }) => (
  <TouchableOpacity
  onPress={onLogin}
  className='w-4/5 flex-row h-12 snap-center justify-center rounded-xl my-3 bg-black'>
>{children}</TouchableOpacity>
)