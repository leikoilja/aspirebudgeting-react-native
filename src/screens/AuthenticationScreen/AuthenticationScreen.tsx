import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useQuery } from "react-query";
import UserServices from "@api/UserServices";
import { useGoogleSignIn } from "@api/GoogleAuthApi";
import { login } from "@slices/AuthSlice";
import { updateUserProfile } from "@slices/UserSlice";
import { Loader } from "@components/Loader/Loader";
import { store } from "@state/store";
import { UserProfile } from "@types";

import styles from "./AuthenticationScreen.modules.css";

const AuthenticationScreen = () => {
  const [loading, setLoading] = useState(false);

  const promptGoogleSignIn = useGoogleSignIn();

  const { refetch: fetchUserProfile } = useQuery<UserProfile, Error>(
    "query-user-data",
    async () => {
      return await UserServices.loadUserProfile();
    },
    {
      enabled: false,
      onSuccess: (data: UserProfile) => {
        const { email, firstName, lastName } = data;
        store.dispatch(
          updateUserProfile({
            email,
            firstName,
            lastName,
          })
        );
      },
      onError: (error: any) => {
        console.error("Error loading user profile data", error);
      },
    }
  );

  const onSignInPress = async () => {
    setLoading(true);

    const successGoogleSignIn = await promptGoogleSignIn();

    if (successGoogleSignIn) {
      await fetchUserProfile();
      store.dispatch(login());
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
