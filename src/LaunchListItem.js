import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import moment from 'moment';

class LaunchListItem extends Component {

  renderVideoUrl() {
    const { links } = this.props.launchItem
    if(links.video_link){
      return (
        <Text style={styles.urlStyle}>url: ${links.video_link}</Text>
      )
    }
    return null;
  }

  render() {
    const { mission_name, rocket, launch_date_local, links } = this.props.launchItem
    var m = moment.unix(new Date(launch_date_local).getTime()/1000);
    var formatted = m.format("MMM D, YYYY");
    return (
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.dateViewStyle}>{formatted}</Text>
        </View>
        <View style={styles.dividerContainer}>
          <Image
            source={require('../assets/timeline_icon.png')}
            style={styles.timelineIconStyle}
          />
          <View style={styles.dividerStyle} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.titleStyle}>{mission_name}</Text>
          <Text style={styles.subTitleStyle}>{rocket.rocket_name}</Text>
          {this.renderVideoUrl()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: 120,
    flexDirection: 'row'
  },
  leftContainer: {
    width: '20%',
    alignItems: 'center'
  },
  dividerContainer: {
    width: '10%',
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  dateViewStyle: {
    fontSize: 14,
    marginTop: 10,
    color: 'green',
    fontWeight:'bold'
  },
  rightContainer: {
    width: '70%',
    paddingLeft: 10,
    flexDirection: 'column'
  },
  timelineIconStyle: {
    width: 30,
    height: 30
  },
  dividerStyle: {
    width: 3,
    height: '100%',
    backgroundColor: 'gray'
  },
  horizontalDividerStyle: {
    marginTop: 20,
    height: 1,
    width: '100%',
    backgroundColor: 'gray'
  },
  titleStyle: {
    fontSize: 20,
    marginTop: 10,
    color: 'black',
    fontWeight:'bold'
  },
  subTitleStyle: {
    fontSize: 14,
    marginTop: 5,
    color: 'gray',
    fontWeight:'600'
  },
  urlStyle: {
    fontSize: 12,
    marginTop: 5,
    color: 'gray',
    fontWeight:'600'
  },
});

export default LaunchListItem;
