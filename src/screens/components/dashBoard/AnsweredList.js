import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { getAnswersList } from '../../../utils/database';


import moment from 'moment';
import COLORS from '../shared/colors/color';

const AnsweredList = ({navigation}) => {
  const [allAnswers, setAnswersList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showButton,setShowButton] = useState(true);
  const [userLoggedIn,setUserLoggedIn] = useState(null);
  const [viewInfo,setViewInfo] = useState(null);
  const [admin,setAdmin] = useState('');
  useEffect(() => {
    getLoggedUser();
  }, [])
  
  const getLoggedUser = async () => {
  const user = await AsyncStorage.getItem('user')
  setUserLoggedIn(user);
  const result = await AsyncStorage.getItem('done');
  console.log(JSON.stringify(result,0,2),'hjshasjh')
  setViewInfo(result)
  
 }

 console.log(userLoggedIn,'userLoggedIn');

  const getAllAnswersList = async () => {
    setRefreshing(true);
    const answers = await getAnswersList();

    // Transform Questions Data
    let tempAnswers = [];
    await answers.docs.forEach(async quest => {
      await tempAnswers.push({id: quest.id, ...quest.data()});

    });
    await setAnswersList([...tempAnswers])
    setRefreshing(false)
    console.log(tempAnswers,'answers now')
  };

  useEffect(() => {
    getAllAnswersList();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        position: 'relative',
      }}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

      {/* Quiz list */}
      <FlatList
        data={allAnswers}
        onRefresh={getAllAnswersList}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{
          paddingVertical: 20,
        }}
        renderItem={({item}) => (
          <View
            style={{
              padding: 20,
              borderRadius: 5,
              marginVertical: 5,
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: COLORS.white,
              elevation: 2,
            }}>
               
            <View style={{flex: 1, paddingRight: 10}}>
              <Text style={{fontSize: 18, color: COLORS.black}}>
               Title: {item.dataTitle}
              </Text>
              <Text style={{fontSize: 12, color: COLORS.black}}>
               Description: {item.dataDescription}
              </Text>
              {item.created_on != '' ? (
                <Text style={{opacity: 0.5}}>Answered on: {item.created_on}</Text>
              ) : null}
            </View>
        
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 50,
                backgroundColor: COLORS.primary + '20',
              }}
              onPress={() => {
                navigation.navigate('ViewDetails', {
                  answers:item,
                  dataTitle:item.dataTitle
                });
              }}>
              <Text style={{color: COLORS.primary}}>View Details</Text>
            </TouchableOpacity>
            
          </View>
        )}
      />

    
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default AnsweredList;
