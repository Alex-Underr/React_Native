import { Text, StyleSheet, View } from "react-native";

export default function MapScreen() {
  return (
    <View style={styles.screen}>
      <Text>MapScreen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
