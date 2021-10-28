import { useStripe } from "@stripe/stripe-react-native";
import React, { useContext, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Cart } from "src/interface";
import { CHECKOUT_GET_PAYMENT_INTENT, Post } from "_utils/BackendUtil";
import { LoginContext } from "_utils/LoginProvider";

/// this opens the stripe account page and let the user pay through it
export default function UsePayment(setList: (a: Cart[]) => void) {
  const { user } = useContext(LoginContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [cartDisabled, setcartDisabled] = useState(false);
  const getPaymentIntent = async () => {
    if (!user) return;
    try {
      let response = await Post(user, CHECKOUT_GET_PAYMENT_INTENT);
      const { paymentIntent, customer, ephemeralKey } = await response.json();
      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
      });
      if (error) {
        Alert.alert("stripe error");
        console.log(error);
      }
      return paymentIntent;
    } catch (e) {
      console.log("from usepayment", e);
      Alert.alert("payment failed!! sososos from usepayment"); // here u got the error
    }
  };
  const opernPaymentPage = async () => {
    setcartDisabled(true);
    const paymenrIntent = await getPaymentIntent();
    setTimeout(async () => {
      const { error } = await presentPaymentSheet({
        clientSecret: paymenrIntent,
      });
      if (error) {
        Alert.alert("Error code : " + error.code);
      } else {
        Alert.alert("payment success , your order is confirmed");
        setList([]);
      }
      setcartDisabled(false);
    }, 1000);
  };
  return { opernPaymentPage, cartDisabled };
}
