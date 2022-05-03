/*
 eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-return,
 @typescript-eslint/no-unsafe-member-access
 */
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Button, Text } from "react-native-elements";
import styles from "./AccountsScreen.modules.css";

const AccountsScreen = () => {
  const user = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <Text h2 style={styles.title}>
        This is styled using css
      </Text>
      <Text h3 style={styles.text_username}>
        Hey, {user.firstName ? user.firstName : "stranger"}
      </Text>
      <Button title="Button" />
    </View>
  );
};

export default AccountsScreen;
