import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import LoadingScreen from "_screens/LoadingScreen";
import UseCart from "./UseCart";
import CartCard from "_components/CartCard/Index";
import UsePayment from "./UsePayment";
interface Props {}

const Index = (props: Props) => {
  const { List, setList, Price, CartLoading } = UseCart();
  const { opernPaymentPage, cartDisabled } = UsePayment(setList);
  const ListFooter = () => {
    return (
      <View>
        <View>
          <Text>Total : </Text>
          <Text>{Price}</Text>
        </View>
        <Button title="CHECK OUT" onPress={opernPaymentPage} />
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
      />
    );
  }

  // return (
  //   <View>
  //     <Text>hello</Text>
  //   </View>
  // );
};

export default Index;
