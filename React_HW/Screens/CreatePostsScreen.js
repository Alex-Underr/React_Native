import { Text, StyleSheet, View } from "react-native";

export default function CreatePostsScreen() {
  return (
    <View style={styles.screen}>
      <Text>CreatePostsScreen</Text>
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
