import { z } from 'zod'

export const ModelSchema = z.enum([
  'gpt-4',
  'gpt-3.5-turbo',
  'gpt-4-1106-preview',
  'roleplay',
  'roleplaylite',
])
