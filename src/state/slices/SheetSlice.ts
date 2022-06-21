import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  // spreadsheetId: "1kzH6JdkFtuS-Iy3CnaAxfaYnzJ7pwydu0nwhV3_opME",
  spreadsheetId: "",
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState: initialState,
  reducers: {
    setSpreadsheetId: (state, action: PayloadAction<string>) => {
      state.spreadsheetId = action.payload;
    },
  },
});

export const { setSpreadsheetId } = sheetSlice.actions;
export default sheetSlice.reducer;
