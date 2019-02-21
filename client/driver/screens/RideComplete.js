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
import UserCard from '../drivercomponents/userCard'
import PackCard from '../drivercomponents/PackCard'
import { Ionicons, Entypo } from "@expo/vector-icons";

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
          style={{
            flex: 3,
            borderBottomWidth: 2,
            borderBottomColor: "#D3D3D3",
            marginVertical: 20,
            paddingHorizontal: 20,
            paddingBottom: 15
          }}
        >
            <View style={{marginBottom: 20 }}>
              <Text style={{fontSize:24, width: '100%', textAlign: 'center'}}>Rides</Text>
            </View>
          <ScrollView style={{flex:1}} >
            <UserCard /><UserCard/><UserCard/>
          </ScrollView>
        </View>

        <View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize:24}}>Packages</Text>
            </View>
          <ScrollView horizontal={true} style={{flex:1}} >
            <PackCard /><PackCard /><PackCard /><PackCard />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    marginHorizontal: 10,
    backgroundColor: "#fff"
  },
  inputStyles: {
    fontFamily: "monserrat-m",
    margin: 3
  },
  cardStyle:{elevation:5,flex:1,margin:5, borderRadius: 10}
});
