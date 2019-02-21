import React, { Component } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import {
  View,
  Text,
  Picker,
  Item,
  Input,
  Label,
  DatePicker,
  Button,
  Toast
} from "native-base";
import { Font } from "expo";
import axios from "axios";

export default class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = { machineryName: "Select", date: new Date(), Acre: "" };
    this.setDate = this.setDate.bind(this);
    this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
    // this.changeAcre = this.changeAcre.bind(this);
  }
  onValueMachinery(value) {
    this.setState({
      machineryName: value
    });
  }

  setDate(newDate) {
    this.setState({ date: newDate });
  }

  changeAcre(e) {
    // let acre = e.toString();
    this.setState({ Acre: e.nativeEvent.text });
    console.log(e.nativeEvent.text);
  }

  async handleSubmitRequest() {
    // const req = await axios.post(
    //   "https://agrigo.herokuapp.com/api/book",
    //   this.state
    // );
    let { machineryName, date, Acre } = this.state;
    let token = await AsyncStorage.getItem("jwt");
    console.log(token);
    let req = await fetch("https://agrigo.herokuapp.com/user/book", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        machinery: machineryName,
        date: date,
        Acre: Acre
      })
    });

    let res = await req.json();
    if (res.error) {
      alert(res.error);
    } else {
      alert(res.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/**machinery selection */}
        <View style={styles.formItems}>
          <Label style={styles.font}>Select Machinery</Label>
          <Picker
            note
            mode="dropdown"
            style={{ width: 120 }}
            selectedValue={this.state.machineryName}
            onValueChange={this.onValueMachinery.bind(this)}
          >
            <Picker.Item label="Tractor" value="Tractor" />
            <Picker.Item label="Harvester" value="Harvester" />
            <Picker.Item label="Sower" value="Sower" />
            <Picker.Item label="Remover" value="Remover" />
          </Picker>
        </View>

        {/**date selection */}
        <View style={styles.formItems}>
          <Label style={styles.font}>Select Date</Label>
          <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            disabled={false}
          />
        </View>

        {/**acre selection */}
        <View>
          <Label style={styles.font}>Enter Acre</Label>
          <Item style={{ margin: 10 }} regular>
            <Input
              keyboardType="number-pad"
              onChange={this.changeAcre.bind(this)}
              placeholder="Acre in Number"
            />
          </Item>
        </View>

        {/**results display */}
        <View>
          <Text>{this.state.machineryName}</Text>
          <Text>{this.state.date.toDateString()}</Text>
          <Text>{this.state.Acre}</Text>
          <Text />
        </View>

        {/**submit selection */}
        <View>
          <Button onPress={this.handleSubmitRequest.bind(this)} block>
            <Text style={styles.font}>Book Request</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    fontFamily: "monserrat-m",
    backgroundColor: "#fff"
  },
  font: {
    fontFamily: "monserrat-m"
  },
  formItems: {
    margin: 5,
    fontFamily: "monserrat-m",
    backgroundColor: "#fff"
  }
});
