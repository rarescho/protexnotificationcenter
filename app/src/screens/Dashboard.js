import React, { useEffect, useState } from 'react';
import { StatusBar, SafeAreaView, Text,View } from "react-native";
import Timeline from "react-native-beautiful-timeline";
import axios from 'axios';
import { Title } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DashBoard = () => {
  const [notifications, setNotifications] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const valueUser = await AsyncStorage.getItem('username');
        // console.log("valueUser: ", valueUser);
        const response = await axios.post('https://www.protex-dashboard.it/api/notification/xuser', {
          auth_protex: 'CHOVLAD',
        });
        setNotifications(response.data);
      } catch (error) {
        console.log("ERRORE:", error);
        if (error.response) {
          console.log("Status code:", error.response.status);
          console.log("Response data:", error.response.data);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error setting up the request:", error.message);
        }
      }
    };
  
    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const valueUser = await AsyncStorage.getItem('username');
  //       console.log("valueUser: ",valueUser)
  //       const response = await axios.post('https://www.protex-dashboard.it/api/notification/xuser', {
  //         auth_protex: valueUser,
  //         });
  //       setNotifications(response.data);
  //     } catch (error) {
  //       console.log("ERRORE:", error);
  //       if (error.response) {
  //         console.log("Status code:", error.response.status);
  //         console.log("Response data:", error.response.data);
  //       } else if (error.request) {
  //         console.log("No response received:", error.request);
  //       } else {
  //         console.log("Error setting up the request:", error.message);
  //       }
  //     }
  //   };
    
  //   fetchData();
  // }, []);
  const onEventPress = (data) => {
    setSelected(data);
  }
  const renderSelected = () => {
    if (selected) {
      return <Text style={{ marginTop: 0 }}>Selected event: {selected.title} at {selected.time}</Text>
    }
  }
  const dummyData = notifications.map(notification => ({
    date: notification.dataora,
    data: [
      {
        title: notification.title,
        subtitle: notification.subtitle,
        date: notification.dataora,
      }
    ]
  }));


// find the current date and get string like "May 2020"
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const currentMonthYear = `${currentMonth} ${currentYear}`;

//create an action for the back button that will go back to previous screen
  const onBack = () => {
    navigation.goBack();
  };




  return (
    <>     
       <SafeAreaView
        style={{ flex: 1, backgroundColor: "#fdfdfd", padding: 0 }}
      >
         <View style={styles.container}>
        <View style={styles.leftIconContainer}>
        </View>
      
        <Text style={styles.text}>{currentMonthYear}</Text>
        <View style={styles.rightIconContainer}>
          <Text style={[styles.icon, styles.rightIcon]}>...</Text>
        </View>
      </View>
        <Timeline style={{width:'100%'}}
          data={dummyData}
          dashThickness={2}
          dashLength={dummyData.length}      
        />
      </SafeAreaView>
    </>
  );
}

const styles = {
  container: {
    backgroundColor: '#fdfdfd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
  },
  rightIconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    color: '#566184',
    fontFamily: 'Alata-Regular',
    fontSize: 16,
  },
  rightIcon: {
    color: '#984cf8',
  },
  leftIcon: {
    color: '#984cf8',
  },
};
export default DashBoard;
