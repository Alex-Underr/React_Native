import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/authorise/authOperations";

import SubmitButton from "./SubmitButton";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationForm({
  dimensions,
  isKeyboardShown,
  setIsKeyboardShown,
  navigation,
}) {
  const [userData, setUserData] = useState(initialState);
  const [isLoginInputActive, setIsLoginInputActive] = useState(false);
  const [isEmailInputActive, setIsEmailInputActive] = useState(false);
  const [isPasswordInputActive, setIsPasswordInputActive] = useState(false);
  const [showPass, setShowPass] = useState(true);

  const dispatch = useDispatch();

  const onFormSubmit = () => {
    dispatch(signUpUser(userData));
    Keyboard.dismiss();
    setUserData(initialState);
  };
  const toggleShowPass = () => {
    setShowPass((prevState) => !prevState);
  };
  return (
    <View
      style={{
        ...styles.form,
        width: dimensions.screen.width - 16 * 2,
      }}
    >
      <TextInput
        style={{
          ...styles.input,
          backgroundColor: isLoginInputActive ? "#FFFFFF" : "#F6F6F6",
          borderColor: isLoginInputActive ? "#FF6C00" : "#E8E8E8",
        }}
        value={userData.login}
        onFocus={() => {
          setIsKeyboardShown(true);
          setIsLoginInputActive(true);
        }}
        onBlur={() => {
          setIsKeyboardShown(false);
          setIsLoginInputActive(false);
        }}
        onChangeText={(value) =>
          setUserData((prevState) => ({ ...prevState, login: value }))
        }
        placeholder="Login"
        placeholderTextColor={"#BDBDBD"}
      />
      <TextInput
        style={{
          ...styles.input,
          backgroundColor: isEmailInputActive ? "#FFFFFF" : "#F6F6F6",
          borderColor: isEmailInputActive ? "#FF6C00" : "#E8E8E8",
        }}
        value={userData.email}
        onFocus={() => {
          setIsKeyboardShown(true);
          setIsEmailInputActive(true);
        }}
        onBlur={() => {
          setIsKeyboardShown(false);
          setIsEmailInputActive(false);
        }}
        onChangeText={(value) =>
          setUserData((prevState) => ({ ...prevState, email: value }))
        }
        placeholder="Email"
        placeholderTextColor={"#BDBDBD"}
      />
      <View>
        <TextInput
          style={{
            ...styles.last_input,
            backgroundColor: isPasswordInputActive ? "#FFFFFF" : "#F6F6F6",
            borderColor: isPasswordInputActive ? "#FF6C00" : "#E8E8E8",
          }}
          value={userData.password}
          onFocus={() => {
            setIsKeyboardShown(true);
            setIsPasswordInputActive(true);
          }}
          onBlur={() => {
            setIsKeyboardShown(false);
            setIsPasswordInputActive(false);
          }}
          onChangeText={(value) =>
            setUserData((prevState) => ({
              ...prevState,
              password: value,
            }))
          }
          secureTextEntry={showPass}
          placeholder="Password"
          placeholderTextColor={"#BDBDBD"}
        />
        <Text
          style={[styles.show, { fontWeight: "400" }]}
          onPress={toggleShowPass}
        >
          Show
        </Text>
      </View>
      <SubmitButton title="Sign up" onFormSubmit={onFormSubmit} />
      <View
        style={{
          ...styles.text_wrapper,
          marginBottom: isKeyboardShown
            ? -100
            : Math.floor(dimensions.screen.height / 10.5),
        }}
      >
        <TouchableOpacity activeOpacity={0.75}>
          <Text style={[styles.text, { fontWeight: "400" }]}>
            Already have an account?
            <Text onPress={() => navigation.navigate("Login")}> Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {},
  input: {
    height: 50,
    marginBottom: 16,
    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  last_input: {
    height: 50,
    marginBottom: 43,
    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    position: "relative",
  },
  text_wrapper: {
    alignItems: "center",
    marginTop: 16,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  show: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    position: "absolute",
    right: 16,
    top: 15,
  },
});
