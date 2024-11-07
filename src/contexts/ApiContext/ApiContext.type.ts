type ApiRoute = {
  path: string;
  subPaths?: {
    [path: string]: string;
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
    quotes: ApiRoute;
    roles: ApiRoute;
    users: ApiRoute;
  }
  discordAuth: string;
};