import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, ListItem } from "react-native-elements";
import { useQuery } from "react-query";
import { SpreadSheet } from "@types";
import DriveServices from "@api/DriveServices";
import styles from "./SheetSelectionScreen.modules.css";
import { Loader } from "@components/Loader/Loader";
import { store } from "@state/store";
import { setSpreadsheetId } from "@slices/SheetSlice";

const SheetSelectionScreen = () => {
  const [availableSheets, setAvailableSheets] = useState<SpreadSheet[]>([]);

  const {
    isLoading: isLoadingAvailableSheets,
    refetch: refetchAvailableSheets,
  } = useQuery<SpreadSheet[], Error>(
    "query-spreadsheets",
    async () => {
      return await DriveServices.loadAvailableSpreadsheets();
    },
    {
      enabled: true,
      onSuccess: (data) => {
        setAvailableSheets(data);
      },
      onError: (error: any) => {
        console.error("Error loading spreadsheets", error);
      },
    }
  );

  const selectSheet = (sheet: SpreadSheet) => {
    store.dispatch(setSpreadsheetId(sheet.uuid));
  };

  return (
    <View style={styles.container}>
      <Text h2 style={styles.title}>
        SpreadSheet selection
      </Text>
      {isLoadingAvailableSheets ? (
        <Loader />
      ) : (
        <View style={styles.sheets_wrapper}>
          {availableSheets.map((sheet: SpreadSheet) => (
            <ListItem
              key={sheet.id}
              onPress={() => selectSheet(sheet)}
              bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{sheet.name}</ListItem.Title>
                <ListItem.Subtitle>Sheet ID - {sheet.uuid}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
          <Button
            title={"Refetch spreadsheets"}
            onPress={() => refetchAvailableSheets()}
          />
        </View>
      )}
    </View>
  );
};

export default SheetSelectionScreen;
