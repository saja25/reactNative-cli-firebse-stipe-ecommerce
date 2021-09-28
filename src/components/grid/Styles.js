import { StyleSheet, Dimensions } from "react-native";

const Styles = StyleSheet.create({
  flatList: {
    padding: 10,
    // margin: 15,
  },
  continer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
  },
  image: {
    height: 185,
    width: 175,
    resizeMode: "cover",
    // borderRadius: 10,
  },
  textBox: {
    padding: 10,
    width: 155,
  },
  title: {},
  price: {
    color: "gray",
  },
});
export default Styles;
