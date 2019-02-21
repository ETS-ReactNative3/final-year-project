import React, { Component } from "react";
import { View, Text, TextInput, Dimensions } from "react-native";
import { Item, Row, Content, Form } from "native-base";
import { RkTextInput } from "react-native-ui-kitten";
import { Ionicons, Entypo } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default class MapSearch extends Component {
  state = { inputFocus: 0 };
  getInnerRef = () => this.ref;
  render() {
    const { width, height } = Dimensions.get("window");
    return (
      <View
        style={{
          backgroundColor: "#fff",
          width: width - 40,
          height: 120,
          borderRadius: 10,
          margin: 20,
          marginTop: 55,
          position: "absolute",
          zIndex: 1,
          elevation: 15
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-evenly",
              alignItems: "center",
              marginVertical: 15
            }}
          >
            <Ionicons color="#ffa700" size={24} name="md-navigate" />
            <View
              style={{ flex: 1, justifyContent: "space-around", margin: 5 }}
            >
              <View
                style={{
                  borderColor: "grey",
                  borderRadius: 10,
                  borderWidth: 2
                }}
              />
              <View
                style={{
                  borderColor: "grey",
                  borderRadius: 10,
                  borderWidth: 2
                }}
              />
              <View
                style={{
                  borderColor: "grey",
                  borderRadius: 10,
                  borderWidth: 2
                }}
              />
            </View>
            <Entypo color="#ffa700" size={24} name="location-pin" />
          </View>
          <View style={{ flex: 7 }}>
            <Item
              style={{
                flex: this.state.inputFocus == 1 ? 5 : 4
              }}
            >
              <TextInput
                placeholder="Your Location"
                keyboardAppearance="dark"
                keyboardType="default"
                onFocus={() => {
                  this.setState({ inputFocus: 1 });
                }}
              />
            </Item>
            <Item
              style={{
                flex: this.state.inputFocus == 1 ? 4 : 5
              }}
            >
              <TextInput
                placeholder="Enter Destination"
                onFocus={() => {
                  this.setState({ inputFocus: 2 });
                }}
                {...this.props}
                ref={r => (this.ref = r)}
              />
            </Item>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <MaterialIcons color="#ffa700" size={27} name="swap-vert" />
          </View>
        </View>
      </View>
    );
  }
}
