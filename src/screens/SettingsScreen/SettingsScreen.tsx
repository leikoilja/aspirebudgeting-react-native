/*
 eslint-disable
 @typescript-eslint/no-misused-promises,
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/no-unsafe-return,
 @typescript-eslint/restrict-template-expressions,
 */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { RootState, store } from "@state/store";
import { resetUserProfile } from "@slices/UserSlice";
import { logout } from "@slices/AuthSlice";
import { removeTokensFromSecureStore } from "@state/secureStore";
import { Loader } from "@components/Loader/Loader";
import { setSpreadsheetId } from "@slices/SheetSlice";
import styles from "./SettingsScreen.modules.css";

const SettingsScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);

  const onLogoutPress = async () => {
    setLoading(true);
    await removeTokensFromSecureStore();
    store.dispatch(resetUserProfile());
    store.dispatch(logout());
    store.dispatch(setSpreadsheetId(""));
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Google Authentication status
      </Text>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text>
            {`Successfully signed in as ${user.firstName} ${user.lastName} (${user.email})`}
          </Text>
          <Button
            style={styles.button}
            title={"Logout from Google Account"}
            onPress={onLogoutPress}
          />
        </>
      )}
    </View>
  );
};

export default SettingsScreen;
