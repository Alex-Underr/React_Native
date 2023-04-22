import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import RegistrationForm from "../../components/RegistrationForm";

const screenDimensions = Dimensions.get("screen");

export default function RegistrationScreen({ navigation }) {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [dimensions, setDimensions] = useState({
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ screen });
      }
    );
    return () => subscription?.remove();
  });

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsKeyboardShown(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBG}
          source={require("../../assets/images/photo-bg.png")}
        >
          <View style={styles.white_bg}>
            <View style={styles.img_input}>
              <Image
                style={styles.img_plus}
                source={require("../../assets/images/addImage.png")}
              />
            </View>

            <Text style={[styles.title, { fontWeight: 500 }]} lineHeight="1.17" letterSpacing="0.01em">
              Registration
            </Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "marginBottom" : "height"}
            >
              <RegistrationForm
                dimensions={dimensions}
                isKeyboardShown={isKeyboardShown}
                setIsKeyboardShown={setIsKeyboardShown}
                navigation={navigation}
              />
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#575757",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  white_bg: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  img_input: {
    position: "absolute",
    top: -60,
    left: 132,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  img_plus: {
    position: "absolute",
    right: -14,
    bottom: 12,
    height: 30,
    width: 30,
  },
  title: {
    marginTop: 92,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
        fontSize: 30,
    color: "#212121",
  },
});
