import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

const PostsScreen = ({ route }) => {
  console.log(route.params);
  return (
    <View style={styles.screen}>
      <Text>PostsScreen</Text>
    </View>
  );
};

PostsScreen.navigationOptions = (navData) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          // логіка для logout
        }}
      >
        <Image
          style={styles.addPlus}
          source={require("../assets/img/add.png")}
        />
      </TouchableOpacity>
    ),
  };
};

export default PostsScreen;

const styles = StyleSheet.create({
  addPlus: {
    position: "absolute",
    right: -14,
    bottom: 12,
    height: 30,
    width: 30,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
