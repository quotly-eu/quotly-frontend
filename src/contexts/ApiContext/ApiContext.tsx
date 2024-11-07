import { createContext } from 'react';
import { ApiContextType } from './ApiContext.type';

const config: ApiContextType = {
  baseUrl: 'https://api.quotly.eu',
  routes: {
    quotes: {
      path: '/v1/quotes',
      subPaths: {
        comments: '/comments',
        reactions: '/reactions',
      }
    },
    roles: {
      path: '/v1/roles'
    },
    users: {
      path: '/v1/users',
      subPaths: {
        reactions: '/reactions',
        roles: '/roles',
        savedQuotes: '/saved-quotes'
      }
    }
  },
  discordAuth: 'https://discord.com/oauth2/authorize?client_id=1303517823452184697&response_type=code&redirect_uri=https%3A%2F%2Fquotly.eu%2Foauth&scope=identify+email' 
};

/**
 * Api Context config with necessary urls
 * @example
 * const { routes } = useContext(ApiContext);
 */
export const ApiContext = createContext(config);

/**
 * Api Context Provider for the App, mainly for useFetch Hooks
 * @example
 * <ApiContextProvider>
 *  <App />
 * </ApiContextProvider>
 */
const ApiContextProvider = ({children}:{children: React.ReactNode}) => (
  <ApiContext.Provider value={config}>
    {children}
  </ApiContext.Provider>
);

export default ApiContextProvider;