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
import { addAnswerForQuestion, getAnswersByQuestionId, getDataSetById, getQuestionsByDataId } from '../../../utils/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../shared/colors/color';
import FormButton from '../shared/FormButton';
import ResultModal from '../modal/ResultModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import SuccessModal from '../../../constants/SuccessModal';


const successM ="Thank you for your answers";

 const  PlayQuestionScreen = ({navigation,route}) =>{
     let today = new Date();
     const [currentQuestionId, setCurrentQuestionId] = useState(route?.params?.questId);
     const [dataTitle,setDataTitle]= useState(route?.params?.dataTitle);
     const [dataDescription,setDataDescription]= useState(route?.params?.dataDescription)
     const [currentUserLogin, setCurrentUserLogin] = useState(route?.params?.user);
     const [title, setTitle] = useState('');
     const [questions,setQuestions] = useState([]);
     const [isResultModalVisible, setIsResultModalVisible] = useState(false);
     const [selectedAnswer,setSelectedAnswer] = useState([]);
     const [userLoggedIn,setUserLoggedIn] = useState(null);
     const [first, setFirst] = useState(0);
     const [selectedOption,setSelectedOption]= useState([]);
     const[created_on,setCreated_on] = useState(moment(today).format('MMMM Do YYYY, h:mm:ss a'));
     const [isSucceModalVisible, setIsSucceModalVisible] = useState(false);
     const [loading,setLoading]= useState(false)

     console.log(dataTitle,dataDescription,'hhdhsdhsd')

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
  
  const selectQuestion  = (option,optionIndex)=>{
    questions.map((item,index)=>{
      if(selectedAnswer.includes(option)){
       const newArray = item.options.filter(indexId => indexId !== option)   
       return  setSelectedAnswer(newArray)
      }
      setSelectedAnswer([...selectedAnswer])
      console.log(selectedAnswer)
    })
  }
  const getSelected = (option) => selectedOption.includes(option);
  
  const handleSelectAnswer = async() => {
    let currentAnswerId = Math.floor(
      100000 + Math.random() * 9000,
  ).toString();

  // Save to answer to the firestore
  setLoading(true)
  await addAnswerForQuestion(currentAnswerId,selectedAnswer,dataTitle,dataDescription,created_on,userLoggedIn, {
    selectedAnswer,
    created_on,
    dataTitle,
    dataDescription,
    userLoggedIn
  });
  // ToastAndroid.show('Answer saved', ToastAndroid.SHORT);

      // console.log(JSON.stringify(selectedAnswer,0,2),'newAnswers list of selected')
      console.log(selectedAnswer,'what is selected')
      setLoading(false)
      setIsSucceModalVisible(true);
      navigation.navigate('HomeScreen')
  }
  
  const getQuizAndQuestionDetails = async () => {
    // Get Quiz
    let currentQuiz = await getDataSetById(currentQuestionId);
    currentQuiz = currentQuiz.data();
    setTitle(currentQuiz.title);

    // Get Questions for current quiz
    const questions = await getQuestionsByDataId(currentQuestionId);
    console.log(questions)
    // Transform and shuffle options
    let tempQuestions = [];
    await questions.docs.forEach(async res => {
      let question = res.data();
      
      console.log(JSON.stringify( question,0,2),'ref sus')
      // Create Single array of all options and shuffle it
      // question.allOptions = shuffleArray([
      //   ...question.incorrect_answers,
      //   question.correct_answer,
      // ]);
      await tempQuestions.push(question);
      console.log(questions)
    });

    setQuestions([...tempQuestions]);
  };

  useEffect(() => {
    getQuizAndQuestionDetails();
  },[]);

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
        <Text style={{fontSize: 16}}>{title}</Text>

        {/* Correct and incorrect count */}
        

          {/* Incorrect */}
       
      
      </View>

      {/* Questions and Options list */}
      <FlatList
        data={questions}
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.question}
        renderItem={({item, index}) => (
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 10,
              backgroundColor: COLORS.white,
              elevation: 2,
              borderRadius: 2,
            }}>
            <View style={{padding: 20}}>
              <Text style={{fontSize: 16}}>
                {index + 1}. {item.question}
              </Text>
            </View>
            {/* Options */}
            {item.options.map((option, optionIndex) => {
              return (
                <TouchableOpacity
                  key={optionIndex}
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
                    // Increase correct/incorrect count
                    // if (option == item.correct_answer) {
                    //   setCorrectCount(correctCount + 1);
                    // } else {
                    //   setIncorrectCount(incorrectCount + 1);
                    // }
                    // selectQuestion(option,optionIndex);
                    // if(option[optionIndex] == optionIndex ){
                    //   setQuestions([...option])
                    // }
                    const optionExist = selectedOption.find(item =>{
                      return item === option;
                    })
                   if(optionExist){
                    selectedOption.splice(option)
                    return false
                   }

                    selectedOption.push(option);
                    let tempQuestions = [...questions];
                    tempQuestions[index].selectedOption = selectedOption;
                    setQuestions([...tempQuestions]);
                    console.log(JSON.stringify(questions,0,2))
                    setSelectedAnswer(questions)
                  }}>
                  {/* <Text
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
                  </Text> */}
                  <MaterialCommunityIcon name='checkbox-blank-circle-outline' size={20} color={COLORS.primary}/>
                  {getSelected(option) && <View style={{ position: 'absolute',
                    width: '100%',
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    top: 0,
                    left: 0}} />}
                  <Text style={{color: 'black',marginLeft:10}}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
       
      

        ListFooterComponent={() => (
          <FormButton
            labelText="Submit"
            style={{margin: 10}}
            loading={loading}
            handleOnPress={() => {
              handleSelectAnswer();
            }}
          />
        )}
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

export default PlayQuestionScreen;

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