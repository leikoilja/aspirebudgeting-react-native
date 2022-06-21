import AccountServices from "@api/AccountServices";
import * as GoogleAuthApi from "@api/GoogleAuthApi";
import { GOOGLE_SHEETS_BASE_URL } from "@const";
import { server, rest } from "../../testServer";
import { accountsData } from "./responses";

const mockGetGoogleAccessToken = () =>
  jest
    .spyOn(GoogleAuthApi, "getGoogleAccessToken")
    .mockImplementation(() => Promise.resolve(""));

describe("Account Services in isolation", () => {
  test("Google Sheet API returns account balances", async () => {
    server.use(
      rest.get(
        `${GOOGLE_SHEETS_BASE_URL}/values/Dashboard!B8:C*`,
        (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(accountsData));
        }
      )
    );
    mockGetGoogleAccessToken();

    const returnValue = await AccountServices.loadAccountBalances();

    expect(returnValue).toEqual([
      {
        amount: 8950,
        id: 0,
        lastUpdateOn: "Last recorded transaction was over a month ago",
        name: "Checking",
      },
      {
        amount: 0,
        id: 2,
        lastUpdateOn: "No recorded transactions",
        name: "Emergency Account",
      },
      {
        amount: 10000,
        id: 4,
        lastUpdateOn: "Last recorded transaction was over a month ago",
        name: "Stash Account",
      },
      {
        amount: 0,
        id: 6,
        lastUpdateOn: "No recorded transactions",
        name: "CreditCard",
      },
    ]);
  });
});
