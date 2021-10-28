import { API_URL } from "ApiConfig";
import { Alert } from "react-native";
export const FetchPublishableKey = async () => {
  try {
    const response = await fetch(`${API_URL}/config`);
    const { publishableKey } = await response.json();
    return publishableKey;
  } catch (error) {
    console.log("error from fetch helper ", error);
    Alert.alert("error fetching publishable key!!");
  }
};
