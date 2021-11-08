import { StyleSheet, Dimensions } from "react-native";

const Styles = StyleSheet.create({
  container: {},
  image: {
    height: 460,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 30,
    zIndex: 1,
  },
  rightButton: {
    position: "absolute",
    right: 35,
    top: 38,
    zIndex: 8,
  },
  Share: {
    marginBottom: 20,
  },
  title: {
    paddingVertical: 20,
  },
  description: {
    fontSize: 15,
    paddingBottom: 15,
    paddingTop: 15,
  },
  price: {
    fontSize: 20,
    paddingBottom: 30,
  },
});
export default Styles;
