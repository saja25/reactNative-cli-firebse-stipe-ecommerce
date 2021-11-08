import React from "react";
import { View, Text } from "react-native";
import Grid from "_components/grid";
import Button from "_components/Button/Index";
import FirebaseUtil from "_utils/FirebaseUtil";
import { baseStyles } from "_styles/Index";
import UseFave from "./UseFavourite";
import LoadingScreen from "_screens/LoadingScreen";
export default function Index() {
  const { List, setList, FaveLoading } = UseFave();

  return (
    <View style={{ marginVertical: 10, marginBottom: 190 }}>
      {FaveLoading ? <LoadingScreen /> : <Grid products={List} />}

      <Button title="SIGN OUT" onPress={FirebaseUtil.signOut} />
    </View>
  );
}
