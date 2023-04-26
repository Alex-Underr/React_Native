import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../redux/authorise/authOperations";

import useRoute from "../router";

export default function Main() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, []);

  const routing = useRoute(state.auth.userId);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
