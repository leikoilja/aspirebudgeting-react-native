/*
 eslint-disable
 @typescript-eslint/no-unsafe-argument,
 */
import * as SecureStore from "expo-secure-store";
import {
  STORAGE_KEY_GOOGLE_ACCESS_TOKEN,
  STORAGE_KEY_GOOGLE_REFRESH_TOKEN,
} from "@const";

export const saveTokensToSecureStore = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken?: string;
}) => {
  await SecureStore.setItemAsync(STORAGE_KEY_GOOGLE_ACCESS_TOKEN, accessToken);
  if (refreshToken)
    await SecureStore.setItemAsync(
      STORAGE_KEY_GOOGLE_REFRESH_TOKEN,
      refreshToken
    );
};

export const removeTokensFromSecureStore = async () => {
  await SecureStore.deleteItemAsync(STORAGE_KEY_GOOGLE_ACCESS_TOKEN);
  await SecureStore.deleteItemAsync(STORAGE_KEY_GOOGLE_REFRESH_TOKEN);
};
