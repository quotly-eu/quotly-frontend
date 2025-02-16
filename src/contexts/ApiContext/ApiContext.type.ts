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
      ApiRoute<[id?: string], 'createComment' | 'comments' | 'reactions'> &
      ApiRoute<[], 'top' | 'create'>;
    roles: ApiRoute<[roleId?: string]>;
    users: 
      ApiRoute<[discordId?: string], 'reactions' | 'roles' | 'savedQuotes'> &
      ApiRoute<[], 'me'>;
    authorize: ApiRoute;
  }
  discordAuth: string;
};