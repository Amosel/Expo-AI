import { ExpoConfig, ConfigContext } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'guru-ai-expo',
  slug: 'guru-ai-expo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.amosel.guruai',
    googleServicesFile: './GoogleService-Info.plist',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.amosel.guruai',
    googleServicesFile: './google-services.json',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './src/assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
          usesAppleSignIn: true,
        },
      },
    ],
    'expo-apple-authentication',
    '@react-native-google-signin/google-signin',
    '@react-native-firebase/app',
  ],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
})
