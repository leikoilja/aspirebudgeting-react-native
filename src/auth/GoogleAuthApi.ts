import { Platform } from "react-native";
import * as Google from "expo-google-app-auth";
import * as SecureStore from "expo-secure-store";
import { AuthData, IGAuth } from "./types";
import { store } from "@state/store";
import { updateGoogleAccessTokenExpiry } from "@actions/AuthActions";
import {
  saveTokensToSecureStore,
  removeTokensFromSecureStore,
} from "@state/secureStore";
import {
  GOOGLE_SCOPE_USER_EMAIL,
  GOOGLE_SCOPE_USER_PROFILE,
  STORAGE_KEY_GOOGLE_ACCESS_TOKEN,
  STORAGE_KEY_GOOGLE_REFRESH_TOKEN,
} from "@const";

export const getGoogleAccessToken = async () => {
  const { accessTokenExpiryTimeUnix } = store.getState()?.auth;
  if (accessTokenExpiryTimeUnix) {
    if (new Date().getTime() >= accessTokenExpiryTimeUnix) {
      const { success: successRefreshToken } =
        await refreshGoogleAccessTokens();
      if (!successRefreshToken) {
        console.error("Failed to refresh google access tokens");
        return { success: false, error };
      }
    }
  } else {
    const { success: successSignIn, error } = await signInWithGoogle();
    if (!successSignIn) {
      console.error("Failed to sign in via Google");
      return { success: false, error };
    }
  }
  return await SecureStore.getItemAsync(STORAGE_KEY_GOOGLE_ACCESS_TOKEN);
};

export const signInWithGoogle = async () => {
  try {
    const response = await Google.logInAsync({
      expoClientId: process.env.EXPO_CLIENT_ID,
      androidClientId: process.env.ANDROID_CLIENT_ID,
      iosClientId: process.env.IOS_CLIENT_ID,
      scopes: [GOOGLE_SCOPE_USER_EMAIL, GOOGLE_SCOPE_USER_PROFILE],
    });

    if (response.type === "success") {
      await saveTokensToSecureStore({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      store.dispatch(
        updateGoogleAccessTokenExpiry(new Date().getTime() + 60 * 60 * 1000),
      );
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Failed to sign-up", error);
    return { success: false, error: error };
  }
};

export const refreshGoogleAccessTokens = async () => {
  const refreshToken = await SecureStore.getItemAsync(
    STORAGE_KEY_GOOGLE_REFRESH_TOKEN,
  );
  const clientId = Platform.select({
    ios: process.env.IOS_CLIENT_ID,
    android: process.env.ANDROID_CLIENT_ID,
  });
  const response = await fetch(
    `https://oauth2.googleapis.com/token?client_id=${clientId}&refresh_token=${refreshToken}&grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  if (response.status !== 200) {
    return {
      success: false,
      error: `Received unexpected status code ${response.status} while refreshing google access token`,
    };
  }

  const { access_token: accessToken, expires_in: accessTokenExpiryTimeUnix } =
    await response.json();

  await saveTokensToSecureStore({ accessToken: accessToken });
  store.dispatch(
    updateGoogleAccessTokenExpiry(
      new Date().getTime() + accessTokenExpiryTimeUnix * 1000,
    ),
  );
  return { success: true };
};
