import posthog from 'posthog-js'

/**
 *
 */
export const isAnalyticsEnabled = () => {
  const isLocalhost =
    window.location.href.includes('127.0.0.1') ||
    window.location.href.includes('localhost')
  return (
    !isLocalhost ||
    process.env.EXPO_PUBLIC_ANALYTICS_LOCALHOST_ENABLE !== 'false'
  )
}

/**
 * Init analytics.
 */
export const initAnalytics = () => {
  if (isAnalyticsEnabled()) {
    if (process.env.EXPO_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.EXPO_PUBLIC_POSTHOG_KEY, {
        api_host:
          process.env.EXPO_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      })
    } else {
      console.error('Env:EXPO_PUBLIC_POSTHOG_KEY is missing')
    }
  } else {
    console.log('Analytics Disabled')
  }
}

/**
 * Page view event.
 */
export const analyticsPageView = () => analyticsEvent('pageView')

/**
 * Generic Analytic Event
 */
export const analyticsEvent = (event: string, properties?: any): void => {
  try {
    process.env.NODE_ENV === 'development' &&
      console.log('(i) Analytics Event:', { event, properties })
    if (isAnalyticsEnabled()) {
      posthog.capture(event, properties)
    }
  } catch (error) {
    console.error('[CAUGHT] ' + error)
  }
}

/**
 * Connect account event
 */
export const analyticsEventLogin = (account: string): void => {
  try {
    if (isAnalyticsEnabled()) {
      analyticsEvent('LogIn', { account })
      posthog.alias(account.toLowerCase())
    }
  } catch (error) {
    console.error('[CAUGHT] ' + error, { account })
  }
}

/**
 * Log-Out Event
 */
export const analyticsEventLogout = (): void => {
  try {
    if (isAnalyticsEnabled()) {
      analyticsEvent('LogOut')
      // posthog.reset();
    }
  } catch (error) {
    console.error('[CAUGHT] ' + error)
  }
}

/**
 * Track Errors
 */
export const analyticsCatchErrorEvent = (
  error: Error,
  additional: any = {},
): void => {
  try {
    if (isAnalyticsEnabled()) {
      analyticsEvent('error_caught', {
        event_category: 'error',
        errorMessage: error?.message,
        errorStack: error?.stack,
        ...additional,
      })
    }
  } catch (err) {
    console.error('[CAUGHT] ' + err)
  }
}
