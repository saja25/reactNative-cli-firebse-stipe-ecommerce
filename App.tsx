import { StripeProvider } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppStack from "_navigations/AppStack";
import LoginProvider from "_utils/LoginProvider";
import { FetchPublishableKey } from "_utils/FetchKeyHelper";

import api_key from "./src/assets/files/stripe.json";
import { API_URL } from "ApiConfig";

export default function App() {
  // const [publishableKey, setpublishableKey] = useState("");
  // useEffect(() => {
  //   async function getPublishableKey() {
  //     const publishableKey = await FetchPublishableKey();
  //     if (publishableKey) {
  //       setpublishableKey(publishableKey);
  //     }
  //   }
  // }, []);
  return (
    <StripeProvider publishableKey={api_key.publishKey}>
      <View style={styles.container}>
        <LoginProvider>
          <AppStack />
        </LoginProvider>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
