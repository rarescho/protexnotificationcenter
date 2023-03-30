/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, useState } from 'react';
import { StatusBar, SafeAreaView } from "react-native";
import { ModernHeader } from "@freakycoder/react-native-header-view";


import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
// import Timeline from 'react-native-timeline-flatlist'
import Timeline from "react-native-beautiful-timeline";

const dummyData = [
  {
    date: 1574342522000,
    data: [
      {
        title: "React Native Beautiful Timeline",
        subtitle: "Sed at justo eros. Phasellus.",
        date: 1574342522000,
      },
      {
        title: "React Native",
        subtitle: "Sed viverra. Nam sagittis.",
        date: 1574342501000,
      },
    ],
  },
  {
    date: 1574248261000,
    data: [
      {
        title: "Timeline",
        subtitle: "Morbi magna orci, consequat in.",
        date: 1574248261000,
      },
    ],
  },
  {
    date: 1574125621000,
    data: [
      {
        title: "Beauty Timeline",
        subtitle: "Nulla a eleifend urna. Morbi. Praesent.",
        date: 1574125621000,
      },
    ],
  },
  {
    date: 1574125621000,
    data: [
      {
        title: "Timeline Title",
        subtitle: "Ut viverra. Nunc interdum.",
        date: 1574125621000,
      },
    ],
  },
  {
    date: 1574125621000,
    data: [
      {
        title: "In imperdiet.",
        subtitle:
          "Etiam at libero eu lacus.Proin pellentesque tempus neque, quis.",
        date: 1574125621000,
      },
    ],
  },
];

export default class DashBoard extends Component {
  constructor(){
    super()
    this.onEventPress = this.onEventPress.bind(this)
    this.renderSelected = this.renderSelected.bind(this)

    // this.data = [
    //   {
    //     time: '09:00', 
    //     title: 'Archery Training', 
    //     icon: require('../assets/archery.png'), 
    //     description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
    //     lineColor:'#009688', 
    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
    //   },
    //   {
    //     time: '10:45', 
    //     title: 'Play Badminton', 
    //     icon: require('../assets/archery.png'), 
    //     description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', 
    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
    //   },
    //   {
    //     time: '12:00', 
    //     title: 'Lunch', 
    //   },
    //   {
    //     time: '14:00', 
    //     title: 'Watch Soccer', 
    //     icon: require('../assets/archery.png'), 
    //     description: 'Team sport played between two teams of eleven players with a spherical ball. ',
    //     lineColor:'#009688', 
    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
    //   },
    //   {
    //     time: '16:30', 
    //     title: 'Go to Fitness center',
    //     icon: require('../assets/archery.png'), 
    //     description: 'Look out for the Best Gym & Fitness Centers around me :)', 
    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
    //   }
    //   ,
    //   {
    //     time: '16:30', 
    //     title: 'Go to Fitness center', 
    //     icon: require('../assets/archery.png'), 
    //     description: 'Look out for the Best Gym & Fitness Centers around me :)', 
    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
    //   }
    //   ,
    //   {
    //     time: '16:30', 
    //     title: 'Go to Fitness center', 
    //     icon: require('../assets/archery.png'), 
    //     description: 'Look out for the Best Gym & Fitness Centers around me :)', 
    //     imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
    //   }
    // ]

   
    this.state = {selected: null}
  } 

  onEventPress(data){
    this.setState({selected: data})
  }

  renderSelected(){
      if(this.state.selected)
        return <Text style={{marginTop:0}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
  }

  render() {
    // return (
    //   <View style={styles.container}>
    //     {this.renderSelected()}
    //     <Timeline 
    //       style={styles.list}
    //       dashLength={this.data.length}
    //       data={this.data}
    //       circleSize={20}
    //       circleColor='rgba(0,0,0,0)'
    //       lineColor='rgb(45,156,219)'
    //       timeContainerStyle={{minWidth:52, marginTop: 0}}
    //       timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
    //       descriptionStyle={{color:'gray'}}
    //       options={{
    //         style:{paddingTop:5}
    //       }}
    //       innerCircle={'icon'}
    //       onEventPress={this.onEventPress}                    
    //       separator={false}
    //       detailContainerStyle={{marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#BBDAFF", borderRadius: 10}}
    //       columnFormat='two-column'
    //     />
    //   </View>
    // );

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#fdfdfd", padding: 16 }}
        >      
        <ModernHeader
          backgroundColor="#fdfdfd"
          text="November 2019"
          rightIconName="dots-vertical"
          textStyle={{
            color: "#566184",
            fontFamily: "Alata-Regular",
          }}
          rightIconType="MaterialCommunityIcons"
          rightIconColor="#984cf8"
          leftIconName="arrowleft"
          leftIconType="AntDesign"
          leftIconColor="#984cf8"
        />  
          <Timeline
            data={dummyData}
            dashThickness={2}
            dashLength={dummyData.length}
          />
        </SafeAreaView>
      </>
    );
  }
}

