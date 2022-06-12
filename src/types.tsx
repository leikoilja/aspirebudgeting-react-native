/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from "@react-navigation/native";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  AppStack: NavigatorScreenParams<AppStackParamList> | undefined;
  SetupStack: NavigatorScreenParams<SetupStackParamList> | undefined;
  OfflineScreen: undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type MainStackParamList = {};

export type AppStackParamList = {
  AccountsScreen: undefined;
  BudgetScreen: undefined;
  ReportsScreen: undefined;
  SettingsScreen: undefined;
};

export type SetupStackParamList = {
  AuthenticationScreen: undefined;
  SheetSelectionScreen: undefined;
};

export type UserProfile = {
  email: string;
  firstName: string;
  lastName: string;
  language: string;
};

export type Account = {
  id: number;
  name: string;
  amount: number;
};
