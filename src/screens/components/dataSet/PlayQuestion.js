import {   View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert
 } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getAnswersByQuestionId, getDataSetById, getQuestionsByDataId } from '../../../utils/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../shared/colors/color';
import FormButton from '../shared/FormButton';
import ResultModal from '../modal/ResultModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

 const  PlayQuestionScreen = ({navigation,route}) =>{
     const [currentQuestionId, setCurrentQuestionId] = useState(route.params.questId);
     const [title, setTitle] = useState('');
     const [questions,setQuestions] = useState([]);
     const [isResultModalVisible, setIsResultModalVisible] = useState(false);
     const [selectedAnswer,setSelectedAnswer] = useState([]);
     const [allQuestion,setAllQuestion] = useState([]);
     const [subQuestList,setSubQuestList] = useState([]);
     const [userLoggedIn,setUserLoggedIn] = useState(null);
     const [showAllOption,setShowAllOption] = useState(true);
     const [hideAllOption,setHideAllOption] = useState(false);
     const [first, setFirst] = useState(0);
     const [selectedItem, setSelectedItem] = useState(0);
     const [itemValue, setItemValue] = useState(0);
   

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

    const handlePress = (option) => {
      if (selectedAnswer.includes(option.index)) {
          const newAnswers = selectedAnswer.filter(itemId => itemId !== option.index)
          return setSelectedAnswer(newAnswers)
      }
      setSelectedAnswer([...selectedAnswer,option])
      console.log(selectedAnswer, 'item');
  }

  const handleSelectAnswer = () => {
    const payload = {
      
    }
      console.log(JSON.stringify(selectedAnswer,0,2),'newAnswers list of selected')
  }


 
  const deselectItems = () => setSelectedItems([]);

     const getAllDataSetAndQuestions = async() =>{
        //  get DataSet
        let currentDataSet =  await getDataSetById(currentQuestionId)
        currentDataSet = currentDataSet.data();
        setTitle(currentDataSet.title);
        //  Get questions for current DataSet
        const questions = await getQuestionsByDataId(currentQuestionId)

        console.log(currentDataSet,'currentDataSet now');
       
        // Transform and shuffle options
        let tempQuestions = [];
       
        await questions.docs.forEach(async res=>{
          let question = res.data();
          await tempQuestions.push({id: res.id, ...res.data()});
          
          // // Create Single array of all options and shuffle it
          // question.options = shuffleArray([
          //   ...question.options,
          // ]);
         
          await setAllQuestion([...tempQuestions])
        });

        setQuestions([...tempQuestions]);
     };
    useEffect(() => {
     getAllDataSetAndQuestions();
    }, [])

   const  getSubQuestionsList = async(item) =>{
    if(showAllOption){
      setShowAllOption(false);
      setHideAllOption(true);
    }else{
      setShowAllOption(true);
      setHideAllOption(false);
    }
    const subQuestionsList = await getAnswersByQuestionId(currentQuestionId,item.id)

    // console.log(subQuestionsList,'subQuestions list');
    
    let tempSubQuestionsList = [];
    await subQuestionsList.docs.forEach(async res=>{
      let question = res.data();
      await tempSubQuestionsList.push({id: res.id, ...res.data()});
      
      // // Create Single array of all options and shuffle it
      // question.options = shuffleArray([
      //   ...question.options,
      // ]);

      console.log(res,'subQuestions');
     
      await setSubQuestList([...tempSubQuestionsList])
    });
    console.log(tempSubQuestionsList,'tempSubQuestionsList');
   }

   const handleSelectOption = (item) => {
    if (subQuestList.includes(item.id)) {
        const listSelected = subQuestList.filter((itemId) => itemId !== item.id);
        return setSelectedAnswer(listSelected);
      }
      setSelectedAnswer([...selectedAnswer, item.id]);
      setItem(item.id)
      console.log(selectedAnswer, 'item of all selected answer');
    }

    const getSelected = (item) => selectedAnswer.includes(item.id);
     
    const setItem = (item) => {
      setItemValue(item)
    }
  
  
  
    const getSelectedItem = (item) => {
      setAvatar(item)
      setSelectedItem({
        selectedItem: item
      })
      console.log(itemValue)
    }
  

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
          elevation: 4,
        }}>
        {/* Back Icon */}
        <MaterialIcons
          name="arrow-back"
          size={24}
          onPress={() => navigation.goBack()}
        />

        {/* Title */}
        <Text style={{fontSize: 16, marginLeft: 10}}>{title}</Text>

        {/* Correct and incorrect count */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* Correct */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <MaterialIcons
              name="check"
              size={14}
              style={{color: COLORS.white}}
            />
            <Text style={{color: COLORS.white, marginLeft: 6}}>
              
            </Text>
          </View>

          {/* Incorrect */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <MaterialIcons
              name="close"
              size={14}
              style={{color: COLORS.white}}
            />
            <Text style={{color: COLORS.white, marginLeft: 6}}>
              
            </Text>
          </View>
        </View>
      </View>

      {/* Questions and Options list */}
      <FlatList
        data={allQuestion}
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
              // backgroundColor: COLORS.white,
              elevation: 2,
              borderRadius: 2,
            }}>

            <TouchableOpacity style={{padding: 20,}} onPress={()=>{
              getSubQuestionsList(item);
              setFirst(first === index ? null : index)
            }}>
              <View style={{flexDirection:'row'}}>
              <Text style={{fontSize: 16}}>
                {index + 1}. {item.question} 
              </Text>
               <TouchableOpacity onPress={()=>getSubQuestionsList(item)}>
             {showAllOption ?<AntDesign 
                  name="right"
                  size={16}
                  style={{marginLeft:0,top:5}}
                  color={COLORS.primary}
                />:
                <AntDesign
                name="down"
                size={16}
                style={{marginLeft:0,top:6}}
                color={COLORS.primary}
                />
                }
                 {/* <AntDesign name={showAllOption && first === index ? 'right': 'down'} size={16} style={{marginLeft:0,top:6}} color={COLORS.primary} /> */}
               </TouchableOpacity>
              
              
              </View>
              <View>
                {hideAllOption ?
                    subQuestList.map((item,index)=>{
                      return(
                      <TouchableOpacity
                      key={index}
                      style={{
                        paddingVertical: 14,
                        paddingHorizontal: 20,
                        backgroundColor: COLORS.green,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}
                      onPress={()=>
                        handleSelectOption(item)
                      }>
                      <Text
                        style={{
                          width: 25,
                          height: 25,
                          padding: 2,
                          borderWidth: 1,
                          textAlign: 'center',
                          marginRight: 16,
                          borderRadius: 25,
                          
                        }}>
                         
                        {getSelected(item) && <AntDesign name="check" size={29} color={COLORS.primary} style={{fontWeight:'bold'}}/>}  
                      </Text>
                      <Text style={{color:COLORS.black}}>
                        {item.answer}
                      </Text>
                    </TouchableOpacity>
                    )}):null
                }
               </View>
            </TouchableOpacity>
            {/* Options */}
            {/* {item.options.map((option, optionIndex) => {
              return (
                <TouchableOpacity
                  key={optionIndex}
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    borderTopWidth: 1,
                    // borderColor: COLORS.border,
                    backgroundColor: getOptionBgColor(item, option),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                  onPress={() => {
                  handlePress(optionIndex)
                  }}>
                  <Text
                    style={{
                      width: 25,
                      height: 25,
                      padding: 2,
                      borderWidth: 1,
                      // borderColor: COLORS.border,
                      textAlign: 'center',
                      marginRight: 16,
                      borderRadius: 25,
                      color: getOptionTextColor(item, option),
                    }}>
                    
                  </Text>
                  <Text style={{color: getOptionBgColor(item, option)}}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })} */}
              <View  style={{ marginTop:3}}>
              <Text style={{fontSize: 16,color:'black',marginLeft:12}}>
                     Additional Information 
                    </Text>
                    <View style={styles.textViewStyle}>
                    <TextInput 
                       placeholder="Write few words about...."
                       maxLength={140}
                       multiline={true}
                       autoCapitalize="none"
                       onChangeText={val => textInputChange(val)}
                       value={data.text}
                       underlineColorAndroid="transparent"
                       style={styles.textInPutStyle}
                    />
                       <Text style={styles.textInside}>
                            {data.text.length}/140 Characters
                        </Text>
                    </View>
                  </View>
          </View>
        )}
        ListFooterComponent={() => (
          <FormButton
            labelText="Submit"
            style={{margin: 10}}
            handleOnPress={() => {
              handleSelectAnswer();
            }}
          />
        )}
      />

      {/* Result Modal */}
      <ResultModal
        isModalVisible={isResultModalVisible}
        handleOnClose={() => {
          setIsResultModalVisible(false);
        }}
        handleRetry={() => {
          getQuizAndQuestionDetails();
          setIsResultModalVisible(false);
        }}
        handleHome={() => {
          navigation.goBack();
          setIsResultModalVisible(false);
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