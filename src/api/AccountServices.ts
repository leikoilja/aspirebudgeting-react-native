/*
 eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/no-unsafe-return,
 */
import { store } from "@state/store";
import { Account } from "@types";
import { API_DEFAULT_PARAMS, sheetApiClient } from "./api";

const loadAccountBalances = async () => {
  const { spreadsheetId }: { spreadsheetId: string } = store.getState().sheet;
  const responseJson = await sheetApiClient.get(
    `${spreadsheetId}/values/Dashboard!B8:C`,
    {
      params: {
        ...API_DEFAULT_PARAMS,
      },
    }
  );

  if (!responseJson.data || !responseJson.data.values) {
    return [];
  }

  const extractedValues = responseJson.data.values.reduce(
    (accounts: Account[], row: string[], index: number) => {
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

  return extractedValues;
};

const AccountServices = {
  loadAccountBalances,
};
export default AccountServices;
