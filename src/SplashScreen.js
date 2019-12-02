import React, { Component } from 'react';
import { StyleSheet, Text, View,
  StatusBar, SafeAreaView, Image, ImageBackground } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

class SplashScreen extends Component {

  renderContent() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/launchify_logo.png')}
            style={styles.logoStyle}
          />
        </View>
        <View style={styles.bodyContainer}>
          <Button
            title="Get Started"
            onPress={() => this.props.navigation.navigate('Home')}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={require('../assets/launcher.gif')}
          style={styles.backgroundImage}>
            {this.renderContent()}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 200
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 100
  },
  logoStyle: {
    width: 400,
    height: 400
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  buttonStyle: {
    borderRadius: 5,
    width: 200,
    backgroundColor: '#026eca',
    marginTop: 10
  },
});

export default SplashScreen;
