import * as GoogleAuthApi from "@api/GoogleAuthApi";
import { GOOGLE_SHEETS_BASE_URL } from "@const";
import { server, rest } from "../../testServer";
import { accountsData } from "../../api/tests/responses";
import { render, TestWrapper } from "@libs/test-utils";
import AccountsScreen from "./AccountsScreen";
import React from "react";

beforeAll(() => {
  jest
    .spyOn(GoogleAuthApi, "getGoogleAccessToken")
    .mockImplementation(() => Promise.resolve(""));

  server.use(
    rest.get(
      `${GOOGLE_SHEETS_BASE_URL}/values/Dashboard!B8:C*`,
      (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(accountsData));
      }
    )
  );
});

describe("AccountsScreen", () => {
  test("renders list of accounts", async () => {
    const { getByText, findByText } = render(
      <TestWrapper>
        <AccountsScreen />
      </TestWrapper>
    );
    // Assert static elements and data loading
    expect(getByText("Account Balances")).toBeTruthy();
    expect(getByText("Please wait")).toBeTruthy();

    // Assert list of accounts
    expect(await findByText("Checking")).toBeTruthy();
    expect(getByText("8950")).toBeTruthy();

    expect(getByText("Emergency Account")).toBeTruthy();
    expect(getByText("12700")).toBeTruthy();

    expect(getByText("Stash Account")).toBeTruthy();
    expect(getByText("10000")).toBeTruthy();

    expect(getByText("CreditCard")).toBeTruthy();
    expect(getByText("0")).toBeTruthy();
  });
});
