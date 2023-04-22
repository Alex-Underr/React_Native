import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function SubmitButton({
  title,
  onFormSubmit,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      onPress={onFormSubmit}
      activeOpacity={0.7}
      style={{
        ...styles.btn,
        backgroundColor: disabled ? "#F6F6F6" : "#FF6C00",
      }}
    >
      <Text
        style={{ ...styles.btn_text, color: disabled ? "#BDBDBD" : "#FFFFFF" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  btn_text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
