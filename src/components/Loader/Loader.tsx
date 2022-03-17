import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import styles from "./Loader.module.css";

export const Loader = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loader} {...props} />
      <Text>Please wait</Text>
    </View>
  );
};
