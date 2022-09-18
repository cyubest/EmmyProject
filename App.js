import 'react-native-gesture-handler';
import React, { Component, useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/screens/navigators/AuthStackNavigator';
import { LogBox } from 'react-native';
import MainAppNavigators from './src/screens/navigators/MainAppNavigator';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminNavigator from './src/screens/navigators/AdminNavigator';



LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
const App = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const onAuthStateChanged = async (user) => {
    console.log(user,'user now information')
    await setCurrentUser(user)
    {user? await AsyncStorage.setItem('user',user?.uid):null}
    {user? await AsyncStorage.setItem('email',user?.email):null}
    setIsLoading(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (isLoading) {
    return null;
  }


  return (
    <NavigationContainer>
      {currentUser && currentUser?.email === 'admin@gmail.com' ? <AdminNavigator/>: currentUser?.email != 'admin@gmail.com' && currentUser?.email !=null ?  <MainAppNavigators />:<AuthStackNavigator />}
    </NavigationContainer>
  );
};




export default App;
