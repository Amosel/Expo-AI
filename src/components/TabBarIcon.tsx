import FontAwesome from '@expo/vector-icons/FontAwesome'

export const TabBarIcon =
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
