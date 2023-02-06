import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';

const GoogleSignIn = () => {
  const [userInfo, setUserInfo] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        setUserInfo(result.user);
      } else {
        console.log('Cancelled');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <Text style={styles.text}>
          Name: {userInfo.givenName} {userInfo.familyName}
        </Text>
      ) : (
        <Button title="Sign in with Google" onPress={signInWithGoogle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 20,
  },
});

export default GoogleSignIn;