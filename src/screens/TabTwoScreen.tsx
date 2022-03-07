import { useState } from "react";
import { Button, TextInput, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { updateUsername } from "@actions/UserActions";

const TabTwoScreen = () => {
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState("");

  const saveUsername = () => {
    // in case the username hasnt been updated
    if (newUsername === "") return;

    dispatch(updateUsername(newUsername));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={{ margin: 40 }}>
        <Text>
          Type in your new username that will be persistently saved in Redux
          store
        </Text>
        <Text>
          Note, it will be displayed on 'Tab One' screen even after the reboot
          of the app (it's persistent)
        </Text>
        <TextInput
          style={{
            margin: 10,
            height: 40,
            borderWidth: 1,
            borderRadius: 12,
            padding: 8,
          }}
          onChangeText={(text) => setNewUsername(text)}
          value={newUsername}
          placeholder="New Username"
          placeholderTextColor="white"
        />
        <Button
          style={{
            height: 40,
            width: 160,
            backgroundColor: "white",
            borderRadius: 8,
            marginTop: 10,
          }}
          title="Save"
          onPress={() => saveUsername()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default TabTwoScreen;
