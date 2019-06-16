import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, Alert } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddNewScreen from './screens/AddNewScreen';
import AsyncStorage from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log("sld token", fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });
  
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="loginScreen"
            component={LoginScreen}
            title="Login"
            initial
          />
          <Scene
            key="registerScreen"
            component={RegisterScreen}
            title="Register"
          />
          <Scene
            key="mainScreen"
            component={MainScreen}
            title="Main"
          />
          <Scene
            key="detailsScreen"
            component={DetailsScreen}
            title="Details"
          />
          <Scene
            key="addNewScreen"
            component={AddNewScreen}
            title="Add new list"

          />
        </Scene>
      </Router>
    )
  }
}

