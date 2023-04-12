import {
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function Registration() {
  const [userInfo, setUserInfo] = useState(initialState);
  const [showPass, setShowPass] = useState(true);
  const [focusIndex, setFocusIndex] = useState(null);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const screenDimensions = Dimensions.get("screen");
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

  const toggleShowPass = () => {
    setShowPass((prevState) => !prevState);
  };

  const handleFocus = (index) => {
    setFocusIndex(index);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsKeyboardShown(false);
  };

  const onPressSubmit = () => {
    console.log(userInfo);
    setUserInfo(initialState);
    keyboardHide();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/img/bg.png")}
          style={styles.image}
        >
          <View
            style={{
              ...styles.form,
              // marginBottom: isKeyboardShown ? -100 : 0,
              paddingBottom: !isKeyboardShown ? 78 : 0,
            }}
          >
            <View style={styles.addPhoto}>
              <Image
                style={styles.addPlus}
                source={require("../assets/img/add.png")}
              />
            </View>
            <Text style={styles.text} lineHeight="1.17" letterSpacing="0.01em">
              Registration
            </Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : ""}
            >
              <View
                onBlur={() => setFocusIndex(null)}
                onFocus={() => setIsKeyboardShown(true)}
                style={{ width: dimensions.screen.width - 16 * 2 }}
              >
                <TextInput
                  onFocus={() => handleFocus(1)}
                  style={[styles.input, focusIndex === 1 && styles.inputFocus]}
                  placeholder="Login"
                  placeholderTextColor="#BDBDBD"
                  onChangeText={(value) =>
                    setUserInfo((prevState) => ({ ...prevState, login: value }))
                  }
                  value={userInfo.login}
                />
                <TextInput
                  onFocus={() => handleFocus(2)}
                  style={[styles.input, focusIndex === 2 && styles.inputFocus]}
                  placeholder="Email address"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="email-address"
                  onChangeText={(value) =>
                    setUserInfo((prevState) => ({ ...prevState, email: value }))
                  }
                  value={userInfo.email}
                />
                <View>
                  <TextInput
                    onFocus={() => handleFocus(3)}
                    style={[styles.pass, focusIndex === 3 && styles.inputFocus]}
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={showPass}
                    onChangeText={(value) =>
                      setUserInfo((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    value={userInfo.password}
                  ></TextInput>
                  <Text style={styles.show} onPress={toggleShowPass}>
                    Show
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.75}
                  style={styles.btn}
                  onPress={onPressSubmit}
                >
                  <Text style={styles.btnText}>Sign up</Text>
                </TouchableOpacity>
                <Text style={styles.signIn}>
                  Already have an account? Sign in
                </Text>
              </View>
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
    backgroundColor: "fff",
  },

  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },

  form: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: "center",
  },

  addPhoto: {
    position: "absolute",
    top: -60,
    left: 132,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  addPlus: {
    position: "absolute",
    right: -14,
    bottom: 12,
    height: 30,
    width: 30,
  },

  text: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    paddingTop: 92,
    paddingBottom: 32,
  },

  input: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    borderStyle: "solid",
    textAlignVertical: "center",
    paddingLeft: 16,
  },

  pass: {
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    textAlignVertical: "center",
    paddingLeft: 16,
  },

  show: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    color: "#1B4371",
    position: "absolute",
    right: 16,
    top: 15,
  },

  inputFocus: {
    borderColor: "#FF6C00",
  },

  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
    marginTop: 43,
  },

  btnText: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
  },

  signIn: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
