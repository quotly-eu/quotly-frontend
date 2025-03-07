type ApiRoute<PathArgs extends unknown[] = [], Routes extends string = ''> = {
  construct: (...args: PathArgs) => string;
  sub?: {
    [path in Routes]: ApiRoute<Required<PathArgs>>['construct'];
  };
};

/**
 * Api Context for custom useFetch Hooks. This stores mostly all required routes for it.
 * @example
 * const { baseUrl, routes } = useContext(ApiContext)
 */
export type ApiContextType = {
  baseUrl: string;
  routes: {
    quotes: 
      ApiRoute<[id?: string], 'toggleSave' | 'toggleReact' | 'createComment' | 'comments' | 'reactions' | 'saved' | 'delete'> &
      ApiRoute<[], 'top' | 'create'>;
    roles: ApiRoute<[roleId?: string]>;
    users: 
      ApiRoute<[id?: number], 'quotes' | 'reactions' | 'roles' | 'savedQuotes'> &
      ApiRoute<[], 'me' | 'delete' | 'webhook'>;
    authorize: ApiRoute;
  }
  discordAuth: string;
  discordWebhook: string;
};