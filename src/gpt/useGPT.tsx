import { useCallback, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ChatCompletionMessage } from 'openai/resources'
import axios, { AxiosHeaders } from 'axios'
import { GPTMessage, SupportedModel } from './types'
import { useEnv } from '~/env'
import { useAnalytics } from '~/analytics'
import { useAuth } from '~/auth'
/**
 * Wrapper for ChatGPT Functions
 */

// TODO: axios interceptors:
// //Log
// process.env.NODE_ENV === 'development' && console.log("API: Message Send", { uri, params });

export default function useGPT(personaId: string) {
  const config = useEnv()
  const auth = useAuth()
  const { analyticsCatchErrorEvent, analyticsEvent } = useAnalytics()

  //Clientside model selection
  const model = useRef<SupportedModel>(config.gptDefaultModel)

  const send = useCallback(
    async (messages: GPTMessage[]) =>
      axios.post<{ message: any }>(config.gptServiceUrl, {
        persona: personaId,
        model: model.current,
        apiKey: config.apiKey,
        messages: JSON.stringify(messages),
      }, {
        headers: new AxiosHeaders({ Authorization: auth.token ? `Bearer ${auth.token}` : ''})
      }),
    [config.gptServiceUrl, personaId, auth.token],
  )

  /// Send Fallback Request
  const sendFallback = useCallback(
    async (messages: GPTMessage[], error: any) => {
      if (model.current !== config.gptFallbackModel) {
        model.current = config.gptFallbackModel
        return send(messages)
      } else {
        throw error
      }
    },
    [config.gptFallbackModel, send],
  )

  const sendMessageDirect = useCallback(
    async (messages: GPTMessage[]): Promise<ChatCompletionMessage> =>
      send(messages)
        .then(response => {
          const { message } = response.data
          console.log('API: Message Received', { message, model: model.current })

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
            model: model.current,
            message,
          })

          //Validate Roleplay Errors
          if (message?.error as any) {
            if (message?.error?.error?.type === 'insufficient_quota') {
              analyticsCatchErrorEvent(message?.error?.error?.type, {
                personaId,
                model: model.current,
                data: message,
              })
            }
            // else
            console.error(
              `[CAUGHT] Failure Type:${message?.error?.error?.type}`,
              {
                personaId,
                model: model.current,
                data: message,
              },
            )
            return sendFallback(messages, message?.error)
          }
          return message
        })
        .catch((error: any) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }

          if (model.current && ['roleplay', 'roleplaylite'].includes(model.current)) {
            console.warn(
              '(i) sendMessage() GPT API Failure -- Fallback to GPT3',
              { model: model.current, error: `${error.code}: ${error.message}` },
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
              `(i) sendMessage() GPT API Failure: ${error.code}: ${error.message}  ${JSON.stringify(error.request)}`,
              { model: model.current, error },
            )
            //Pass Through
            throw error
          }
        }),
    [analyticsCatchErrorEvent, analyticsEvent, personaId, send, sendFallback],
  )

  const mutation = useMutation({
    mutationFn: sendMessageDirect,
  })

  return {
    sendMessages: mutation.mutate,
    ...mutation,
  }
}
