import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FF6C00",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarStyle: {
            height: 83,
            paddingHorizontal: 75,
          },
        }}
      >
        <Tab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            headerTitleAlign: "center",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-apps-outline"
                size={28}
                style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  //логіка логауту
                }}
              >
                <Ionicons
                  name="ios-exit-outline"
                  size={24}
                  color="#BDBDBD"
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Tab.Screen
          name="Create Post"
          component={CreatePostsScreen}
          options={{
            headerTitleAlign: "center",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="add"
                size={28}
                style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
              />
            ),
            headerLeft: () => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color="#212121"
                  style={{ marginLeft: 16 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitleAlign: "center",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-outline"
                size={28}
                style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  //логіка логауту
                }}
              >
                <Ionicons
                  name="ios-exit-outline"
                  size={24}
                  color="#BDBDBD"
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  tabBarIcon: {
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: "#212121",
  },
  tabBarIconFocused: {
    backgroundColor: "#FF6C00",
    borderRadius: 25,
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 24,
    paddingRight: 24,
    color: "#FFFFFF",
  },
});

export default Home;
