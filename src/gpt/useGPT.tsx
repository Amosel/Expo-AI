import { analyticsCatchErrorEvent, analyticsEvent } from '~/analytics'
import { useCallback, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { SupportedModel } from './types'
import { ChatCompletionMessage } from 'openai/resources'
import { GPTMessage } from '~/messages/useMessageStore'
import axios from 'axios'
import { z } from 'zod'

const ModelSchema = z.enum([
  'gpt-4',
  'gpt-3.5-turbo',
  'gpt-4-1106-preview',
  'roleplay',
  'roleplaylite',
])

const ConfigSchema = z.object({
  defaultModel: ModelSchema,
  fallbackModel: ModelSchema,
  uri: z.string().url(),
})

const config = ConfigSchema.parse({
  defaultModel: process.env.EXPO_PUBLIC_GPT_MODEL as SupportedModel,
  fallbackModel: process.env.EXPO_PUBLIC_GPT_FALLBACK_MODEL as SupportedModel,
  uri: process.env.EXPO_PUBLIC_GPT_SERVICE_URL as string,
})
/**
 * Wrapper for ChatGPT Functions
 */

// const uri = 'https://convo-q2ifyofooa-uc.a.run.app'
// const uri = "http://127.0.0.1:5001/aiexpert-yes/us-central1/convo";   //Simulated

export default function useGPT(personaId: string) {
  //Clientside model selection
  const model = useRef<SupportedModel>(config.defaultModel)

  const send = useCallback(
    async (messages: GPTMessage[]) =>
      axios.post<{ message: any }>(config.uri, {
        persona: personaId,
        model: model.current,
        messages: JSON.stringify(messages),
      }),
    [personaId],
  )

  /// Send Fallback Request
  const sendFallback = useCallback(
    async (messages: GPTMessage[], error: any) => {
      if (model.current !== config.fallbackModel) {
        /* REMOVED - Stting Default Model on Persona Change
                      //Restore after a short vacation
                      setTimeout(() => {
                          isDevelopment() && console.warn("(i) Setting Model back to "+model);
                          model && setModel?.(model)
                      } , config.fallbackTime);
                      */
        //Remember Model Fallback
        model.current = config.fallbackModel
        return send(messages)
      } else {
        throw error
      }
    },
    [send],
  )

  const sendMessageDirect = useCallback(
    async (messages: GPTMessage[]): Promise<ChatCompletionMessage> =>
      send(messages)
        .then(response => {
          const { message } = response.data
          console.log('API: Message Received', { message, model })

          //** [BUG] duplicate agent messages
          //Fetch Last 'assistant' message
          const assistantMessages = [...messages]
            .reverse()
            .find(m => m.role === 'assistant')
          //Check if duplicate
          if (
            assistantMessages &&
            assistantMessages.content === message.content
          ) {
            //Log
            console.error('[BUG] Duplicate Agent Response', {
              message,
              messages,
            })
            //Fallback
            return sendFallback(messages, message)
          }

          //Analytics
          analyticsEvent('message_received', {
            event_category: 'chat',
            persona: personaId,
            model,
            message,
          })

          //Validate Roleplay Errors
          if (message?.error as any) {
            if (message?.error?.error?.type === 'insufficient_quota') {
              analyticsCatchErrorEvent(message?.error?.error?.type, {
                personaId,
                model,
                data: message,
              })
            }
            // else
            console.error(
              `[CAUGHT] Failure Type:${message?.error?.error?.type}`,
              {
                personaId,
                model,
                data: message,
              },
            )
            return sendFallback(messages, message?.error)
          }
          return message
        })
        .catch((error: any) => {
          if (model && ['roleplay', 'roleplaylite'].includes(model.current)) {
            console.warn(
              '(i) sendMessage() GPT API Failure -- Fallback to GPT3',
              { model, error: `${error.code}: ${error.message}` },
            )
            analyticsCatchErrorEvent(error, { dev: 'fallback to GPT3' })
            return sendFallback(messages, error)
          } else {
            analyticsCatchErrorEvent(error, {
              msg: 'Message faild: GPT API Failure',
              code: error.code,
              message: error.message,
            })
            console.error(
              `(i) sendMessage() GPT API Failure: ${error.code}: ${error.message}  ${error.stack}`,
              { model, error },
            )
            //Pass Through
            throw error
          }
        }),
    [personaId, send, sendFallback],
  )

  const mutation = useMutation({
    mutationFn: sendMessageDirect,
  })

  return {
    sendMessage: mutation.mutate,
    ...mutation,
  }
}
