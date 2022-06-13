/*
 eslint-disable
 @typescript-eslint/no-unsafe-argument,
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/restrict-template-expressions
 */
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";
import { store } from "@state/store";
import { updateGoogleAccessTokenExpiry, logout } from "@actions/AuthActions";
import { saveTokensToSecureStore } from "@state/secureStore";
import {
  GOOGLE_AUTH_URL,
  GOOGLE_SCOPE_DRIVE_READONLY,
  GOOGLE_SCOPE_SPREADSHEETS,
  GOOGLE_SCOPE_USER_EMAIL,
  GOOGLE_SCOPE_USER_PROFILE,
  STORAGE_KEY_GOOGLE_ACCESS_TOKEN,
  STORAGE_KEY_GOOGLE_REFRESH_TOKEN,
} from "@const";

// Note, mandatory to dismiss the web popup
// https://docs.expo.dev/guides/authentication/#google
WebBrowser.maybeCompleteAuthSession();

export const getGoogleAccessToken = async () => {
  const { accessTokenExpiryTimeUnix } = store.getState().auth;
  if (accessTokenExpiryTimeUnix) {
    // Check if stored access token is expired
    if (new Date().getTime() >= accessTokenExpiryTimeUnix) {
      const { success: successRefreshToken } =
        await refreshGoogleAccessTokens();
      if (!successRefreshToken) {
        const error = "Failed to refresh google access tokens";
        console.error(error);
        store.dispatch(logout());
        return { success: false, error };
      }
    }
  } else {
    const error = "You are not signed in";
    console.error(error);
    return { success: false, error };
  }
  return await SecureStore.getItemAsync(STORAGE_KEY_GOOGLE_ACCESS_TOKEN);
};

export const useGoogleSignIn = () => {
  // Construct authentication request
  // proxy through expo servers
  const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authRequest, _authResponse, popAuthenticationModal] =
    Google.useAuthRequest({
      expoClientId: process.env.EXPO_CLIENT_ID,
      androidClientId: process.env.ANDROID_CLIENT_ID,
      iosClientId: process.env.IOS_CLIENT_ID,
      scopes: [
        GOOGLE_SCOPE_USER_EMAIL,
        GOOGLE_SCOPE_USER_PROFILE,
        GOOGLE_SCOPE_SPREADSHEETS,
        GOOGLE_SCOPE_DRIVE_READONLY,
      ],
      responseType: "code",
      shouldAutoExchangeCode: false,
      extraParams: {
        access_type: "offline",
        prompt: "consent",
      },
    });

  const exchangeCodeForTokens = (code, code_verifier, redirectUrl) => {
    const tokenResult = AuthSession.exchangeCodeAsync(
      {
        code: code,
        clientId: process.env.EXPO_CLIENT_ID,
        clientSecret: process.env.EXPO_CLIENT_SECRET,
        redirectUri: redirectUrl,
        extraParams: {
          code_verifier: code_verifier,
        },
      },
      Google.discovery
    );
    return tokenResult;
  };

  const promptGoogleSignIn = async () => {
    const authResponse = await popAuthenticationModal();
    // Exchange authentication code to tokens
    const { accessToken, expiresIn, refreshToken } =
      await exchangeCodeForTokens(
        authResponse.params.code,
        authRequest?.codeVerifier ? authRequest.codeVerifier : "",
        redirectUrl
      );
    if (accessToken && expiresIn && refreshToken) {
      // Save tokens to secure store
      await saveTokensToSecureStore({
        accessToken,
        refreshToken,
      });
      // Update access token expiry time
      store.dispatch(updateGoogleAccessTokenExpiry(expiresIn));
      return true;
    } else {
      return false;
    }
  };
  return promptGoogleSignIn;
};

export const refreshGoogleAccessTokens = async () => {
  const refreshToken = await SecureStore.getItemAsync(
    STORAGE_KEY_GOOGLE_REFRESH_TOKEN
  );
  const response = await fetch(GOOGLE_AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clientId: process.env.EXPO_CLIENT_ID,
      clientSecret: process.env.EXPO_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (response.status !== 200) {
    return {
      success: false,
      error: `Received unexpected status code ${response.status} while refreshing google access token`,
    };
  }

  const { access_token: accessToken, expires_in: expiresIn } =
    await response.json();

  await saveTokensToSecureStore({ accessToken });
  store.dispatch(updateGoogleAccessTokenExpiry(expiresIn));
  return { success: true };
};
