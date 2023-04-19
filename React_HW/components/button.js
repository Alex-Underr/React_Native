import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function Button({ title, onPress, disabled = false }) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        ...styles.btn,
        backgroundColor: disabled ? "#F6F6F6" : "#FF6C00",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.btnText,
          fontWeight: "400",
          color: disabled ? "#BDBDBD" : "#FFFFFF",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    borderRadius: 100,
    marginBottom: 16,
    marginTop: 43,
  },

  btnText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
  },
});
