import { analyticsCatchErrorEvent, analyticsEvent } from './posthog'

export interface AnalyticsCalls {
  analyticsCatchErrorEvent: typeof analyticsCatchErrorEvent
  analyticsEvent: typeof analyticsEvent
}
