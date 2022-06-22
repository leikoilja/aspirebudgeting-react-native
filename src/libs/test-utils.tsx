import React, { ReactElement } from "react";
import {
  render as rtlRender,
  RenderOptions,
} from "@testing-library/react-native";
import {
  configureStore,
  EmptyObject,
  EnhancedStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "@state/store";
import type { RootState } from "@state/store";

// Adopted from
// https://stackoverflow.com/a/68016671/5818549
// ReducerTypes is just a grouping of each slice type,
// in this example i'm just passing down a User Reducer/State.
// With this, you can define the type for your store.
// The type of a configureStore() is called EnhancedStore,
// which in turn receives the store state as a generic (the same from store.getState()).
type ReducerTypes = Pick<RootState, "auth" | "sheet" | "user">;
type TStore = EnhancedStore<ReducerTypes>;

type CustomRenderOptions = {
  preloadedState?: PreloadedState<ReducerTypes & EmptyObject>;
  store?: TStore;
} & Omit<RenderOptions, "wrapper">;

function render(ui: ReactElement, options?: CustomRenderOptions) {
  const { preloadedState } = options || {};

  const store =
    options?.store ||
    configureStore({
      reducer: rootReducer,
      preloadedState,
    });

  function Wrapper({ children }: { children: JSX.Element }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// re-export everything
export * from "@testing-library/react-native";
// override render method
export { render };
