import { ModelSchema } from '~/gpt/gptSchema'
import { z } from 'zod'

export const EnvSchema = z.object({
  gptDefaultModel: ModelSchema,
  gptFallbackModel: ModelSchema,
  gptServiceUrl: z.string().url(),
  apiKey: z.string(),
})

export type EnvType = z.infer<typeof EnvSchema>

export const dummy_env = {
  gptDefaultModel: '',
  gptFallbackModel: '',
  uri: '',
}

export const getEnv = () =>
  EnvSchema.parse({
    gptDefaultModel: process.env.EXPO_PUBLIC_GPT_DEFAULT_MODEL,
    gptFallbackModel: process.env.EXPO_PUBLIC_GPT_FALLBACK_MODEL,
    gptServiceUrl: process.env.EXPO_PUBLIC_GPT_SERVICE_URL,
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
  })
