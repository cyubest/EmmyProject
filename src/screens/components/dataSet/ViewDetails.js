import {   View,
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    ToastAndroid
   } from 'react-native'
  import React, { useContext, useEffect, useState } from 'react'
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import COLORS from '../shared/colors/color';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import SuccessModal from '../../../constants/SuccessModal';
  
  const successM ="Thank you for your answers";
  
   const  ViewDetails = ({navigation,route}) =>{
       const [answers, setAnswers] = useState(route?.params?.answers);
       const [dataTitle, setDataTitle] = useState(route?.params?.dataTitle);
       const [title, setTitle] = useState('');
       const [questions,setQuestions] = useState([]);
       const [selectedAnswer,setSelectedAnswer] = useState([]);
       const [userLoggedIn,setUserLoggedIn] = useState(null);
       const [first, setFirst] = useState(0);
       const [selectedOption,setSelectedOption]= useState([]);
       const [isSucceModalVisible, setIsSucceModalVisible] = useState(false);
       const [loading,setLoading]= useState(false)
  
       console.log(JSON.stringify(answers,0,2),'hhdhsdhsd')
  
       useEffect(() => {
        if(isSucceModalVisible){
            setTimeout(() => {
                setIsSucceModalVisible(false);
            }, 3000);
        }
    }, [isSucceModalVisible]);
  
       useEffect(() => {
         getLoggedUser();
         
       }, [])
       
     
       
       
       const getLoggedUser = async () => {
       const user = await AsyncStorage.getItem('user')
       setUserLoggedIn(user);
      }
       
      const [data, setData] = React.useState({
        text: '',
        isRequired: '',
        })
        const textInputChange = val => {
            setData({
                ...data,
                text: val,
            });
        };

    const getSelected = (option) => selectedOption.includes(option);
 
    
 
  
    return (
      <SafeAreaView
        style={{
          flex: 1,
          position: 'relative',
        }}>
        <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
        {/* Top Bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: COLORS.white,
            elevation: 4,
          }}>
          {/* Back Icon */}
          <MaterialIcons
            name="arrow-back"
            size={24}
            onPress={() => navigation.goBack()}
          />
  
          {/* Title */}
          <Text style={{fontSize: 16,justifyContent:'center',marginRight:100,fontWeight:'bold'}}>{dataTitle}</Text>
  
          {/* Correct and incorrect count */}
          
  
            {/* Incorrect */}
         
        
        </View>
  
        {/* Questions and Options list */}
        <FlatList
          data={answers?.selectedAnswer}
          style={{
            flex: 1,
            backgroundColor: COLORS.background,
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.question}
          renderItem={({item, index}) => {
            const answersFiltered = item?.selectedOption?.filter(value => item?.options.includes(value)) 
            console.log(answersFiltered,'hu hdavshad')
            return (
              <View
                style={{
                  marginTop: 14,
                  marginHorizontal: 10,
                  backgroundColor: COLORS.white,
                  elevation: 2,
                  borderRadius: 2,
                }}>
              <TouchableOpacity onPress={()=>ViewAnswered(item)}>
                <View style={{padding: 20}}>
                  <Text style={{fontSize: 16}}>
                    {index + 1}. {item.question}
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                  <Text style={{color:COLORS.black,fontWeight:'bold',paddingLeft:15}}>Selected Solution :</Text>
              </View>
                {/* Options */}
                
                {answersFiltered?.map((option,optionIndex) => {
                  return (
                    <TouchableOpacity
                      style={{
                        paddingVertical: 14,
                        paddingHorizontal: 20,
                        borderTopWidth: 1,
                        borderColor: COLORS.border,
                        backgroundColor: '',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}
                      onPress={() => {
                       
                      }}>
                      <Text
                        style={{
                          width: 25,
                          height: 25,
                          padding: 2,
                          borderWidth: 1,
                          borderColor: COLORS.border,
                          textAlign: 'center',
                          marginRight: 16,
                          borderRadius: 25,
                         
                        }}>
                        {optionIndex + 1}
                      </Text>
                     
                      <Text style={{color: 'black',marginLeft:10}}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )
          }}
         
        
  
        />
  
        {/* Result Modal */}
        <SuccessModal
                      isModalVisible={isSucceModalVisible}
                      successMessage={successM}
                      handleOnClose={() => {
                      setIsSucceModalVisible(false);
                      }}
                  />
      </SafeAreaView>
    )
  }
  
  export default ViewDetails;
  
  const styles = StyleSheet.create({
    textViewStyle: {
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 4,
      marginBottom:15,
      borderColor: 'gray',
      alignSelf: 'center',
      marginRight: 17,
      width: '90%'
  },
  textInside: {
      fontSize: 10,
      color: 'gray',
      textAlign: 'right'
  },
  textInPutStyle: {
    width: '100%',
    height: 90,
    textAlign: 'left',
    textAlignVertical: "top"
  },
  })