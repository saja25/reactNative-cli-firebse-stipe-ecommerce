import React from "react";
import { View, Text } from "react-native";
import FirebaseUtil from "../../utils/FirebaseUtil";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "_screens/HomeScreen";
import CheckoutScreen from "_screens/CheckoutScreen/Index";
import Button from "_components/Button/Index";
import { baseStyles } from "_styles/Index";
import ProfileScreen from "../../screens/ProfileScreen/Index";
interface MainStackProps {}
const Tabs = createBottomTabNavigator();
// const ProfileScreen = () => {
//   return (
//     <View style={baseStyles.containerJustify}>
//       <Text style={baseStyles.headerLg}>hii this is the profile screen</Text>
//       <Button title="SIGN OUT" onPress={FirebaseUtil.signOut} />
//     </View>
//   );
// };
const TabIcon = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = "home-outline";
    if (route.name == "Home") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name == "Checkout") {
      iconName = focused ? "cart" : "cart-outline";
    } else {
      iconName = focused ? "person" : "person-outline";
    }
    return <Ionicons color={color} size={24} name={iconName} />;
  },
});
export default function Index(props: MainStackProps) {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={TabIcon}
      tabBarOptions={{
        activeTintColor: "#FFDB47",
        inactiveTintColor: "black",
        showLabel: false,
        style: baseStyles.tabBar,
      }}
    >
      <Tabs.Screen component={ProfileScreen} name="Profile" />
      <Tabs.Screen component={HomeScreen} name="Home" />
      <Tabs.Screen component={CheckoutScreen} name="Checkout" />
    </Tabs.Navigator>
  );
}
