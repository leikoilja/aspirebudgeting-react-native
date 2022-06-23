/*
 eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-return,
 @typescript-eslint/no-unsafe-member-access
 */
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, ListItem } from "react-native-elements";
import { useQuery } from "react-query";
import { Loader } from "@components/Loader/Loader";
import { Account } from "@types";
import AccountServices from "@api/AccountServices";
import styles from "./AccountsScreen.modules.css";

const AccountsScreen = () => {
  const [accountsInfo, setAccountsInfo] = useState<Account[]>([]);

  const { isLoading: isLoadingAccounts, refetch: refetchAllAccounts } =
    useQuery<Account[], Error>(
      "query-accounts",
      async () => {
        return await AccountServices.loadAccountBalances();
      },
      {
        enabled: true,
        onSuccess: (data) => {
          setAccountsInfo(data);
        },
        onError: (error: any) => {
          console.error("Error loading accounts data", error);
        },
      }
    );

  return (
    <View style={styles.container}>
      <Text h2 style={styles.title}>
        Account Balances
      </Text>
      {isLoadingAccounts ? (
        <Loader />
      ) : (
        <View style={styles.accounts_wrapper}>
          {accountsInfo.map((account: Account) => (
            <ListItem key={account.id} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{account.name}</ListItem.Title>
                <ListItem.Subtitle>{account.amount}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
          <Button
            title={"Refetch all accounts data"}
            onPress={() => refetchAllAccounts()}
          />
        </View>
      )}
    </View>
  );
};

export default AccountsScreen;
