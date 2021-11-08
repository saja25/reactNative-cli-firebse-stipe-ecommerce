import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import LoadingScreen from "_screens/LoadingScreen";
import UseCart from "./UseCart";
import CartCard from "_components/CartCard/Index";
import UsePayment from "./UsePayment";
import Styles from "./Styles";
import { baseStyles, colors } from "_styles/Index";
import Button from "_components/Button/Index";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LoginContext } from "_utils/LoginProvider";
import { DELETE_CART, Post } from "_utils/BackendUtil";
interface Props {}

const Index = (props: Props) => {
  const [Delete, setDelete] = useState(false);
  const { user } = useContext(LoginContext);

  const { List, setList, Price, CartLoading } = UseCart();
  const { opernPaymentPage, cartDisabled } = UsePayment(setList);
  // here the delete cart i built
  const deleteCart = async () => {
    if (!user) return;
    try {
      let response = await Post(user, DELETE_CART);
      const { cartDeleted } = await response.json();
      if (cartDeleted === "Success") {
        setList([]);
      }
      console.log("delete it girllll", cartDeleted);
    } catch (e) {
      console.log("from usepayment", e);
      Alert.alert("payment failed!! sososos from usepayment"); // here u got the error
    }
  };
  ///////
  useEffect(() => {
    if (Delete) {
      console.log("delete it girllll");
      deleteCart();
      // setDelete(false);
    }
  }, [Delete]);
  const ListFooter = () => {
    return (
      <View>
        <View style={baseStyles.line} />
        <View style={Styles.statment}>
          <Text style={baseStyles.headerMd}>Total : </Text>
          <Text style={baseStyles.headerMd}>{Price} $</Text>
        </View>
        <View style={baseStyles.line} />
        <Button
          title="CHECK OUT"
          onPress={opernPaymentPage}
          isLoading={cartDisabled}
        />
        <View>
          <Button
            title="DELETE CART"
            onPress={() => setDelete(true)}
            // isLoading={cartDisabled}
            background={colors.gray}
            style={{ marginTop: 10 }}
          />
        </View>
      </View>
    );
  };
  if (!CartLoading && List.length <= 0) {
    return <View></View>;
  } else if (CartLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <FlatList
        data={List}
        renderItem={CartCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListFooterComponent={ListFooter}
        style={baseStyles.container}
      />
    );
  }
};

export default Index;
