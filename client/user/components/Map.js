import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image
} from "react-native";
import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import haversine from "haversine";
import MapViewDirections from 'react-native-maps-directions';

const LATITUDE = 12.9778894;
const LONGITUDE = 77.644986;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

class AnimatedMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude : LATITUDE,
      longitude : LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE
      }),
      focusedLocation:{
        latitude:LATITUDE,
        longitude:LONGITUDE,
        latitudeDelta:0.0122,
        longitudeDelta:Dimensions.get("window").width/Dimensions.get("window").height*0.0122
      },locationChosen:false,
      temp: null
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {},
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  updateDriverLocation(){
    const {coordinate} = this.state;
    let coords = {latitude:this.state.latitude,longitude:this.state.longitude};
    this.props.socket.on('track-driver',(data)=>{
      console.log("reciverd new location", data);    
      coords = data;
      if (Platform.OS === "android") {
        if (this.marker) {
          coordinate.timing(coords).start();
          console.log("updating locationn")
          this.props.socket.emit('location', coords)          
        }
      } else {
        coordinate.timing(data).start();
      }
    })
  }
  
  pickLocation = event =>{
    const coords = event.nativeEvent.coordinate;
    const {latitude,longitude} = coords;
    this.map.animateToRegion({
      ...this.state.focusedLocation,latitude:latitude,longitude:longitude
    })
    this.setState(state=>{return{ focusedLocation:{...state.focusedLocation,latitude:latitude,longitude:longitude},locationChosen:true }})

  }

  getLocationHandler = (event) =>{
    navigator.geolocation.getCurrentPosition(pos=>{
      const coords={
        nativeEvent:{
          coordinate:{latitude:pos.coords.latitude,longitude:pos.coords.longitude}
        }
      }

      this.pickLocation(coords);
    })
  }

  componentDidMount() {
    const { coordinate } = this.state;
    this.props.socket.on('track-driver',
      (position) => {
        const { coordinate, routeCoordinates, distanceTravelled } = this.state;
        if(position || true) {
          const { latitude, longitude } = position;

          const newCoordinate = {
            latitude,
            longitude
          };
          this.setState({...this.state,temp:newCoordinate})
          // return console.log(newCoordinate);
          if (this.marker) {
            // this.marker._component.animateMarkerToCoordinate(
            //   newCoordinate,
            //   500
            // );
            // IMPORTANT : THis is a legasy code, do not change it
            coordinate.timing(newCoordinate).start(); //Daiva methord
          }

          this.setState({
            latitude,
            longitude,
            routeCoordinates: routeCoordinates.concat([newCoordinate]),
            distanceTravelled:
              distanceTravelled + this.calcDistance(newCoordinate),
            prevLatLng: newCoordinate
          }); 
        } else {
          console.log('position is null: ',position)
        }
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  
  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchID);
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  render() {
    let marker=null;
    if(this.state.locationChosen){
      marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
    }
    const origin = {
      latitude: LATITUDE,
      longitude: LONGITUDE
    }
    const destination = {
      latitude: 13.012766,
      longitude: 77.699448
    }
    const GMapsApiKey = 'AIzaSyB1Q7pVw6rESQCcwqmlEp9mANh5NCDQBwE';
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}>
          <MapViewDirections origin={origin} destination={destination} apikey={GMapsApiKey} strokeWidth={5} strokeColor={'#f7b733'} />
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
          <Marker.Animated 
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate} >
              
            </Marker.Animated>
          {/* <Marker ref={marker=>{
            this.userMarker = marker;
          }} /> */}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

export default AnimatedMarkers;