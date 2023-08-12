import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image} from 'react-native';
import Weather from '../screens/components/Weather';
import SearchBar from '../screens/components/SearchBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
const API_KEY = "e2e5f2b4abcd826836660ebeb7b280e1";
export default function App() {
  
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);
    async function fetchWeatherData(cityName) {
    setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if(response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('Karachi');
    }, [])
    

    if(!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='gray'  size={36} />
            </View>

        )
    }

    else if(weatherData === null) {
        return (
            <View style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
            </View>
        )
    }

    return (
      <ScrollView style={styles.main}>
        {/* <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
    <Flashcard
      label={'Leaf Rust'}
      imagePath={require('../assets/leafrust.png') }
      >
      </Flashcard>
      <View>
        <Text style={styles.text}>Cause: Puccinia Triticina Fungus</Text>
      </View>
    </TouchableOpacity> */}
   
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  />
        {/* </View> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'lightgray',
    marginTop: "5%",
    marginLeft: "2%",
    marginRight: "2%",
    borderRadius: 10,

   },
  })
  
//   primaryText: {
//       margin: 20,
//       fontSize: 10,
//   },
//   // card: {
//   //   flex: 1,
//   //   flexDirection: 'row',
//   //     backgroundColor: 'peru',
//   //     // borderRadius: 8,
//   //     // padding: 10,
//   //     // elevation: 3,
//   //     marginBottom: 30,
//   //     marginLeft: 5,
//   //     marginRight: 10,
//   //     // marginTop: 15,
      
//   // },
//   card: {
//     flex: 1,
//     flexDirection: 'row',
//       backgroundColor: 'peru',
//       marginTop: "5%",
//       marginBottom: "5%",
//   },
//   image1: {
//       width: 80,
//       height: 80,
//       marginBottom: 10,
//       resizeMode: 'cover',
//       marginRight: 10,
//   },
//   label: {
//     flex: 1,
//       fontSize: 40,
//       color: 'white',      
//   },
