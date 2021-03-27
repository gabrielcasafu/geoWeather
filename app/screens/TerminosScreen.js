import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class TerminosScreen extends React.Component {

  render(){
    return(
      <ScrollView>
      <View style={styles.container}> 
        <View style={styles.titleContainer} >
          <Text style={styles.titleServices}>Escala de la calidad del aire</Text>
          <View style={styles.borderContainer}>
            <View style={styles.border} />
          </View>
        </View>

        <View style={styles.detalle}>
          <View style={styles.elemento1}>
            <Text style={styles.imageContainer}>1</Text>
          </View>
          <View style={styles.elemento2}>
            <Text style={styles.titleCalidadAire}>Excelente</Text>
          </View>
        </View>   
        <View style={styles.titleContainerDescription} >
          <Text style={styles.titleServicesDescription}>La calidad del aire es ideal para la mayoría de los individuos; disfrute sus actividades normales al aire libre.</Text>
        </View>
        <View style={styles.detalle}>
          <View style={styles.elemento1}>
            <Text style={styles.imageContainer}>2</Text>
          </View>
          <View style={styles.elemento2}>
            <Text style={styles.titleCalidadAire}>Normal</Text>
          </View>
        </View>   
        <View style={styles.titleContainerDescription} >
          <Text style={styles.titleServicesDescription}>La calidad del aire es aceptable en general para la mayoría de los individuos. Sin embargo, los grupos sensibles pueden experimentar síntomas menores a moderados con una exposición a largo plazo.</Text>
        </View>
        <View style={styles.detalle}>
          <View style={styles.elemento1}>
            <Text style={styles.imageContainer}>3</Text>
          </View>
          <View style={styles.elemento2}>
            <Text style={styles.titleCalidadAire}>Deficiente</Text>
          </View>
        </View>   
        <View style={styles.titleContainerDescription} >
          <Text style={styles.titleServicesDescription}>El aire ha alcanzado un nivel alto de contaminación y no es saludable para los grupos sensibles. Reduzca el tiempo de permanencia afuera si tiene síntomas tales como dificultad para respirar o irritación de la garganta.</Text>
        </View>
        <View style={styles.detalle}>
          <View style={styles.elemento1}>
            <Text style={styles.imageContainer}>4</Text>
          </View>
          <View style={styles.elemento2}>
            <Text style={styles.titleCalidadAire}>Insalubre</Text>
          </View>
        </View>   
        <View style={styles.titleContainerDescription} >
          <Text style={styles.titleServicesDescription}>Los grupos sensibles pueden sentir los efectos en la salud inmediatamente. Los individuos saludables pueden experimentar dificultad para respirar e irritación de la garganta con una exposición prolongada. Limite las actividades al aire libre.</Text>
        </View>
        <View style={styles.detalle}>
          <View style={styles.elemento1}>
            <Text style={styles.imageContainer}>5</Text>
          </View>
          <View style={styles.elemento2}>
            <Text style={styles.titleCalidadAire}>Peligroso</Text>
          </View>
        </View>   
        <View style={styles.titleContainerDescription} >
          <Text style={styles.titleServicesDescription}>Cualquier exposición al aire, aun algunos minutos, puede tener serios efectos en la salud de todos. Evite las actividades al aire libre.</Text>
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

  detalle: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom:15
  },

  elemento1: {
    width: "50%",
    paddingLeft:50
  },
  elemento2: {
    width: "50%",
    paddingRight:50
  },
  titleLeft:{
    color:"#fff",
    margin:5,
    textTransform: 'uppercase',
    textAlign: "left"
  },
  titleRight:{
    color:"#fff",
    margin:5,
    textTransform: 'uppercase',
    textAlign: "right"
  },
  imageContainer: {
    height:40,
    width: 80,
    backgroundColor: '#eb6e4b',
    textAlign: 'center',
    textAlignVertical:'center'
  },
  titleCalidadAire: {
    height:40,
    textAlign: "right",
    textAlignVertical:'center',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  
});