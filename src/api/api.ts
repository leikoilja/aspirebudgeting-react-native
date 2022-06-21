/*
 eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/restrict-template-expressions,
 */
import axios, { AxiosRequestConfig } from "axios";

import { getGoogleAccessToken } from "./GoogleAuthApi";
import { GOOGLE_SHEETS_BASE_URL, GOOGLE_PEOPLE_BASE_URL } from "@const";

export const API_DEFAULT_PARAMS = {
  valueRenderOption: "UNFORMATTED_VALUE",
};

export const sheetApiClient = axios.create({
  baseURL: GOOGLE_SHEETS_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

sheetApiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // Get token and add it to header "Authorization"
    const accessToken = await getGoogleAccessToken();
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const peopleApiClient = axios.create({
  baseURL: GOOGLE_PEOPLE_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

peopleApiClient.interceptors.request.use(
  async (config) => {
    // Get token and add it to header "Authorization"
    const accessToken = await getGoogleAccessToken();
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
