/*
 eslint-disable @typescript-eslint/no-unsafe-assignment
 */
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-elements";
import { QueryClient, QueryClientProvider } from "react-query";

import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { theme } from "./theme/theme";

import { store, persistor } from "@state/store";

const queryClient = new QueryClient();

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate persistor={persistor} loading={null}>
          <SafeAreaProvider>
            <ThemeProvider useDark={colorScheme === "dark"} theme={theme}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </ThemeProvider>
          </SafeAreaProvider>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}
