export const UPDATE_USERNAME = "UPDATE_USERNAME";

export const updateUsername = (username: string) => ({
  type: UPDATE_USERNAME,
  username,
});
