import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase/config";
import { selectUser } from "../redux/authorise/authSelectors";
import { useSelector } from "react-redux";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const { name, email, userId } = useSelector(selectUser);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    await onSnapshot(collection(db, "posts"), (snapshots) => {
      setPosts(snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.avatarPlaceholder}></View>
        <View>
          <Text style={[styles.userName, { fontWeight: "700" }]}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <Image style={styles.image} source={{ uri: item.photo }} />
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.infoWrapper}>
              <TouchableOpacity
                style={styles.commentsWrapper}
                onPress={() =>
                  navigation.navigate("CommentsScreen", {
                    postId: item.id,
                    photo: item.photo,
                  })
                }
              >
                <Ionicons name="chatbubble-outline" size={24} color="#BDBDBD" />
                <Text style={styles.numberOfComments}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.locationWrapper}
                onPress={() => navigation.navigate("MapScreen", { posts })}
              >
                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                <Text style={styles.locationText}>
                  {item.locationFromInput}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  userInfo: {
    marginVertical: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#212121",
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121 rgba(33, 33, 33, 0.8)",
  },
  image: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: { fontFamily: "Roboto-Medium", fontSize: 16 },
  infoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 32,
  },
  commentsWrapper: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    justifyContent: "space-between",
  },
  numberOfComments: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationWrapper: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    justifyContent: "space-between",
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#212121",
  },
});
