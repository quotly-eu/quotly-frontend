import React, { createContext, useContext } from 'react';

const config = {
  discordAuth: `https://discord.com/oauth2/authorize?client_id=1303517823452184697&response_type=code&redirect_uri=${encodeURIComponent(`${window.origin}/oauth`)}&scope=email+identify`,
  discordWebhook: `https://discord.com/oauth2/authorize?client_id=1303517823452184697&response_type=code&redirect_uri=${encodeURIComponent(`${window.origin}/webhook`)}&integration_type=0&scope=email+identify+webhook.incoming`
} as const;

const ApiContext = createContext(config);

/**
 * Api Context config with necessary urls
 * @example
 * const { routes } = useApiContext();
 */
export const useApiContext = () => useContext(ApiContext);

/**
 * Api Context Provider for the App, mainly for useFetch Hooks
 * @example
 * <ApiContextProvider>
 *  <App />
 * </ApiContextProvider>
 */
const ApiContextProvider = ({ children }: { children: React.ReactNode }) => (
  <ApiContext.Provider value={config}>
    {children}
  </ApiContext.Provider>
);

export default ApiContextProvider;