import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Pressable, Button, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const WorldStatsScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [population, setWorldPop] = useState();
  const [covid, setCovidStats] = useState([]);
  var country = 'World';

  useEffect(() => {
    getCovidData();
    getWorldData();
  }, []);

  const getWorldData = () => {
    const options = {
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/worldpopulation',
      headers: {
        'x-rapidapi-key': 'cb84d95f53mshe564f47b0a95244p17ad39jsn15c6dfb18d6f',
        'x-rapidapi-host': 'world-population.p.rapidapi.com'
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setLoading(false);
        setWorldPop(response.data.body.world_population);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getCovidData = () => {
    const options = {
      method: 'GET',
      url: `https://coronavirus-19-api.herokuapp.com/countries/${country}`,
    };

    axios
      .request(options)
      .then(function (response) {
        setCovidStats(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading Data from JSON Placeholder API ...</Text>
      </View>
    );
  }

  return(
    <View style={styles.container}>
      <View style={{height: 70, alignItems: 'center', justifyContent: 'center', marginTop: 15,}}><Text style={{fontWeight: 'bold', fontSize: 30, color: 'grey', padding: 3}}>WORLD STATISTICS</Text></View>
      <View>
        <Text>World Population: {JSON.stringify(population)}</Text>
        <Text>Confirmed Cases: {JSON.stringify(covid.cases)}</Text>
        <Text>Confirmed Cases % : {parseFloat(JSON.stringify(covid.cases)/JSON.stringify(population)).toFixed(4)*100}% of world population</Text>
        <Text>Recovered: {JSON.stringify(covid.recovered)}</Text>
        <Text>Recovered % : {parseFloat(JSON.stringify(covid.recovered)/JSON.stringify(covid.cases)).toFixed(4)*100}% of total cases</Text>
        <Text>Critical: {JSON.stringify(covid.critical)}</Text>
        <Text>Critical % : {parseFloat(JSON.stringify(covid.critical)/JSON.stringify(covid.cases)).toFixed(4)*100}% of total cases</Text>
        <Text>Deaths: {JSON.stringify(covid.critical)}</Text>
        <Text>Death % : {parseFloat(JSON.stringify(covid.deaths)/JSON.stringify(covid.cases)).toFixed(4)*100}% of total cases</Text>
        <Text>Last Updated: 01-12-2020</Text>
      </View>
    </View>
  );
}

const CountryListScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [countryList, setCountryList] = useState([]);

  return(
    <View>
    </View>
  );
}

const CountryStatsScreen = ({navigation}) => {
  return(
    <View>
    </View>
  );
}

const FavouriteListScreen = ({navigation}) => {
  return(
    <View>
    </View>
  );
}

const CountryStack = () => {
  return (
    <Stack.Navigator
      //initialRouteName={"Start"} 
      screenOptions={{
        headerTintColor: "grey",
        headerStyle: {
          backgroundColor: "lightblue"
        }
      }}>
      <Stack.Screen name="Countries List" component={CountryListScreen} />
      <Stack.Screen name="Country Statistics" component={CountryStatsScreen} />
    </Stack.Navigator>
  );
}

const FavouriteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "grey",
        headerStyle: {
          backgroundColor: "lightblue"
        }
      }}>
      <Stack.Screen name="Favourites" component={FavouriteListScreen} />
      <Stack.Screen name="Country Statistics" component={CountryStatsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
      //openByDefault={true}
      //drawerType="slide"
      //drawerStyle={{
        //backgroundColor: 'lightyellow',
        //width: 200,
      //}}>
      >
      <Drawer.Screen name="Home" component={WorldStatsScreen} />
      <Drawer.Screen name="Countries List" component={CountryStack} />
      <Drawer.Screen name="Favourites" component={FavouriteStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex : 1,
  },
});
