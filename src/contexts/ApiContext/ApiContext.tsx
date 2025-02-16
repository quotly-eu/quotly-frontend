import { createContext } from 'react';
import { ApiContextType } from './ApiContext.type';

const config: ApiContextType = {
  baseUrl: 'http://localhost:3510',
  routes: {
    quotes: {
      construct: (id?) => `${config.baseUrl}/v1/quotes${id ? `/${id}` : ''}`,
      sub: {
        create: () => `${config.routes.quotes.construct()}/create`,
        toggleSave: (id) => `${config.routes.quotes.construct(id)}/toggleSave`,
        createComment: (id) => `${config.routes.quotes.construct(id)}/comments/create`,
        comments: (id) => `${config.routes.quotes.construct(id)}/comments`,
        reactions: (id) => `${config.routes.quotes.construct(id)}/reactions`,
        saved: (id) => `${config.routes.quotes.construct(id)}/saved`,
        top: () => `${config.routes.quotes.construct()}/top`,
      }
    },
    roles: {
      construct: (roleId?) => `${config.baseUrl}/v1/roles${roleId ? `/${roleId}` : ''}`,
    },
    users: {
      construct: (discordId?) => `${config.baseUrl}/v1/users${discordId ? `/${discordId}` : ''}`,
      sub: {
        me: () => `${config.routes.users.construct()}/me`,
        reactions: (discordId) => `${config.routes.users.construct(discordId)}/reactions`,
        roles: (discordId) => `${config.routes.users.construct(discordId)}/roles`,
        savedQuotes: (discordId) => `${config.routes.users.construct(discordId)}/saved-quotes`,
      }
    },
    authorize: {
      construct: () => `${config.baseUrl}/v1/authorize`,
    },
  },
  discordAuth: 'https://discord.com/oauth2/authorize?client_id=1303517823452184697&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3570%2Foauth&scope=identify+email' 
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