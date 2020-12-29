import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Pressable, Button, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const WorldStatsScreen = ({navigation}) => {
  return(
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}><Text style={{fontWeight: 'bold', fontSize: '30', color: 'grey'}}>WORLD STATISTICS</Text></View>
      <Button
        title="Go to country list"
        onPress={() => navigation.navigate("Countries List")}
      ></Button>
    </View>
  );
}

const CountryListScreen = ({navigation}) => {
  return(
    <View>
      <Button
        title="Go to country list"
        onPress={() => navigation.navigate("Countries List")}
      ></Button>
    </View>
  );
}

const CountryStatsScreen = ({navigation}) => {
  return(
    <View>
      <Button
        title="Go to country list"
        onPress={() => navigation.navigate("Countries List")}
      ></Button>
    </View>
  );
}

const FavouriteListScreen = ({navigation}) => {
  return(
    <View>
      <Button
        title="Go to country list"
        onPress={() => navigation.navigate("Countries List")}
      ></Button>
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
