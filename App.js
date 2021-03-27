import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

import LoadingService from './app/services/LoadingService';
import HomeScreen from './app/screens/HomeScreen';


export default class App extends React.Component {
  state = {
    loaded: false
  }

  constructor() {
    super();
    LoadingService.load( v => this.setState({loaded: true}));
  }

  render(){

    return (

        this.state.loaded ?
        <HomeScreen />
        :
        <View style={styles.overlay}>
          <View style={styles.contenedor}>
                <Image
                  style={{width:250,height:250}}
                  source={require('./assets/logo.png')}
                />
          </View>
          <View style={styles.loading}>
              <ActivityIndicator size="large" color="#ffffff" style={{marginTop:100}} />  
          </View>
          <View style={styles.loading}>
          <Text style={styles.white}>weather accurate</Text> 
          </View>
        </View>        
  
    );
  }
}

const styles = StyleSheet.create({
  
  overlay:{
    backgroundColor:"#eb6e4b",
    height:"100%",
    width:"100%",
  },
  contenedor: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems:'center',
    justifyContent:'center',
    marginTop: 160,
  },
  loading: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems:'center',
    justifyContent:'center',
  },
  white:{
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 170,
    textTransform: 'uppercase',
  },
  
});

