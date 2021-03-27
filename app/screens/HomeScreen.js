import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';


import SettingsScreen from './SettingsScreen';
import TerminosScreen from './TerminosScreen';

import Icon from 'react-native-vector-icons/Ionicons'
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const Api_Key = "39bdd30d5ff4dcb293669437108f69cf";


class HomeScreen extends React.Component {

  constructor(props) {

    super(props);

      this.state= {
        location: null,
        geocode: null,
        weatherData: [],
        calidadAire: [],
        errorMessage: ""
      }

  }

  componentDidMount(){
    this.getLocationAsync()
  }

  //geolocalizacion
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permiso de acceso a la ubicación denegado.',
      });
    }

    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.BestForNavigation});
    const { latitude , longitude } = location.coords
    
    //obtengo latitud y longitud
    this.getGeocodeAsync({latitude, longitude})
    this.setState({ location: {latitude, longitude}});

    //api weather today
    //fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${Api_Key}&lang=es`)
    fetch(`https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${latitude}&lon=${longitude}&appid=${Api_Key}&lang=es`)
      .then(res => res.json())
      .then((result) => {
          this.setState({
            weatherData: result && result,
          });
        },
      )

    fetch(`http://api.openweathermap.org/data/2.5/air_pollution?units=metric&lat=${latitude}&lon=${longitude}&appid=${Api_Key}&lang=es`)
    .then(res => res.json())
    .then((result) => {
        this.setState({
          calidadAire: result && result,
        });
      },
    )

  };

  getGeocodeAsync= async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location)
    this.setState({ geocode})
  }

  format_time_title(s){
    let day = new Date(s * 1e3).getDate();
    let month = new Date(s * 1e3).getMonth() + 1;
    let year = new Date(s * 1e3).getFullYear();

    let data = day + "/" + month + "/" + year;
    let hora = new Date(s * 1e3).getHours();
    let minutes = new Date(s * 1e3).getMinutes();

    if (minutes < 10) {
      return data + " - " + hora + ":"+'0' + minutes;
    }

    return  data + " - " + hora + ":"+ minutes;
  }

  format_hourly(s){
    let hora = new Date(s * 1e3).getHours();
    let minutes = new Date(s * 1e2).getMinutes();
    if (minutes < 10) {
      return hora + ":"+'0' + minutes;
    }
    return  hora + ":"+ minutes;
  }

  format_day(s) {
    let day = new Date(s * 1e3).getDate();
    let month = new Date(s * 1e3).getMonth() + 1;
    let year = new Date(s * 1e3).getFullYear();

    let data = day + "/" + month + "/" + year;

    return  data;
  }
  

  format_day_title(s) {
    let day = new Date(s * 1e3).getDay();
    switch (day) {
      case 0:
        day="Domingo";
        break;
      case 1:
        day="Lunes";
        break;
      case 2:
        day="Martes";
        break;
      case 3:
        day="Miercoles";
        break;
      case 4:
        day="Jueves";
        break;
      case 5:
        day="Viernes";
        break;
      case 6:
        day="Sabado";
        break;
      default:
        break;
    };

    return  day;
  }

  render(){
    const { geocode, errorMessage, weatherData, calidadAire } = this.state

    return(
      weatherData.current ?
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.dateTitle}>{this.format_time_title(weatherData.current && weatherData.current.dt)}</Text>
          <Text style={styles.title}>{geocode  ? `${geocode[0].city}, ${geocode[0].isoCountryCode}` :""}</Text>
          <Image 
              style={{width:100,height:100}} 
              source={{
                  uri: `http://openweathermap.org/img/wn/${weatherData.current && weatherData.current.weather[0].icon}@2x.png`,
              }} 
            
          />
          <Text style={styles.description}>{weatherData.current && weatherData.current.weather[0].description}</Text>
          <Text style={styles.temp}>{weatherData.current && parseInt(weatherData.current.temp)}&deg;C</Text>
          
          <View style={styles.titleContainer}>
            <Text style={styles.titleServices}>Condiciones actuales</Text>
            <View style={styles.borderContainer}>
              <View style={styles.border} />
            </View>
          </View>

          <View style={styles.detalle}>

              <View style={styles.elemento1}>
                <Text style={styles.titleLeft}>Presión</Text>
              </View>
              <View style={styles.elemento2}>
                <Text style={styles.titleRight}>{weatherData.current && weatherData.current.pressure} hPa</Text>
              </View>
              <View style={styles.elemento1}>
                <Text style={styles.titleLeft}>Humedad</Text>
              </View>
              <View style={styles.elemento2}>
                <Text style={styles.titleRight}>{weatherData.current && weatherData.current.humidity} %</Text>
              </View>
              <View style={styles.elemento1}>
                <Text style={styles.titleLeft}>Visibilidad</Text>
              </View>
              <View style={styles.elemento2}>
                <Text style={styles.titleRight}>{weatherData.current && weatherData.current.visibility/1000} km/h</Text>
              </View>
              <View style={styles.elemento1}>
                <Text style={styles.titleLeft}>Viento</Text>
              </View>
              <View style={styles.elemento2}>
                <Text style={styles.titleRight}>{weatherData.current && weatherData.current.wind_deg}&deg; {weatherData.current && weatherData.current.wind_speed} m/s</Text>
              </View>
              <View style={styles.elemento1}>
                <Text style={styles.titleLeft}>S. Térmica</Text>
              </View>
              <View style={styles.elemento2}>
                <Text style={styles.titleRight}>{weatherData.current && parseInt(weatherData.current.feels_like)} &deg;C</Text>
              </View>
              <View style={styles.elemento1}>
                <Text style={styles.titleLeft}>P. de Rocío</Text>
              </View>
              <View style={styles.elemento2}>
                <Text style={styles.titleRight}>{weatherData.current && parseInt(weatherData.current.dew_point)}&deg;</Text>
              </View>
              <View style={styles.elemento1}>
                <Text style={styles.titleLeft}>Indice UV</Text>
              </View>
              <View style={styles.elemento2}>
                <Text style={styles.titleRight}>{weatherData.current && parseInt(weatherData.current.uvi)} de 10</Text>
              </View>
              <View style={styles.elemento1}>
                <Text style={styles.titleLeft}>Nubosidad</Text>
              </View>
              <View style={styles.elemento2}>
                <Text style={styles.titleRight}>{weatherData.current && weatherData.current.clouds} %</Text>
              </View>
              <View style={styles.elemento1}>
                <Text style={styles.titleLeft}>Amanece</Text>
              </View>
              <View style={styles.elemento2}>
                <Text style={styles.titleRight}>{weatherData.current && this.format_hourly(weatherData.current.sunrise)}</Text>
              </View>
              <View style={styles.elemento1}>
                <Text style={styles.titleLeft}>Oscurece</Text>
              </View>
              <View style={styles.elemento2}>
                <Text style={styles.titleRight}>{weatherData.current && this.format_hourly(weatherData.current.sunset)}</Text>
              </View>
          </View> 
          

          <View style={styles.titleContainer} >
            <Text style={styles.titleServices}>Calidad actual del aire</Text>
            <View style={styles.borderContainer}>
              <View style={styles.border} />
            </View>
          </View>
          {
            calidadAire.list && calidadAire.list[0].main.aqi == "1" ?
            <View style={styles.titleContainerDescription} >
              <Text style={styles.titleServicesDescription}>La calidad del aire es ideal para la mayoría de los individuos; disfrute sus actividades normales al aire libre.</Text>
            </View>
            :
            calidadAire.list && calidadAire.list[0].main.aqi == "2" ?
            <View style={styles.titleContainerDescription} >
              <Text style={styles.titleServicesDescription}>La calidad del aire es aceptable en general para la mayoría de los individuos. Sin embargo, los grupos sensibles pueden experimentar síntomas menores a moderados con una exposición a largo plazo.</Text>
            </View>
            :
            calidadAire.list && calidadAire.list[0].main.aqi == "3" ?
            <View style={styles.titleContainerDescription} >
              <Text style={styles.titleServicesDescription}>El aire ha alcanzado un nivel alto de contaminación y no es saludable para los grupos sensibles. Reduzca el tiempo de permanencia afuera si tiene síntomas tales como dificultad para respirar o irritación de la garganta.</Text>
            </View>
            :
            calidadAire.list && calidadAire.list[0].main.aqi == "4" ?
            <View style={styles.titleContainerDescription} >
              <Text style={styles.titleServicesDescription}>Los grupos sensibles pueden sentir los efectos en la salud inmediatamente. Los individuos saludables pueden experimentar dificultad para respirar e irritación de la garganta con una exposición prolongada. Limite las actividades al aire libre.</Text>
            </View>
            :
            calidadAire.list && calidadAire.list[0].main.aqi == "5" ?
            <View style={styles.titleContainerDescription} >
              <Text style={styles.titleServicesDescription}>Cualquier exposición al aire, aun algunos minutos, puede tener serios efectos en la salud de todos. Evite las actividades al aire libre.</Text>
            </View>
            :
            null
          }

          <View style={styles.detalle}>
              <View style={styles.elemento1}>
                <Text style={styles.imageContainer}> {calidadAire.list && calidadAire.list[0].main.aqi} </Text>
              </View>
              <View style={styles.elemento2}>
                {
                  calidadAire.list && calidadAire.list[0].main.aqi == "1" ?
                <Text style={styles.titleCalidadAire}>
                    Excelente
                  </Text>
                  :
                  calidadAire.list && calidadAire.list[0].main.aqi == "2" ?
                  <Text style={styles.titleCalidadAire}>
                    Normal
                  </Text>
                  :
                  calidadAire.list && calidadAire.list[0].main.aqi == "3" ?
                  <Text style={styles.titleCalidadAire}>
                    Deficiente
                  </Text>
                  :
                  calidadAire.list && calidadAire.list[0].main.aqi == "4" ?
                  <Text style={styles.titleCalidadAire}>
                    Insalubre
                  </Text>
                  :
                  calidadAire.list && calidadAire.list[0].main.aqi == "5" ?
                  <Text style={styles.titleCalidadAire}>
                    Peligroso
                  </Text>
                  :
                  null
                }
              </View>
          </View> 

          <View style={styles.titleContainer} >
            <Text style={styles.titleServices}>Alerta Meteorológico</Text>
            <View style={styles.borderContainer}>
              <View style={styles.border} />
            </View>
          </View>
            
            {
              weatherData.alerts ?
              <>
              <View style={styles.titleContainer} >
                <Text style={styles.titleServices}>{weatherData.alerts && weatherData.alerts[0].sender_name}</Text>
                <Text style={styles.titleServices}>Evento: {weatherData.alerts && weatherData.alerts[0].event}</Text>
                <Text style={styles.titleServices}>Desde: {weatherData.alerts && this.format_time_title(weatherData.alerts[0].start)}</Text>
                <Text style={styles.titleServices}>Hasta: {weatherData.alerts && this.format_time_title(weatherData.alerts[0].end)}</Text>
                <View style={styles.borderContainer}>
                </View>
              </View>

              <View style={styles.titleContainerDescription} >
                <Text style={styles.titleServicesDescription}>{weatherData.alerts && weatherData.alerts[0].description} </Text>
              </View>
              
              </>
              :
              <View style={styles.titleContainerDescription} >
                <Text style={styles.titleServicesDescription}>No existen alertas vigentes</Text>
              </View>
            }

            <View style={styles.titleContainer} >
              <Text style={styles.titleServices}>Pronostico extendido: 3 días</Text>
              <View style={styles.borderContainer}>
                <View style={styles.border} />
              </View>
            </View>

            <View style={styles.detalle}>

              <View style={styles.dayExtend}>
                <Text style={styles.titleServicesDescription}>{weatherData.daily && this.format_day(weatherData.daily[1].dt)}</Text>
                <Text style={styles.titleServicesDescription}>{weatherData.daily && this.format_day_title(weatherData.daily[1].dt)}</Text>
                <Image 
                    style={{width:50,height:50}} 
                    source={{
                        uri: `http://openweathermap.org/img/wn/${weatherData.daily && weatherData.daily[1].weather[0].icon}@2x.png`,
                    }} 
                  
                />
                <Text style={styles.titleServicesDescription}>{weatherData.daily && weatherData.daily[1].weather[0].description}</Text>
                <Text style={styles.titleServicesDescription}>{weatherData.daily && parseInt(weatherData.daily[1].temp.day)} &deg;C</Text>
              </View>

              <View style={styles.dayExtend}>
                <Text style={styles.titleServicesDescription}>{weatherData.daily && this.format_day(weatherData.daily[2].dt)}</Text>
                <Text style={styles.titleServicesDescription}>{weatherData.daily && this.format_day_title(weatherData.daily[2].dt)}</Text>
                <Image 
                    style={{width:50,height:50}} 
                    source={{
                        uri: `http://openweathermap.org/img/wn/${weatherData.daily && weatherData.daily[2].weather[0].icon}@2x.png`,
                    }} 
                  
                />
                <Text style={styles.titleServicesDescription}>{weatherData.daily && weatherData.daily[2].weather[0].description}</Text>
                <Text style={styles.titleServicesDescription}>{weatherData.daily && parseInt(weatherData.daily[2].temp.day)} &deg;C</Text>
              </View>

              <View style={styles.dayExtend}>
                <Text style={styles.titleServicesDescription}>{weatherData.daily && this.format_day(weatherData.daily[3].dt)}</Text>
                <Text style={styles.titleServicesDescription}>{weatherData.daily && this.format_day_title(weatherData.daily[3].dt)}</Text>
                <Image 
                    style={{width:50,height:50}} 
                    source={{
                        uri: `http://openweathermap.org/img/wn/${weatherData.daily && weatherData.daily[3].weather[0].icon}@2x.png`,
                    }} 
                  
                />
                <Text style={styles.titleServicesDescription}>{weatherData.daily && weatherData.daily[3].weather[0].description}</Text>
                <Text style={styles.titleServicesDescription}>{weatherData.daily && parseInt(weatherData.daily[3].temp.day)} &deg;C</Text>
              </View>
            </View>  


          <Text style={styles.heading2}>{errorMessage}</Text>

          

        </View>
      </ScrollView>
      :
      <View style={styles.container}> 
        <Text style={styles.heading6}>Sincronizando ...</Text>
      </View>
    )
  }
}


const TabNavigator = createMaterialBottomTabNavigator(
  {
    Hoy: { 
      screen: HomeScreen, 
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'calendar-outline'}></Icon>
          </View>
        ),
      } 
    },
    Información: { 
      screen: TerminosScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'list-outline'}></Icon>
          </View>
        ),
      },

    },
    Sobre: { 
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'information-circle-outline'}></Icon>
          </View>
        ),
      },

    }, 
  },
  {
    initialRouteName: 'Hoy',
    activeColor: '#f0edf6',
    inactiveColor: '#48484A',
    barStyle: { backgroundColor: '#eb6e4b' },
  }

);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#333333',
    height:"100%",
    width:"100%",
  },
  dateTitle:{
    color:"#fff",
    margin:5,
    paddingTop:70
  },
  title:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:28,
    
  },
  description:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:15,
    textTransform: 'capitalize',
    marginTop: -20
  },
  temp:{
    color:"#fff",
    fontWeight:"normal",
    fontSize:50,
    margin:0
  },
  titleContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  titleContainerDescription:{
    marginBottom: 20,
    marginLeft:50,
    marginRight:35
  },
  titleServices: {
    fontSize: 18,
    marginBottom:5,
    color:"#fff",  
    textAlign:"center"
  },
  titleServicesDescription: {
    fontSize: 15,
    marginBottom:5,
    color:"#fff", 
    textAlign:"center" 
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

  heading6:{
    color:"#fff",
    margin:5,
    textTransform: 'uppercase',
  },
  imageContainer: {
    height:40,
    width: 80,
    backgroundColor: '#eb6e4b',
    textAlign: 'center',
    textAlignVertical:'center',
  },
  titleCalidadAire: {
    height:40,
    textAlign: "right",
    textAlignVertical:'center',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  dayExtend: {
    width: "33%",
    paddingLeft:0,
    justifyContent:"center",
    alignItems:"center",
  },

  
});