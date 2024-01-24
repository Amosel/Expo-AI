export * from './AnalyticsProvider'
import { analyticsEvent, analyticsCatchErrorEvent } from './posthog'
import { AnalyticsCalls } from './types'

export const analyticsCalls: AnalyticsCalls = {
  analyticsEvent,
  analyticsCatchErrorEvent,
}
