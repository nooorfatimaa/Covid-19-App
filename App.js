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
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>World Population</Text>
        <Text style={{marginBottom: 15}}>{JSON.stringify(population)}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Confirmed Cases</Text>
        <Text>{JSON.stringify(covid.cases)}</Text>
        <Text style={{marginBottom: 15}}>{parseFloat(JSON.stringify(covid.cases)/JSON.stringify(population)).toFixed(4)*100}% of world population</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Recovered</Text>
        <Text>{JSON.stringify(covid.recovered)}</Text>
        <Text style={{marginBottom: 15}}>{parseFloat(JSON.stringify(covid.recovered)/JSON.stringify(covid.cases)).toFixed(2)*100}% of total cases</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Critical</Text>
        <Text>{JSON.stringify(covid.critical)}</Text>
        <Text style={{marginBottom: 15}}>{parseFloat(JSON.stringify(covid.critical)/JSON.stringify(covid.cases)).toFixed(4)*100}% of total cases</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Deaths</Text>
        <Text>{JSON.stringify(covid.critical)}</Text>
        <Text style={{marginBottom: 20}}>{parseFloat(JSON.stringify(covid.deaths)/JSON.stringify(covid.cases)).toFixed(4)*100}% of total cases</Text>
        <Text style={{fontWeight: 'large', fontSize: 15, color: 'grey'}}>Last Updated: 10-12-2020</Text>
      </View>
    </View>
  );
}

const CountryListScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [countryList, setCountryList] = useState([]);

  React.useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    const options = {
      method: 'GET',
      url: 'https://coronavirus-19-api.herokuapp.com/countries',
    };

    axios
      .request(options)
      .then(function (response) {
        setCountryList(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading Data from JSON Placeholder API ...</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: 30 }}>
      <View style={{borderWidth: 1, width: '70%', height: 60}}></View>
      <FlatList
        data={countryList}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.5} onPress={()=> navigation.navigate("Country Statistics", {country: item.country})}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 1,
                borderColor: 'lightblue',
              }}>
              <View style={{ paddingLeft: 5, paddingRight: 10 }}>
                <Text style={{color:'grey', fontSize: 20, fontWeight: 'large'}}>
                  {item.country}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const CountryStatsScreen = ({navigation, route}) => {
  const country = route.params.country;
  const [loading, setLoading] = useState(true);
  const [countryStats, setCountryStats] = useState([]);
  React.useEffect(() => {
    getStats();
  }, []);

  const getStats = () => {
    const options = {
      method: 'GET',
      url: `https://coronavirus-19-api.herokuapp.com/countries/${country}`,
    };

    axios
      .request(options)
      .then(function (response) {
        setCountryStats(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading Data from JSON Placeholder API ...</Text>
      </View>
    );
  }
  return (
    <View style={{ paddingTop: 30 }}>
    <View style={{alignItems: 'center'}}>
      <Text style={{fontWeight: 'bold', fontSize: 30, padding: 10, color: 'grey'}}>{countryStats.country} Statistics</Text>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Total Cases</Text>
      <Text>{JSON.stringify(countryStats.cases)}</Text>
      <Text style={{marginBottom: 10, color:'grey'}}>{parseFloat(JSON.stringify(countryStats.cases)/82439376).toFixed(3)*100}% of total cases in the world</Text>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Recovered</Text>
      <Text>{JSON.stringify(countryStats.recovered)}</Text>
      <Text style={{marginBottom: 10, color:'grey'}}>{parseFloat(JSON.stringify(countryStats.recovered)/JSON.stringify(countryStats.cases)).toFixed(3)*100}% of total cases in {countryStats.country}</Text>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Critical</Text>
      <Text>{JSON.stringify(countryStats.critical)}</Text>
      <Text style={{marginBottom: 10, color:'grey'}}>{parseFloat(JSON.stringify(countryStats.critical)/JSON.stringify(countryStats.cases)).toFixed(3)*100}% of total cases in {countryStats.country}</Text>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Deaths</Text>
      <Text>{JSON.stringify(countryStats.deaths)}</Text>
      <Text style={{marginBottom: 10, color:'grey'}}>{parseFloat(JSON.stringify(countryStats.deaths)/JSON.stringify(countryStats.cases)).toFixed(2)*100}% of total cases in {countryStats.country}</Text>
    </View>
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
      screenOptions={({navigation}) => ({
        headerTintColor: "grey",
        headerStyle: {
          backgroundColor: "lightblue"
        },
        headerLeft: () => <View style={{marginLeft: 10}}><Ionicons name="arrow-back-circle-sharp" color="grey" size={35} onPress={() => navigation.goBack()}/></View>
      })}>
      <Stack.Screen name="Countries List" component={CountryListScreen} />
      <Stack.Screen name="Country Statistics" component={CountryStatsScreen} />
    </Stack.Navigator>
  );
}

const FavouriteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTintColor: "grey",
        headerStyle: {
          backgroundColor: "lightblue"
        },
        headerLeft: () => <View style={{marginLeft: 10}}><Ionicons name="arrow-back-circle-sharp" color="grey" size={35} onPress={() => navigation.goBack()}/></View>
      })}>
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
      drawerStyle={{
        backgroundColor: 'white',
        width: 250,
      }}>
      <Drawer.Screen name="World Statistics" component={WorldStatsScreen} options={{drawerIcon: () => (<Ionicons name="earth" size={35} color="lightblue" />),}} />
      <Drawer.Screen name="Countries List" component={CountryStack} options={{drawerIcon: () => (<FontAwesome5 name="city" size={35} color="lightblue"/>),}} />
      <Drawer.Screen name="Favourites" component={FavouriteStack} options={{drawerIcon: () => (<Ionicons name="star" size={35} color="lightblue"/>),}} />
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