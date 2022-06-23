import DriveServices from "@api/DriveServices";
import * as GoogleAuthApi from "@api/GoogleAuthApi";
import { GOOGLE_DRIVE_BASE_URL } from "@const";
import { server, rest } from "../../testServer";
import { availableSheets } from "./responses";

const mockGetGoogleAccessToken = () =>
  jest
    .spyOn(GoogleAuthApi, "getGoogleAccessToken")
    .mockImplementation(() => Promise.resolve(""));

describe("Drive Services in isolation", () => {
  test("Google Drive API returns list of spreadsheets", async () => {
    server.use(
      rest.get(`${GOOGLE_DRIVE_BASE_URL}/files`, (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(availableSheets));
      })
    );
    mockGetGoogleAccessToken();

    const returnValue = await DriveServices.loadAvailableSpreadsheets();

    expect(returnValue).toEqual([
      {
        id: 0,
        name: "test_file_1",
        uuid: "1kzH6JdkFtuS-Iy3CnaAxfaYnzJ7pwydu0nwhV3_1234",
      },
      {
        id: 1,
        name: "test_file_2",
        uuid: "1kzH6JdkFtuS-Iy3CnaAxfaYnzJ7pwydu0nwhV3_5678",
      },
      {
        id: 2,
        name: "test_file_3",
        uuid: "1kzH6JdkFtuS-Iy3CnaAxfaYnzJ7pwydu0nwhV3_9012",
      },
    ]);
  });
});
