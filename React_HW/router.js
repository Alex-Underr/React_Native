import Login from "./Screens/LoginScreen";
import Registration from "./Screens/RegistrationScreen";
import Home from "./Screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
const MainStack = createStackNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={Registration}
        />

        <MainStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
      </MainStack.Navigator>
    );
  }

  return <Home />;
};
const router = useRoute(true);
export default router;
