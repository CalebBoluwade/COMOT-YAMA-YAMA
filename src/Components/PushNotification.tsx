import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Platform,
  Dimensions,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OneSignal from 'react-native-onesignal';


const PushNotification = () => {
  OneSignal.setAppId(Constants.manifest!.extra!.oneSignalAppId);
  const [newNotification, setNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  
  OneSignal.promptForPushNotificationsWithUserResponse();

  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
    let notification = notificationReceivedEvent.getNotification();
    console.log("notification: ", notification);
    const data = notification.additionalData
    console.log("additionalData: ", data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  });
  
  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log("OneSignal: notification opened:", notification);
  });

  return (
    <></>
  )
};

export default PushNotification;

const styles = StyleSheet.create({
  inAppNotification: {
    position: "absolute",
    // width: width / 1.05,
    maxWidth: 400,
    alignSelf: "center",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    bottom: 30,
    elevation: 5,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 10 },
    zIndex: 999,
  },
});
