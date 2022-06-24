import * as GoogleAuthApi from "@api/GoogleAuthApi";
import { GOOGLE_DRIVE_BASE_URL } from "@const";
import { server, rest } from "../../testServer";
import { availableSheets } from "../../api/tests/responses";
import { render, TestWrapper } from "@libs/test-utils";
import SheetSelectionScreen from "./SheetSelectionScreen";
import React from "react";

beforeEach(() => {
  jest
    .spyOn(GoogleAuthApi, "getGoogleAccessToken")
    .mockImplementation(() => Promise.resolve(""));

  server.use(
    rest.get(`${GOOGLE_DRIVE_BASE_URL}/files`, (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(availableSheets));
    })
  );
});

describe("Sheet Selection screen", () => {
  test("renders list of available sheets", async () => {
    const { getByText, findByText } = render(
      <TestWrapper>
        <SheetSelectionScreen />
      </TestWrapper>
    );
    // Assert static elements and data loading
    expect(getByText("SpreadSheet selection")).toBeTruthy();
    expect(getByText("Please wait")).toBeTruthy();

    // Assert list of available sheets
    expect(await findByText("test_file_1")).toBeTruthy();
    expect(
      getByText("Sheet ID - 1kzH6JdkFtuS-Iy3CnaAxfaYnzJ7pwydu0nwhV3_1234")
    ).toBeTruthy();

    expect(getByText("test_file_2")).toBeTruthy();
    expect(
      getByText("Sheet ID - 1kzH6JdkFtuS-Iy3CnaAxfaYnzJ7pwydu0nwhV3_5678")
    ).toBeTruthy();

    expect(getByText("test_file_3")).toBeTruthy();
    expect(
      getByText("Sheet ID - 1kzH6JdkFtuS-Iy3CnaAxfaYnzJ7pwydu0nwhV3_9012")
    ).toBeTruthy();
  });
});
