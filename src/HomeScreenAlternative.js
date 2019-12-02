import React, { Component } from 'react';
import { StyleSheet, Text, View,
  StatusBar, SafeAreaView, Image, ImageBackground, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Card, Input, Button, ListItem, SearchBar } from 'react-native-elements';
import { HttpLink } from 'apollo-link-http';
import { Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { BarIndicator } from 'react-native-indicators';
import LaunchListItem from './LaunchListItem';

export const FETCH_PAST_LAUNCHES = gql`
  query user($text: String){
    launchesPast(find: {mission_name: $text}){
      mission_name
      launch_date_local
      links {
        video_link
      }
      rocket {
        rocket_name
      }
    }
  }
`

export const FETCH_UPCOMING_LAUNCHES = gql`
query user($text: String){
  launchesUpcoming(find: {mission_name: $text}){
    mission_name
    launch_date_local
    links {
      video_link
    }
    rocket {
      rocket_name
    }
  }
}
`


const makeApolloClient = () => {
  const link = new HttpLink({
    uri: 'https://api.spacex.land/graphql/',
  })

  const cache = new InMemoryCache()

  const client = new ApolloClient({
    link,
    cache
  })

  return client
}

class HomeScreen extends Component {

  state = {
    client: null,
    isStatusPast: true,
    searchText: '',
    querySearchText: '',
    refresh: false
  }

  updateSearch = searchText => {
    this.setState({ searchText });
  };

  componentDidMount() {
    const client = makeApolloClient()
    this.setState({ client })
  }

  renderUpcomingLaunchesContent() {
    return(
      <Query query={FETCH_UPCOMING_LAUNCHES} variables={{text: this.state.querySearchText}}>
        {({ data, error }) => {
          if(error) return(
            <View style={styles.mainContainer}>
              <View style={styles.logoContainer}>
                <Text>{error}</Text>
              </View>
            </View>
          )
          if(data && data.launchesUpcoming) {
            return(
              <FlatList
                extraData={this.state.refresh}
                data={data.launchesUpcoming}
                showsVerticalScrollIndicator={false}
                renderItem={ ({item}) => <LaunchListItem launchItem={item} /> }
                keyExtractor={item => item.mission_name}
              />
            )
          }
          return(
            <View style={styles.mainContainer}>
              <View style={styles.logoContainer}>
                <BarIndicator color='blue' />
              </View>
            </View>
          )
        }}
      </Query>
    )
  }

  renderPastLaunchesContent() {
    return(
      <Query query={FETCH_PAST_LAUNCHES} variables={{text: this.state.querySearchText}}>
        {({ data, error }) => {
          if(error) return(
            <View style={styles.mainContainer}>
              <View style={styles.logoContainer}>
                <Text>{error}</Text>
              </View>
            </View>
          )
          if(data && data.launchesPast) {
            return(
              <FlatList
                extraData={this.state.refresh}
                data={data.launchesPast}
                showsVerticalScrollIndicator={false}
                renderItem={ ({item}) => <LaunchListItem launchItem={item} /> }
                keyExtractor={item => item.mission_name}
              />
            )
          }
          return(
            <View style={styles.mainContainer}>
              <View style={styles.logoContainer}>
                <BarIndicator color='blue' />
              </View>
            </View>
          )
        }}
      </Query>
    )
  }

  renderMainContent() {
    if(this.state.isStatusPast) {
      return(
        <View>
          {this.renderPastLaunchesContent()}
        </View>
      )
    }
    return(
      <View>
        {this.renderUpcomingLaunchesContent()}
      </View>
    )
  }

  renderButtonContainer() {
    if(this.state.isStatusPast) {
      return(
        <Button
          title="Show Upcoming Launches"
          onPress={() => this.setState({ isStatusPast: false })}
          buttonStyle={styles.bottomButton}
          titleStyle={styles.buttonTextStyle}
        />
      )
    }
    return(
      <Button
        title="Show Past Launches"
        onPress={() => this.setState({ isStatusPast: true })}
        buttonStyle={styles.bottomButton}
        titleStyle={styles.buttonTextStyle}
      />
    )
  }

  render() {
    if(!this.state.client){
      return (
        <View style={styles.mainContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/launchify_logo.png')}
              style={styles.logoStyle}
            />
          </View>
        </View>
      );
    }
    return (
      <ApolloProvider client={this.state.client}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.searchBarContainer}>
            <View style={{flex: 10}}>
              <Input
                placeholder="Search Launch..."
                onChangeText={this.updateSearch}
                value={this.state.searchText}
              />
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({ refresh: !this.state.refresh, querySearchText: this.state.searchText })
                }}
              >
                <Text>Search</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.listContainer}>
            {this.renderMainContent()}
          </View>
          <View style={styles.buttonContainer}>
            {this.renderButtonContainer()}
          </View>
        </SafeAreaView>
      </ApolloProvider>
    )
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
  logoStyle: {
    width: 400,
    height: 400
  },
  listContainer: {
    flex: 12,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomButton: {
    width: '100%',
    height: '100%',
    backgroundColor: '#026eca',
  },
  buttonTextStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  timelineIconStyle: {
    width: 30,
    height: 30
  },
});

export default HomeScreen;
