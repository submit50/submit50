import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
// ## Requirements
// - You may not import libraries other than the below:
//   - `expo`
//   - `react`
//   - `react-native`
//   - `prop-types`
//   - `react-navigation`
//   - Any library for icons
// - There should be at least one `StackNavigator`
// - There should be a search screen that allows users to search for movies
//   - You should show more than 10 results if more than 10 results exist
// - There should be a screen that shows additional information about a selected movie
import Home from './components/Home.js'
import Movie from './components/Movie.js'


export default class App extends React.Component {
  render() {
    return <AppNavigator />
  }
}


const AppNavigator = createStackNavigator({
  'Home': Home,
  'Movie': Movie,
})


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

