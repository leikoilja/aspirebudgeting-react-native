/*
 eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/restrict-template-expressions
 */
import { getGoogleAccessToken } from "./GoogleAuthApi";

export const loadMyUserProfile = async () => {
  const accessToken = getGoogleAccessToken();
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
