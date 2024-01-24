import { renderHook, act } from '@testing-library/react-hooks'
// import axios from 'axios'
import useGPT from './useGPT' // Adjust the import path as necessary
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EnvType, EnvProvider } from '~/env'
import { AnalyticsProvider } from '~/analytics'
import { setupServer } from 'msw/native'
import { http } from 'msw'

export const server = setupServer()

describe('useGPT', () => {
  // Setup a test QueryClient
  const queryClient = new QueryClient()
  const env: EnvType = {
    gptDefaultModel: 'gpt-4',
    gptFallbackModel: 'gpt-3.5-turbo',
    gptServiceUrl: 'https://exmaple.com',
    apiKey: 'key'
  }

  const analyticsCatchErrorEvent = jest.fn()
  const analyticsEvent = jest.fn()

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AnalyticsProvider calls={{ analyticsCatchErrorEvent, analyticsEvent }}>
      <EnvProvider env={env}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </EnvProvider>
    </AnalyticsProvider>
  )

  afterEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
    server.use(
      http.get(env.gptServiceUrl, (_req, res, ctx) => {
        return res(
          ctx.json({
            base_fee: baseFee.toString(),
          } as {
            base_fee: string
          }),
        )
      }),
    )
  })

  it('initializes with correct configuration', () => {
    const { result } = renderHook(() => useGPT('test-persona'), { wrapper })
    // Check initial state, model ref, etc.
  })

  // it('sends messages correctly', async () => {
  //   const post = axios.post as jest.Mock
  //   post.mockResolvedValue({
  //     data: { message: 'mocked response' },
  //   })
  //   const { result } = renderHook(() => useGPT('test-persona'), { wrapper })

  //   await act(async () => {
  //     result.current.sendMessage([
  //       {
  //         /* mock GPTMessage */
  //       },
  //     ])
  //   })

  //   // Assertions for axios.post being called correctly, and message processing
  // })

  // it('handles fallback correctly on failure', async () => {
  //   // Mock axios.post to fail initially, then succeed
  //   // Check if the fallback model is used after failure
  // })

  // it('handles duplicate messages and roleplay errors', async () => {
  //   // Similar to above, but with specific error scenarios
  // })

  // Additional tests for analytics events, error handling, and React Query integration
})
