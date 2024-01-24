import { ReactNode, createContext, useContext } from 'react'
import { AnalyticsCalls } from './types'

const AnalyticsContext = createContext<AnalyticsCalls | undefined>(undefined)

export const AnalyticsProvider: React.FC<{
  children: ReactNode
  calls: AnalyticsCalls
}> = ({ children, calls }) => {
  return (
    <AnalyticsContext.Provider value={calls}>
      {children}
    </AnalyticsContext.Provider>
  )
}
// Custom hook to use the context
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useEnv must be used within a EnvProvider')
  }
  return context
}
