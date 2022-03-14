/*
 eslint-disable
 @typescript-eslint/no-misused-promises,
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/no-unsafe-return,
 @typescript-eslint/restrict-template-expressions,
 */
import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Button } from "react-native";
import { store } from "@state/store";
import { updateUserProfile, resetUserProfile } from "@actions/UserActions";
import { resetAccessTokenExpiryTime } from "@actions/AuthActions";
import { loadMyUserProfile } from "@auth/GoogleApi";
import { signInWithGoogle } from "@auth/GoogleAuthApi";
import { removeTokensFromSecureStore } from "@state/secureStore";
import styles from "./SettingsScreen.modules.css";

const SettingsScreen = () => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const onSignInPress = async () => {
    const { success: successSignIn } = await signInWithGoogle();
    if (successSignIn) {
      const { success: successLoadMyUserProfile, data: userProfileData } =
        await loadMyUserProfile();
      if (successLoadMyUserProfile) {
        const { email, firstName, lastName } = userProfileData;
        store.dispatch(
          updateUserProfile({
            email,
            firstName,
            lastName,
          })
        );
      }
    } else {
      console.error("Failed to sign in via Google");
    }
  };

  const onLogoutPress = async () => {
    await removeTokensFromSecureStore();
    store.dispatch(resetAccessTokenExpiryTime());
    store.dispatch(resetUserProfile());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Sign-In</Text>
      <Text>
        {auth.accessTokenExpiryTimeUnix
          ? `Successfully signed in as ${user.firstName} ${user.lastName} (${user.email})`
          : "Not yet signed in"}
      </Text>
      <Button
        title={
          auth.accessTokenExpiryTimeUnix
            ? "Logout from Google Account"
            : "Sign-In using Google Account"
        }
        onPress={auth.accessTokenExpiryTimeUnix ? onLogoutPress : onSignInPress}
      />
    </View>
  );
};

export default SettingsScreen;
