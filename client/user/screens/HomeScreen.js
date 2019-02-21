import React from "react";
import Book from "../components/bookingForm";
import Map from "../components/Map";
import { View, HeaderBarItem, StatusBar, AsyncStorage, Dimensions, navi, TouchableOpacity } from "react-native";
import { Container, Text,Button, Content, Input, Item } from "native-base";
import MapSearch from "../components/mapSearch";
import io from 'socket.io-client';
console.ignoredYellowBox = ['Remote debugger'];
const localip = '192.168.43.199'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
const {screenHeight, screenWidth} = Dimensions.get('window')
const LATITUDE = 12.9778894;
const LONGITUDE = 77.644986;
export default class HomeScreen extends React.Component {
  constructor(){
    super();
    this.activeSocket = false;
    this.state= {
      currentLocation: null
    }
  }
  async continueSumbit({latitude, longitude}){
    const data={
      date: new Date().getTime(),
      startLocation: {lat:latitude, long:longitude}
    }
    console.log("Continueing with data", data)
    let token = await AsyncStorage.getItem("jwt");
    try {
      let response = await fetch(
        `http://${localip}:3000/user/book`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`
          },
          body: JSON.stringify(data)
        }
      );
      let responseJson = await response.json();
      console.log(responseJson.message)
      return responseJson.message;
    } catch (error) {
      console.error(error);
    }
  }

  async getLocationHandler(){
    await navigator.geolocation.getCurrentPosition(pos=>{
      this.continueSumbit(pos.coords)
      // this.setState({...this.state,currentLocation:pos.coords})
    });
  }
  async handleConfirmRide(){
    console.log("trying to book")
    // const {latitude, longitude} = this.getLocationHandler();
    await this.getLocationHandler()
    // return console.log(this.state.currentLocation);
    
  }

  async sendUserId(){
    let token = await AsyncStorage.getItem("jwt");
    fetch(`http://${localip}:3000/user/getuser`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    })
      .then(res => console.log("ok"))
      .catch(() => alert("Cannot send ID"))
  }

  async updateSocketId(socketId){
    let token = await AsyncStorage.getItem("jwt");
    try {
      let response = await fetch(
        `http://${localip}:3000/user/updateSocket`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`
          },
          body: JSON.stringify({userSocketId: socketId})
        }
      );
      let responseJson = await response.json();
      console.log(responseJson.message)
      return responseJson.message;
    } catch (error) {
      console.error(error);
    }
  }

  connectSocket(){
    this.socket = io(`http://${localip}:3000`);
    this.socket.on('connect',()=>{
      this.activeSocket=true;
      console.log("Connected with id: "+this.socket.id+" sending to server");
      this.socket.emit('client',"Hi from clint");
      this.updateSocketId(this.socket.id);
      // this.socket.on('track-driver',(location)=>{
      //   console.log('track-driver',location);
      // })
      this.socket.emit('new-socket',this.socket.id);
    })
    this.socket.on('disconnect', function(){
      this.activeSocket = false;
      console.log('user disconnected');
    });
  }

  render() {
    console.log("Socket is "+this.activeSocket)
    if(!this.activeSocket || true) {
      
    this.sendUserId();
    this.connectSocket();
      console.log("Trying to reconnect")
    }
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <StatusBar backgroundColor="red" />
        
        <Map socket={this.socket} />
        <View style={{position: 'absolute', top: '85%',width: 350,backgroundColor: '#f7b733',zIndex: 4, elevation: 3}}>
          <TouchableOpacity style={{padding:15, alignItems: 'center'}} onPress={this.handleConfirmRide.bind(this)}>
            <Text style={{color: 'white'}}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
        <MapSearch />
      </View>
    );
  }
}
