/** Not needed */


import React from "react";
import { ScrollView, AsyncStorage, StyleSheet, Text, View } from "react-native";
import { Label, Icon, Item, Textarea, Button, Input, Form } from "native-base";

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: "",
        password: ""
      }
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onValueChangePassword = this.onValueChangePassword.bind(this);
    this._handleAdd = this._handleAdd.bind(this);
  }

  onValueChange(e) {
    // let acre = e.toString();
    let state = { ...this.state };
    state.value.username = e;
    this.setState({ state });
  }

  onValueChangePassword(e) {
    let state = { ...this.state };
    state.value.password = e;
    this.setState({ state });
  }

  _handleAdd = value => {
    // const value = this.refs.form.getValue();
    // If the form is valid...
    console.log('trying to register')
    const data = {
      username: this.state.value.username,
      password: this.state.value.password
    };
    console.log(data);
    // Serialize and post the data
    const json = JSON.stringify(data);
    fetch("https://agrigo.herokuapp.com/api/driver/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    })
      .then(response => response.json())
      .then(() => {
        alert("Success! You may now log in.");
        // Redirect to home screen
        // this.props.navigation.navigate("Profile");
      })
      .catch(error => {
        console.log(error);
      })
      .done();
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Button onPress={()=>{this.props.navigation.navigate("AuthLoader");AsyncStorage.clear();}} title="logout" /> */}

        <View style={{ flex: 4 }}>
          <View>
            <Label style={styles.inputStyles}>Enter UserName</Label>
            <Item style={{ margin: 10 }} regular>
              <Input
                onChangeText={this.onValueChange.bind(this)}
                placeholder="Name"
              />
            </Item>
          </View>

          <View>
            <Label style={styles.inputStyles}>Enter Password</Label>
            <Item style={{ margin: 10 }} regular>
              <Input
                onChangeText={this.onValueChangePassword.bind(this)}
                placeholder="Phone No"
                keyboardType="number-pad"
              />
            </Item>
          </View>
        </View>
        <View style={{ marginTop: 50, flex: 1 }}>
          <Text style={{ color: "black" }}>{this.state.value.username}</Text>
          <Text>{this.state.value.password}</Text>
        </View>
        <View style={{ marginTop: 50, flex: 1 }}>
          <Button
            onPress={this._handleAdd.bind(this)}
            style={{ alignSelf: "flex-end", paddingHorizontal: 30 }}
          >
            <Text style={{ color: "white" }}>Sign Up</Text>
          </Button>
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
  }
});
