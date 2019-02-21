import React from "react";
import {
  ScrollView,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
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

export default class PackCard extends React.Component {
  render(){
      return(
        <View style={{elevation:5,margin:5, width: 220,borderRadius: 10, flex:1, marginBottom:35}}>
        <View style={{flex:1,flexDirection:'column'}} > 
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
            <Image style={{width: 50, height: 50}} source={{uri:"https://banner2.kisspng.com/20180612/lov/kisspng-relocation-computer-icons-price-dmnageur-package-icon-5b1ff07cc16602.7198072415288198367922.jpg"}} />
          </View>
          <View style={{flex:1}} >
            <View style={{flex:2,justifyContent:'center',alignItems:'center'}} >
                <Text style={{textAlign:'center'}}>Package ID: 4124</Text>
            </View>
          <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={{width:200,backgroundColor:'#f7b733',padding: 8, elevation: 2}} ><Text style={{textAlign:'center'}}>Delivered</Text></TouchableOpacity>
          </View>
          </View>
        </View>
      </View>
      );
  }
}