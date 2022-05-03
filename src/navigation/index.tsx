/*
 eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-return,
 @typescript-eslint/no-unsafe-member-access
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import AuthenticationScreen from "../screens/AuthenticationScreen/AuthenticationScreen";
import AccountsScreen from "../screens/AccountsScreen/AccountsScreen";
import BudgetScreen from "../screens/BudgetScreen/BudgetScreen";
import ReportsScreen from "../screens/ReportsScreen/ReportsScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import OfflineScreen from "../screens/OfflineScreen/OfflineScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import SheetSelectionScreen from "../screens/SheetSelectionScreen/SheetSelectionScreen";

import {
  MainStackParamList,
  RootStackParamList,
  AppStackParamList,
  SetupStackParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="MainStack"
        component={MainNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen name="Modal" component={ModalScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const MainStack = createNativeStackNavigator<MainStackParamList>();

function MainNavigator() {
  return (
    <MainStack.Navigator initialRouteName="AppStack">
      <MainStack.Screen
        name="SetupStack"
        component={SetupNavigator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AppStack"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}

const SetupStack = createNativeStackNavigator<SetupStackParamList>();

function SetupNavigator() {
  return (
    <SetupStack.Navigator>
      <SetupStack.Screen
        name="AuthenticationScreen"
        component={AuthenticationScreen}
        options={{ headerShown: false }}
      />
      <SetupStack.Screen
        name="OfflineScreen"
        component={OfflineScreen}
        options={{ headerShown: false }}
      />
      <SetupStack.Screen
        name="SheetSelectionScreen"
        component={SheetSelectionScreen}
        options={{ headerShown: false }}
      />
    </SetupStack.Navigator>
  );
}

const AppStack = createBottomTabNavigator<AppStackParamList>();

function AppNavigator() {
  const colorScheme = useColorScheme();

  return (
    <AppStack.Navigator
      initialRouteName="AccountsScreen"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <AppStack.Screen
        name="AccountsScreen"
        component={AccountsScreen}
        options={({ navigation }) => ({
          title: "Accounts Screen",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <AppStack.Screen
        name="BudgetScreen"
        component={BudgetScreen}
        options={{
          title: "Budget",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <AppStack.Screen
        name="ReportsScreen"
        component={ReportsScreen}
        options={{
          title: "Reports",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <AppStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </AppStack.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
