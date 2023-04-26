import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import formattingDate from "../helpers/dateString";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { postId, photo } = route.params;
  const { name } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    const docRef = await doc(db, "posts", postId);
    onSnapshot(collection(docRef, "comments"), (posts) => {
      setAllComments(posts.docs.map((doc) => ({ ...doc.data() })));
    });
  };

  const postComment = () => {
    const formattedComment = comment.trim();
    if (formattedComment !== "") {
      uploadCommentToServer();
      keyboardHide();
      setComment("");
    } else {
      alert("Write the comment...");
    }
  };

  const uploadCommentToServer = async () => {
    const currentDate = formattingDate();
    const docRef = await doc(db, "posts", postId);
    const createComment = await addDoc(collection(docRef, "comments"), {
      comment,
      commentAuthor: name,
      time: currentDate,
    });
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: photo }} />
      <FlatList
        data={allComments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback>
            <View style={styles.commentWrapper}>
              <Text style={[styles.commentAuthor, { fontWeight: 700 }]}>
                {item.commentAuthor}:
              </Text>
              <View style={styles.commentTextWrapper}>
                <Text style={styles.commentText}>{item.comment}</Text>
                <Text style={styles.commentDate}>{item.time}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          paddingLeft={16}
          placeholder="Comment..."
          placeholderTextColor="#BDBDBD"
          value={comment}
          onChangeText={(value) => setComment(value)}
        />
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.7}
          onPress={postComment}
        >
          <AntDesign name="arrowup" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  image: {
    width: "100%",
    height: 240,
    marginBottom: 20,
    borderRadius: 8,
  },
  commentWrapper: {
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 8,
    marginBottom: 12,
    // alignItems: "center",
  },
  commentAuthor: {
    marginRight: 8,
    paddingTop: 16,
    fontFamily: "Roboto-Medium",
    // fontWeight: 700,
    color: "#212121",
  },
  commentTextWrapper: {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "#00000008",
  },
  commentText: {
    fontSize: 13,
    color: "#212121",
  },
  commentDate: {
    fontSize: 10,
    textAlign: "right",
    color: "#BDBDBD",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    color: "#212121",
  },
  submitButton: {
    position: "absolute",
    top: 8,
    right: 8,
    height: 34,
    width: 34,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34,
    backgroundColor: "#FF6C00",
  },
});
