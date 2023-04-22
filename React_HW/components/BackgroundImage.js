import { StyleSheet, ImageBackground } from "react-native";

export default function BackgroundImage({ children }) {
  return (
    <ImageBackground
      style={styles.imageBG}
      source={require("../assets/images/photo-bg.png")}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
