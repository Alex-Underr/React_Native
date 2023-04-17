import { Text, StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text>ProfileScreen</Text>
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
