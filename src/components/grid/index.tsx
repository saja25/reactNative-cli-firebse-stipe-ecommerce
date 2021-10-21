import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Product } from "src/interface";
import Styles from "./Styles";
interface GridProps {
  products: Product[];
}
const Grid = (props: GridProps) => {
  const navigation = useNavigation();
  const renderItem: React.FC<{ item: Product; index: number }> = ({
    item,
    index,
  }) => {
    const handelPress = () => {
      navigation.navigate("Product", {
        product: item,
      });
    };
    return (
      <View style={Styles.continer}>
        <TouchableOpacity style={Styles.card} onPress={handelPress}>
          <Image source={{ uri: item.image }} style={Styles.image} />
          <View style={Styles.textBox}>
            <Text style={Styles.title}>{item.title}</Text>
            <Text style={Styles.price}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        style={Styles.flatList}
        data={props.products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />
    </SafeAreaView>
  );
};

export default Grid;
