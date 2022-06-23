/*
 eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-return,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/restrict-template-expressions,
 */
import { SpreadSheet } from "@types";
import { driveApiClient } from "./api";

const loadAvailableSpreadsheets = async (): Promise<SpreadSheet[]> => {
  const responseJson = await driveApiClient.get("/files", {
    params: {
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
    },
  });

  if (!responseJson.data || !responseJson.data.files) {
    return [];
  }

  const extractedValues = responseJson.data.files.reduce(
    (
      sheets: SpreadSheet[],
      element: { id: string; name: string },
      index: number
    ) => {
      sheets.push({
        id: index,
        uuid: element.id,
        name: element.name,
      });
      return sheets;
    },
    []
  );

  return extractedValues;
};

const DriveServices = {
  loadAvailableSpreadsheets,
};
export default DriveServices;
