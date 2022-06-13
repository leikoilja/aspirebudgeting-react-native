/*
 eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/restrict-template-expressions,
 */
import { peopleApiClient } from "./api";

const loadUserProfile = async () => {
  const responseJson = await peopleApiClient.get("/", {
    params: {
      personFields: "names,emailAddresses",
    },
  });
  return {
    email: responseJson.data.emailAddresses[0].value,
    firstName: responseJson.data.names[0].givenName,
    lastName: responseJson.data.names[0].familyName,
  };
};

const UserServices = {
  loadUserProfile,
};
export default UserServices;
