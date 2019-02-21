import React from "react";
import {
  ScrollView,
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import {} from "native-base";

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate("SignIn")}
          title="Sign In"
        />
        <Button
          onPress={() => this.props.navigation.navigate("SignUp")}
          title="Sign Up"
        />
        <Text>WelcomeScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
