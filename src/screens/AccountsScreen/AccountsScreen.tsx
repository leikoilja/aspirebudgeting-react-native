/*
 eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-return,
 @typescript-eslint/no-unsafe-member-access
 */
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Button, Text } from "react-native-elements";
import { loadAccountBalances } from "@auth/GoogleApi";
import { Loader } from "@components/Loader/Loader";
import styles from "./AccountsScreen.modules.css";
import { ListItem } from "react-native-elements";
import { Account } from "@types";

const AccountsScreen = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [accountBalances, setAccountBalances] = useState([]);

  const fetchAccountBalances = async () => {
    try {
      let response = await fetch("https://randomuser.me/api");
      let json = await response.json();
      return { success: true, data: json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await loadAccountBalances();
      if (response.success) {
        console.log("data", response.data);
        setAccountBalances(response.data);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text h2 style={styles.title}>
        Account Balances
      </Text>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.accounts_wrapper}>
          {accountBalances.map((account: Account) => (
            <ListItem key={account.id} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{account.name}</ListItem.Title>
                <ListItem.Subtitle>{account.amount}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      )}
    </View>
  );
};

export default AccountsScreen;
