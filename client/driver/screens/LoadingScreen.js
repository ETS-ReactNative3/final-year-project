import React from 'react';
import { ScrollView,AsyncStorage, StyleSheet,Text ,View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LoadingScreen extends React.Component {
 
  constructor(){
    super();
    this.loadApp()
  }
  
  
  static navigationOptions = {
    title: 'Links',
  };

  loadApp = async()=>{
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken?'App':'Auth');
  }
  render() {
    return (
      <View style={styles.container} >
<Text>Loader</Text>
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
