import { useState, useEffect } from "react";
import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/button";

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    const pic = await camera.takePictureAsync();
    setPhoto(pic.uri);
    // const location = await Location.getCurrentPositionAsync();
    // setLocation(location);
  };
  const sendPhoto = () => {
    navigation.navigate("Posts", { photo });
  };
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: "100%", width: "100%" }}
              />
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <MaterialIcons name="camera-alt" size={24} color={"#BDBDBD"} />
          </TouchableOpacity>
        </Camera>
      </View>
      <Button title="Post" disabled="false" onPress={sendPhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },

  cameraContainer: {
    marginTop: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    position: "relative",
    overflow: "hidden",
  },

  camera: {
    height: 240,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  button: {
    marginTop: 90,
    marginLeft: 150,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
