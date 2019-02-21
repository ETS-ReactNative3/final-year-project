import React from "react";
import {
  ScrollView,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {
  Label,
  Icon,
  Item,
  Input,
  Content,
  Textarea,
  Button,
  Card,
  CardItem,
  List,
  ListItem,
  Body,
  Thumbnail
} from "native-base";

import { Ionicons, Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: "",
        address: "",
        phoneNo: ""
      }
    };
    this.onValueChangeName = this.onValueChangeName.bind(this);
    this.onValueChangeAddress = this.onValueChangeAddress.bind(this);
    this.onValueChangeNumber = this.onValueChangeNumber.bind(this);

    this._handleAdd = this._handleNext.bind(this);
  }

  onClickNext() {
    this.props.navigation.navigate("Home");
  }

  onValueChangeName(e) {
    let state = { ...this.state };
    state.value.name = e;
    this.setState({ state });
  }

  onValueChangeAddress(e) {
    let state = { ...this.state };
    state.value.address = e;
    this.setState({ state });
  }

  onValueChangeNumber(e) {
    let state = { ...this.state };
    state.value.phoneNo = e;
    this.setState({ state });
  }

  _handleNext = async value => {
    let token = await AsyncStorage.getItem("jwt");
    const data = {
      name: this.state.value.name,
      address: this.state.value.address,
      phoneNo: this.state.value.phoneNo
    };
    console.log(data);
    const json = JSON.stringify(data);
    fetch("https://agrigo.herokuapp.com/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${token}`
      },
      body: json
    })
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(res.message);
          // Redirect to home screen
          this.props.navigation.navigate("Home");
        }
      })
      .catch(() => {
        alert("There was an error logging in.");
      })
      .done();
  };

  render() {
    return (
      <View style={[styles.container]}>
        <View
          style={{
            height: 55,
            backgroundColor: "#f1f1f1",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 10,
            elevation: 5
          }}
        >
          <AntDesign size={25} style={styles.iconStyle} name="left" />
          <Text>Traking</Text>
          <FontAwesome
            size={25}
            style={styles.iconStyle}
            name="location-arrow"
          />
        </View>
        <View style={{ padding: 30, alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>Yout Package ID: 4124</Text>
        </View>
        <View>
          <View />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    margin: 20,
    backgroundColor: "#fff"
  },
  inputStyles: {
    fontFamily: "monserrat-m",
    margin: 5
  },
  iconStyle: {
    paddingHorizontal: 20
  }
});
