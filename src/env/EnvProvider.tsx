import React, { ReactNode, createContext, useContext } from 'react'
import { EnvType } from './EnvSchema'
// TODO: this should come from a hook, probably using some store context.

// Define the shape of your context data
const EnvContext = createContext<EnvType | undefined>(undefined)

// Context provider component
export const EnvProvider: React.FC<{ children: ReactNode; env: EnvType }> = ({
  children,
  env,
}) => {
  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>
}

// Custom hook to use the context
export const useEnv = () => {
  const context = useContext(EnvContext)
  if (!context) {
    throw new Error('useEnv must be used within a EnvProvider')
  }
  return context
}
