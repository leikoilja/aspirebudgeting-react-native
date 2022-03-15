/*
 eslint-disable
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-return,
 @typescript-eslint/no-unsafe-member-access
 */
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Button } from "react-native-elements";
import styles from "./HomeScreen.modules.css";

const HomeScreen = () => {
  const user = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is styled using css</Text>
      <Text>Hey, {user.firstName ? user.firstName : "stranger"}</Text>
      <Button
        title="Green Button"
        buttonStyle={styles.button}
        containerStyle={styles.button_container}
        titleStyle={styles.button_title}
      />
    </View>
  );
};

export default HomeScreen;
