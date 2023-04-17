
import { Text, StyleSheet, View } from "react-native";

export default function CommentsScreen() {
  return (
    <View style={styles.screen}>
      <Text>CommentsScreen</Text>
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
