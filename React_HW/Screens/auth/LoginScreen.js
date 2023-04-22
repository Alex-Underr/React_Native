import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";

import BackgroundImage from "../../components/BackgroundImage";
import LoginForm from "../../components/LoginForm";

const screenDimensions = Dimensions.get("screen");

export default function LoginScreen({navigation}) {
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
        <BackgroundImage>
          <View style={styles.white_bg}>
            <Text
              style={[styles.title, {fontWeight: 500 }]}
              lineHeight="1.17"
              letterSpacing="0.01em"
            >
              Login
            </Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "marginBottom" : "height"}
            >
              <LoginForm
                dimensions={dimensions}
                isKeyboardShown={isKeyboardShown}
                setIsKeyboardShown={setIsKeyboardShown}
                navigation={navigation}
              />
            </KeyboardAvoidingView>
          </View>
        </BackgroundImage>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#575757",
  },
  white_bg: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    marginTop: 32,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },
});
