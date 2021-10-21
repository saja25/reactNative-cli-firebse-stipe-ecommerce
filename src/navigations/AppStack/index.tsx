import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import LoadingScreen from "_screens/LoadingScreen";
import LoginScreen from "_screens/LoginScreen";
import ProductScreen from "_screens/ProductScreen/ProductScreen";
import { LoginContext } from "_utils/LoginProvider";
import MainStack from "../MainStack/Index";
const Stack = createStackNavigator();
export default function AppStack() {
  const { user, isLoading } = useContext(LoginContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="loading"
            options={{ headerShown: false }}
            component={LoadingScreen}
          />
        ) : user ? (
          <>
            <Stack.Screen
              name="Shoppers"
              component={MainStack}
              options={{
                title: "SHOPPERS",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="Product"
              component={ProductScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="signin"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
