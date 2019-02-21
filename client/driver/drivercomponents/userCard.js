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

export default class UserCard extends React.Component {
  render(){
      return(
        <View style={{elevation:5,margin:5, borderRadius: 10, height:100}}>
        <View style={{flex:1,flexDirection:'row'}} > 
          <View style={{flex:2,justifyContent:'center',alignItems:'center'}} >
          <Thumbnail
       large 
        size={50}
        source={{
          uri:
            "https://vignette.wikia.nocookie.net/inclusive-marvel/images/b/b8/Tony-Stark-1.jpg/revision/latest?cb=20140820031842"
        }}
      />
          </View>
          <View style={{flex:4}} >
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
            <Text style={{textAlign:'center'}}>Mr. Stark</Text>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={{width:200,backgroundColor:'#f7b733',padding: 8, elevation: 5}} ><Text style={{textAlign:'center'}}>End Trip</Text></TouchableOpacity>
          </View>
          </View>
        </View>
      </View>
      );
  }
}