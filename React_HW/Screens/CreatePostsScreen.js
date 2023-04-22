import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import SubmitButton from "../components/SubmitButton";

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");
  const [locationFromInput, setLocationFromInput] = useState("");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isTitleInputActive, setIsTitleInputActive] = useState(false);
  const [isLocationInputActive, setIsLocationInputActive] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied ❌");
        return;
      }
      console.log("Permission to location was access ✅");
    })();
  }, []);

  const takePhoto = async () => {
    const pic = await camera.takePictureAsync();
    // const location = await Location.getCurrentPositionAsync();
    setPhoto(pic.uri);
    setLocation(location);
  };

  const onFormSubmit = () => {
    navigation.navigate("Post", { photo, location, title, locationFromInput });
    resetForm();
  };

  const resetForm = () => {
    setPhoto("");
    setLocation(null);
    setTitle("");
    setLocationFromInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <Camera style={styles.cameraScreen} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: "100%", width: "100%" }}
              />
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <MaterialIcons
                name="camera-alt"
                size={24}
                color={photo ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      <Text style={styles.text}>{photo ? "Edit photo" : "Load photo"}</Text>
      <View style={styles.form}>
        <TextInput
          style={{
            ...styles.input,
            marginBottom: 16,
          }}
          value={title}
          onFocus={() => {
            setIsKeyboardShown(true);
            setIsTitleInputActive(true);
          }}
          onBlur={() => {
            setIsKeyboardShown(false);
            setIsTitleInputActive(false);
          }}
          onChangeText={(value) => setTitle(value)}
          placeholder="Title"
          placeholderTextColor={"#BDBDBD"}
        />
        <TextInput
          style={styles.input}
          value={locationFromInput}
          onFocus={() => {
            setIsKeyboardShown(true);
            setIsLocationInputActive(true);
          }}
          onBlur={() => {
            setIsKeyboardShown(false);
            setIsLocationInputActive(false);
          }}
          onChangeText={(value) => setLocationFromInput(value)}
          placeholder="Location"
          placeholderTextColor={"#BDBDBD"}
        />
      </View>
      <View style={styles.tabBarWrapper}></View>
      {photo && title && locationFromInput ? (
        <SubmitButton title="Post" onFormSubmit={onFormSubmit} />
      ) : (
        <SubmitButton title="Post" disabled="true" />
      )}
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableOpacity
          style={styles.trashButton}
          activeOpacity={0.7}
          onPress={resetForm}
        >
          <Feather name="trash-2" size={24} color="#c7c7c7" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  cameraWrapper: {
    marginTop: 32,
    overflow: "hidden",
    borderRadius: 10,
  },
  cameraScreen: {
    height: 240,
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
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  text: {
    marginTop: 8,
    paddingLeft: 4,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  form: {
    marginVertical: 32,
  },
  input: {
    height: 50,
    paddingLeft: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  trashButton: {
    marginBottom: 34,
    marginTop: "auto",
    height: 40,
    width: 70,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
