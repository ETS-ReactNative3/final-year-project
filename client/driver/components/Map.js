import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import haversine from "haversine";

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
      },locationChosen:false
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
    
    // this.getLocationHandler();
    const data = {latitude:LATITUDE, longitude: LONGITUDE};
    this.props.socket.emit('location', data)
    const { coordinate } = this.state;
    this.marker = coordinate;
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { coordinate, routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
            coordinate.timing(newCoordinate).start();
            console.log("updating")
            this.props.socket.emit('location', newCoordinate)          
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
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
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        >
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
          <Marker.Animated 
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate} />
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