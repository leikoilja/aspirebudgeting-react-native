/*
 eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-argument,
 @typescript-eslint/no-unsafe-return,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/restrict-template-expressions
 */
import { GOOGLE_SHEETS_BASE_URL } from "@const";
import { Account } from "@types";
import { getGoogleAccessToken } from "./GoogleAuthApi";

export const loadMyUserProfile = async () => {
  const accessToken = await getGoogleAccessToken();
  const response = fetch(
    "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses",
    {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const email = data.emailAddresses[0].value;
      const firstName = data.names[0].givenName;
      const lastName = data.names[0].familyName;
      return {
        success: true,
        data: {
          email,
          firstName,
          lastName,
        },
      };
    })
    .catch((error) => {
      return { success: false, error: error };
    });
  return response;
};

export const loadAccountBalances = async () => {
  const accessToken = await getGoogleAccessToken();
  const spreadsheetId = "1kzH6JdkFtuS-Iy3CnaAxfaYnzJ7pwydu0nwhV3_opME";

  const response = fetch(
    `${GOOGLE_SHEETS_BASE_URL}/${spreadsheetId}/values/Dashboard!B8:C?valueRenderOption=UNFORMATTED_VALUE`,
    {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("raw data", data);
      if (!data || !data.values) {
        return [];
      }
      const extractedValues = data.values.reduce(
        (accounts: Account[], row: [], index: number) => {
          if (index % 2 == 0) {
            accounts.push({
              id: index,
              name: row[0],
              amount: parseFloat(row[1]),
            });
          } else {
            accounts[accounts.length - 1].lastUpdateOn = row[0];
          }
          return accounts;
        },
        []
      );

      return {
        success: true,
        data: extractedValues,
      };
    })
    .catch((error) => {
      return { success: false, error: error };
    });
  return response;
};
