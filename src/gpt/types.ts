import { type ChatCompletionRole } from 'openai/resources/chat/completions'
export type SupportedModel =
  | 'gpt-4'
  | 'gpt-3.5-turbo'
  | 'gpt-4-1106-preview'
  | 'roleplay'
  | 'roleplaylite'

export interface GPTMessage {
  role: ChatCompletionRole
  content: string
}

export interface Params {
  messages: GPTMessage[]
  persona: string
  model?: string
}
