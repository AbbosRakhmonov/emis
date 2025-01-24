import { api, misApi, ssoApi } from '@/src/redux/api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    [api.reducerPath]: api.reducer,
    [ssoApi.reducerPath]: ssoApi.reducer,
    [misApi.reducerPath]: misApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(ssoApi.middleware)
      .concat(misApi.middleware),
});

setupListeners(store.dispatch);
