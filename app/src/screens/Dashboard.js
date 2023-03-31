import React, { Component } from 'react';
import { StatusBar, SafeAreaView } from "react-native";
import { ModernHeader } from "@freakycoder/react-native-header-view";
import Timeline from "react-native-beautiful-timeline";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      selected: null
    };
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
  }

  componentDidMount() {
    fetch('https://www.protex-dashboard.it/api/notification/xuser/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth_protex: 'CHOSARA',
      }),
    })   
      .then(response => response.json())
      .then(data => this.setState({notifications: data}))
      .catch(error => console.error(error));
  }

  onEventPress(data) {
    this.setState({selected: data});
  }

  renderSelected() {
    if(this.state.selected) {
      return <Text style={{marginTop:0}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
    }
  }

  render() {
    const { notifications } = this.state;
    const dummyData = notifications.map(notification => ({
      date: notification.dataora,
      data: [
        {
          title: notification.title,
          subtitle: notification.subtitle,
          date: notification.dataora,
        }]
    }));
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

export default DashBoard;
