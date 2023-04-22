import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import Home from "./screens/Home";
import MapScreen from "./screens/MapScreen";
import CommentsScreen from "./screens/CommentsScreen";

const Stack = createStackNavigator();

const initialHeaderTitleStyle = {
  fontFamily: "Roboto-Medium",
  fontSize: 17,
  color: "#212121",
};

export default function useRoute(isAuth) {
  return (
    <Stack.Navigator>
      {isAuth ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={({ navigation }) => ({
              headerTitle: "Map",
              headerTitleStyle: initialHeaderTitleStyle,
              headerStyle: { borderBottomWidth: 1 },
              headerTitleAlign: "center",
              headerBackVisible: false,
            })}
          />
          <Stack.Screen
            name="CommentsScreen"
            component={CommentsScreen}
            options={({ navigation }) => ({
              headerTitle: "Comments",
              headerTitleStyle: initialHeaderTitleStyle,
              headerStyle: { borderBottomWidth: 1 },
              headerTitleAlign: "center",
              headerBackVisible: false,
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
