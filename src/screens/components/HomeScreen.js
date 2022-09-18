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
import {signOut} from '../../utils/auth';
import {getAnswersList, getQuestions} from '../../utils/database';
import COLORS from './shared/colors/color';
import CreateButton from './shared/FormButton/CreateButton';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({navigation}) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showButton,setShowButton] = useState(true);
  const [userLoggedIn,setUserLoggedIn] = useState(null);
  const [viewInfo,setViewInfo] = useState(null);
  const [admin,setAdmin] = useState('');
  const [AnsweredList,setAnswersList]=useState([]);
  useEffect(() => {
    getLoggedUser();
  }, [])
  
  const getLoggedUser = async () => {
  const user = await AsyncStorage.getItem('user')
  setUserLoggedIn(user);
  const result = await AsyncStorage.getItem('done');
  console.log(result,'hjshasjh')
  setViewInfo(result)
  
 }

 console.log(userLoggedIn,'userLoggedIn');
 console.log(JSON.stringify(AnsweredList, 0, 2),'answers now')


 const getAllAnswersList = async () => {
  const answers = await getAnswersList();

  // Transform Questions Data
  let tempAnswers = [];
  await answers.docs.forEach(async quest => {
    await tempAnswers.push({id: quest.id, ...quest.data()});

  });
  const arr = [];
  tempAnswers.forEach(it => {
    arr.push(it.dataTitle);
  })
  await setAnswersList(arr);
};

  const getAllQuestions = async () => {
    setRefreshing(true);
    const questions = await getQuestions();

    // Transform Questions Data
    let tempQuestions = [];
    await questions.docs.forEach(async quest => {
      await tempQuestions.push({id: quest.id, ...quest.data()});
    });
    const filteredQuestions = tempQuestions.filter(value => !AnsweredList.includes(value.title));
    await setAllQuestions(filteredQuestions);
    setRefreshing(false)
    console.log('get questions',tempQuestions)
  };

  useEffect(() => {
    getAllQuestions();
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
          elevation: 4,
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 20, color: COLORS.black}}>DATA SET</Text>
        <Text
          style={{
            fontSize: 20,
            padding: 10,
            color: COLORS.error,
          }}
          onPress={() => signOut()}>
          Logout
        </Text>
      </View>

      {/* Quiz list */}
      <FlatList
        data={allQuestions}
        onRefresh={getAllQuestions}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{
          paddingVertical: 20,
        }}
        renderItem={({item}) => {

          return(
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
                  {item.title}
                </Text>
                {item.description != '' ? (
                  <Text style={{opacity: 0.5}}>{item.description}</Text>
                ) : null}
              </View>
             {viewInfo ===null ? <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 50,
                  backgroundColor: COLORS.primary + '20',
                }}
                onPress={() => {
                  navigation.navigate('AdditionalUserInformation', {
                    questId: item.id,
                    user:userLoggedIn,
                    dataTitle:item.title,
                    dataDescription:item.description
                  });
                }}>
                <Text style={{color: COLORS.primary}}>Play</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 50,
                  backgroundColor: COLORS.primary + '20',
                }}
                onPress={() => {
                  navigation.navigate('PlayQuestionScreen', {
                    questId: item.id,
                    user:userLoggedIn,
                    dataTitle:item.title,
                    dataDescription:item.description
                  });
                }}>
                <Text style={{color: COLORS.primary}}>Play</Text>
              </TouchableOpacity>
              }
            </View>
          )
        }}
      />

      {/* Button */}
   {/* {showButton ?  <View style={{flexDirection:'column'}}>
      <View style={{position: 'absolute', bottom: 70,right: 20,}} >
     <TouchableOpacity onPress={() => setShowButton(false)} >
       <MaterialIcons name="close-circle" size={30} color={COLORS.primary} />
       </TouchableOpacity>
       </View>
        <CreateButton
          labelText="Create DataSet"
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            borderRadius: 50,
            paddingHorizontal: 30,
          }}
          handleOnPress={() => navigation.navigate('CreateQuestions',{user:userLoggedIn})}
        />
      </View> : null}  */}
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

export default HomeScreen;
