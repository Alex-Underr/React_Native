import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/Home";
import MapScreen from "./Screens/MapScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import { selectUser } from "./redux/authorise/authSelectors";
const Stack = createStackNavigator();

const initialHeaderTitleStyle = {
  fontFamily: "Roboto-Medium",
  fontSize: 17,
  color: "#212121",
};

export default function useRoute(isAuth) {
  const { userId } = useSelector(selectUser);
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
