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
      <View style={styles.container}>
        {/* <Button onPress={()=>{this.props.navigation.navigate("AuthLoader");AsyncStorage.clear();}} title="logout" /> */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Thumbnail
            style={{ width: 120, height: 120, borderRadius: 100 }}
            size={50}
            source={{
              uri:
                "https://vignette.wikia.nocookie.net/inclusive-marvel/images/b/b8/Tony-Stark-1.jpg/revision/latest?cb=20140820031842"
            }}
          />
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 25 }}>Stark</Text>
          </View>
          <View>
            <View
              style={{
                height: 7,
                borderRadius: 20,
                marginTop: 15,
                width: Dimensions.get("window").width - 60,
                backgroundColor: "#ffa700"
              }}
            />
            <Text style={{ textAlign: "right" }}>10%</Text>
          </View>
        </View>
        <ScrollView style={{ flex: 2 }}>
          <View style={{ flex: 1 }}>
            <Card>
              <List>
                <ListItem>
                  <Text>Simon Mignolet</Text>
                </ListItem>
                <ListItem>
                  <Text>Nathaniel Clyne</Text>
                </ListItem>
                <ListItem>
                  <Text>Dejan Lovren</Text>
                </ListItem>
                <ListItem>
                  <Text>Simon Mignolet</Text>
                </ListItem>
                <ListItem>
                  <Text>Nathaniel Clyne</Text>
                </ListItem>
                <ListItem>
                  <Text>Dejan Lovren</Text>
                </ListItem>
                <ListItem>
                  <Text>Simon Mignolet</Text>
                </ListItem>
                <ListItem>
                  <Text>Nathaniel Clyne</Text>
                </ListItem>
                <ListItem>
                  <Text>Dejan Lovren</Text>
                </ListItem>
                <ListItem>
                  <Text>Simon Mignolet</Text>
                </ListItem>
                <ListItem>
                  <Text>Nathaniel Clyne</Text>
                </ListItem>
                <ListItem>
                  <Text>Dejan Lovren</Text>
                </ListItem>
              </List>
            </Card>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: "#ffa700",
            height: 40,
            elevation: 3,
            marginVertical: 20,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
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
