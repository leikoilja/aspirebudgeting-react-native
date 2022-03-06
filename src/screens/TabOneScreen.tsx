import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { RootTabScreenProps } from "../types";

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  const user = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text>Hey, {user.username}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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

export default TabOneScreen;
