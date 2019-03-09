import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Item, Row, Content, Form, Input, Picker } from "native-base";
import { RkTextInput } from "react-native-ui-kitten";
import { Ionicons, Entypo } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default class MapSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  
  }
  getInnerRef = () => this.ref;



  render() {
    console.log(this.state);
    const { width, height } = Dimensions.get("window");
    return (
     
    );
  }
}
