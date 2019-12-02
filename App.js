import React from 'react';
import SplashScreen from './src/SplashScreen';
import HomeScreen from './src/HomeScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

const App = createAppContainer(MainNavigator);

export default App;
