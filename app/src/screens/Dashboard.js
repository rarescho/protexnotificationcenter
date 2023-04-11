import React, { Component } from 'react';
import { StatusBar, SafeAreaView } from "react-native";
import Timeline from "react-native-beautiful-timeline";
import axios from 'axios';


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
  // http://10.99.99.167:9000/notification/xuser
  async componentDidMount() {
    await fetch('https://www.protex-dashboard.it/api/notification/xuser', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin' : '*',
      },
      body: JSON.stringify({
        auth_protex: 'CHORARES',
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
