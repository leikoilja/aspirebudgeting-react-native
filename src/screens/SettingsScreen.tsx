import { useSelector } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { store } from "@state/store";
import { updateUserProfile } from "@actions/UserActions";
import { resetAccessTokenExpiryTime } from "@actions/AuthActions";
import { signInWithGoogle } from "../auth/GoogleAuthApi";
import { loadMyUserProfile } from "../auth/GoogleApi";
import {
  saveTokensToSecureStore,
  removeTokensFromSecureStore,
} from "@state/secureStore";

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
          }),
        );
      }
    } else {
      console.error("Failed to sign in via Google");
    }
  };

  const onLogoutPress = async () => {
    await removeTokensFromSecureStore();
    store.dispatch(resetAccessTokenExpiryTime());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Sign-In</Text>
      <Text>
        {auth.accessTokenExpiryTimeUnix
          ? `Successfully signed in as ${user.firstName} ${user.lastName} (${user.email})`
          : "Not yet signed in"}
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
});

export default SettingsScreen;
