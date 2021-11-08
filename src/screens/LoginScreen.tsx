import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "_components/Button/Index";
import { baseStyles, colors } from "_styles/Index";
import FirebaseUtil from "_utils/FirebaseUtil";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // sign in or sign up
  const [create, setCreate] = useState(false);

  const signIn = () => {
    FirebaseUtil.signIn(email, password.toString()).catch((e) => {
      console.log(e);
      alert("Email or password is wrong");
    });
  };
  const signUp = () => {
    FirebaseUtil.signUp(email, password.toString()).catch((e) => {
      console.log("from login screen", e.message);
      Alert.alert(e.message);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        style={styles.textInput}
        secureTextEntry={true}
      />
      {create ? (
        <>
          <Button title="SIGN UP" onPress={() => signUp()} />
          <Text
            style={[baseStyles.headerSm, { margin: 10 }]}
            onPress={() => setCreate(false)}
          >
            ALREADY HAVE AN ACCOUNT ?
          </Text>
        </>
      ) : (
        <>
          <Button title="SIGN IN " onPress={() => signIn()} />
          <Text
            style={[baseStyles.headerSm, { margin: 10 }]}
            onPress={() => setCreate(true)}
          >
            CREATE NEW ACCOUNT
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  textInput: {
    borderWidth: 3,
    borderColor: colors.yellow,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 35,
    height: 55,
    width: "100%",
    marginHorizontal: 2,
  },
});
