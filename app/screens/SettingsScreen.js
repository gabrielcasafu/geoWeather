import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

export default class SettingsScreen extends React.Component {

  render(){
    return(
      <ScrollView>
      <View style={styles.container}> 
        <View style={styles.titleContainer} >
          <Text style={styles.titleServices}>geoWeather</Text>
          <View style={styles.borderContainer}>
            <View style={styles.border} />
          </View>
        </View>
        <Image
          style={{width:250,height:250}}
          source={require('../../assets/about.png')}
        />
        <View style={styles.titleContainerDescription} >
          <Text style={styles.titleServicesDescription}>
              Version: 1.0.0.2342
          </Text>
          <Text style={styles.titleServicesDescription}>
          Desarrollado por Gabriel Casafu
          </Text>
          <Text style={styles.titleServicesDescription}>
          soporte@gabrielcasafu.com.ar
          </Text>
        </View>
        <View style={styles.titleContainerDescription} >
          <Text style={styles.titleServicesDescription}>
              Datos provistos por:
          </Text>
          <Text style={styles.titleServicesDescription}>
              OpenWeather.org
          </Text> 
        </View>
        
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#333333',
    height:"100%",
    width:"100%",
  },
  titleContainer: {
    marginTop: 10,
    marginBottom: 20,
    paddingTop:70,
  },
  titleServices: {
    fontSize: 18,
    marginBottom:5,
    color:"#fff",  
  },
  borderContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  border:{
    flex:1,
    borderBottomWidth: 1,
    borderBottomColor: '#eb6e4b',
  },

  titleContainerDescription:{
    marginTop: 30,
    marginBottom: 20,
    marginLeft:35,
    marginRight:30
  },
  titleServicesDescription: {
    fontSize: 15,
    marginBottom:5,
    color:"#fff", 
    textAlign:"center" 
  },
  
});