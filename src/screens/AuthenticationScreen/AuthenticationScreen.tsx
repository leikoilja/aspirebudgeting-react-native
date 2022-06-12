import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { loadMyUserProfile } from "@auth/GoogleApi";
import { useGoogleSignIn } from "@auth/GoogleAuthApi";
import { updateUserProfile } from "@actions/UserActions";
import { Loader } from "@components/Loader/Loader";
import { store } from "@state/store";

import styles from "./AuthenticationScreen.modules.css";

const AuthenticationScreen = () => {
  const [loading, setLoading] = useState(false);

  const promptGoogleSignIn = useGoogleSignIn();

  const onSignInPress = async () => {
    setLoading(true);

    const successGoogleSignIn = await promptGoogleSignIn();

    if (successGoogleSignIn) {
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

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Google Sign-In
      </Text>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text>Not yet signed in </Text>
          <Button
            style={styles.button}
            title={"Sign-In using Google Account"}
            onPress={onSignInPress}
          />
        </>
      )}
    </View>
  );
};

export default AuthenticationScreen;
