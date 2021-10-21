import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import FirebaseUtil from "_utils/FirebaseUtil";

export default function UseAccount() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const singInOrUp = async (singIn: boolean) => {
    setLoading(true);
    try {
      if (singIn) {
        await FirebaseUtil.signIn(Email, Password);
      } else {
        await FirebaseUtil.signUp(Email, Password);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("something went wrong , pleas try again");
    }
    setLoading(false);
  };
  return { singInOrUp, Email, setEmail, Password, setPassword, Loading };
}
