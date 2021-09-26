import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppStack from "_navigations/AppStack";
import LoginProvider from "_utils/LoginProvider";
import api_key from "./src/assets/files/stripe.json";
export default function App() {
  return (
    <View style={styles.container}>
      <StripeProvider publishableKey={api_key.publishKey}>
        <LoginProvider>
          <AppStack />
        </LoginProvider>
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
