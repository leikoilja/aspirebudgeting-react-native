import UserServices from "@api/UserServices";
import * as GoogleAuthApi from "@api/GoogleAuthApi";
import { GOOGLE_PEOPLE_BASE_URL } from "@const";
import { server, rest } from "../../testServer";
import { userProfile } from "./responses";

const mockGetGoogleAccessToken = () =>
  jest
    .spyOn(GoogleAuthApi, "getGoogleAccessToken")
    .mockImplementation(() => Promise.resolve(""));

describe("User Services in isolation", () => {
  test("Google Person API returns user profile", async () => {
    server.use(
      rest.get(GOOGLE_PEOPLE_BASE_URL, (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(userProfile));
      })
    );
    mockGetGoogleAccessToken();

    const returnValue = await UserServices.loadUserProfile();

    expect(returnValue).toEqual({
      email: "test@example.com",
      firstName: "Melvin",
      lastName: "Testerson",
    });
  });
});
