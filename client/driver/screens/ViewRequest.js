import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Button,
  Left,
  Right
} from "native-base";

export default class ViewScreen extends Component {
  state = { driverData: [], isLoading: false };

  async fetchData() {
    let token = await AsyncStorage.getItem("jwt");
    console.log(token);
    let req = await fetch("https://agrigo.herokuapp.com/user/requests", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    });

    let res = await req.json();
    this.setState({ driverData: res, isLoading: false });
  }

  showDriverInfo(data) {
    return (
      <View>
        <CardItem button>
          <Text>Driver Name:{data.acceptedDriver.username}</Text>
        </CardItem>
        <CardItem button>
          <Text>Driver Address:</Text>
        </CardItem>
        <CardItem button>
          <Text>Driver Mobile No:</Text>
        </CardItem>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");
    const data = navigation.getParam("data", "null");

    return (
      <View style={{ flex: 1 }}>
        <Content>
          <Card>
            <CardItem button onPress={() => alert("This is Card Body")}>
              <Left>
                <Text>Machinery:{data.machineryName}</Text>
              </Left>
            </CardItem>
            <CardItem button onPress={() => alert("This is Card Body")}>
              <Text>Date:{new Date(data.date).toDateString()}</Text>
            </CardItem>
            <CardItem button onPress={() => alert("This is Card Body")}>
              <Text>Status:{data.decision ? "approved" : "pending"}</Text>
            </CardItem>

            {data.decision ? this.showDriverInfo(data) : null}

            <CardItem button onPress={() => alert("This is Card Body")}>
              <Button style={{ padding: 10 }}>
                <Text style={{ color: "white" }}>Complete Request</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </View>
    );
  }
}
