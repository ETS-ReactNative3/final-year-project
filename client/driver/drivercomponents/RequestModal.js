import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Item, Row, Content, Form } from "native-base";
import { RkTextInput } from "react-native-ui-kitten";
import { Ionicons, Entypo } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "react-native-elements";

let interval;

export default class RequestModal extends Component {
  state = {
    sec:10
  }
  processRequest(action){
    console.log("calling onResponse from process req with "+action)
    this.props.onResponse(action)
  }
  
  componentDidMount(){
    interval = setInterval(()=>{
      if(this.state.sec>0){
        this.setState({sec: --this.state.sec })
      } else {
        this.processRequest(false)
        clearInterval(interval);
        return //5c67df55325a3a1a874f76d
      }
    },1000)
  }

  componentWillUnmount(){
    clearInterval(interval);
  }

  render() {
    // if(this.state.sec==0){
    //   this.processRequest(false);
    // }
    const { width, height } = Dimensions.get("window");
    return (
      <View style={{
        backgroundColor: "#fff",
        width: width - 40,
        height: 140,
        borderRadius: 10,
        margin: 20,
        marginTop: 55,
        position: "absolute",
        zIndex: 5,
        elevation: 5
      }}>
        <Text style={{width:'100%', paddingVertical:10, fontSize: 18, textAlign: 'center', fontWeight:"800", marginVertical: 7}}>
          New ride request
        </Text>
        <View style={{width:'100%', justifyContent: 'space-evenly', flex:1, flexDirection: 'row', position:'relative'}}>
          <TouchableOpacity style={{...styles.resBtn, backgroundColor:'green'}}  onPress={()=>{
              console.log("accept pressed")
              this.processRequest(true)
            }}>
            <Text style={styles.textStyle}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.resBtn, backgroundColor: 'red'}} onPress={()=>{
            console.log("declined pressed")
            this.processRequest(false)
          }}>
            <Text style={styles.textStyle}>Decline</Text>
          </TouchableOpacity>
        </View>
        <View style={{width:'100%'}}><Text style={{...styles.textStyle,color:'black', textAlign:'center',padding: 15}}>Auto decline in: {this.state.sec} sec</Text></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  resBtn:{
    flex: 1,
    marginHorizontal: 20,
    // padding: 5,
    height:40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    zIndex: 10
  },
  textStyle: {
    color:'white',
    fontWeight: "700"
  }
})
