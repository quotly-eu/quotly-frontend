import React, { createContext, useContext, useReducer } from 'react';
import { components } from 'types/api';

type AppConfig = {
  user?: components['schemas']['User'];
  roles?: components['schemas']['Role'][];
};

type AppAction = {
  type: 'setUser' | 'setRoles',
  config: AppConfig,
};

const config: AppConfig = {};

const reducer = (state: AppConfig, action: AppAction) => {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        user: action.config.user,
      };
    case 'setRoles': {
      return {
        ...state,
        roles: action.config.roles,
      };
    }
    default:
      return state;
  }
};

const AppData = createContext<[AppConfig, React.Dispatch<AppAction>]>([config, () => { }]);

/**
 * App Context config
 * @example
 * const [{ user }, dispatch] = useAppContext();
 */
export const useAppData = () => useContext(AppData);

/**
 * App Data Provider for the App
 * @example
 * <AppDataProvider>
 *  <App />
 * </AppDataProvider>
 */
const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, config);
  const value: [AppConfig, React.Dispatch<AppAction>] = [state, dispatch];
  return (
    <AppData.Provider value={value}>
      {children}
    </AppData.Provider>
  );
};

export default AppDataProvider;