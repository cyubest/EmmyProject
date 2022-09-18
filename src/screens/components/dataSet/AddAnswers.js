import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image,Modal, ToastAndroid } from 'react-native';
import { createOptionList, createQuestions } from '../../../utils/database';
import COLORS from '../shared/colors/color';
import FormButton from '../shared/FormButton';
import FormInput from '../shared/FormInput';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ResultModal from '../modal/ResultModal';
import QuestionModal from '../modal/QuestionModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnswersData = ({ navigation, route }) => {
    const [currentDataSetId, setCurrentQuestionId] = useState(route.params.currentDataSetId);
    const [currentQuestionTitle, setCurrentQuestionTitle] = useState(route.params.currentDataSetTitle);

    console.log(currentDataSetId,'currentDataSetId now');

    const [question, setQuestion] = useState('');
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    const [optionThree, setOptionThree] = useState('');
    const [optionFour, setOptionFour] = useState('');
    const [otherInfo, setOtherInfo] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [errorMessage, setErrorMessage] = useState('Please enter the question');
    const [modalVisible,setModalVisible]=useState(false);
    const [isResultModalVisible, setIsResultModalVisible] = useState(false);
    const [currentQuestionIdSaved, setCurrentQuestionIdSaved] = useState();
    const [userLoggedIn,setUserLoggedIn]=useState(null);

    useEffect(() => {
        getLoggedUser();
      }, [])
      
      const getLoggedUser = async () => {
      const user = await AsyncStorage.getItem('user')
      setUserLoggedIn(user);
     }
 

    const handleQuestionSave = async () => {
        if (
            question == ''
        ) {
            return setErrorMessage('Please enter the question');
        }

        let currentQuestionId = Math.floor(
            100000 + Math.random() * 9000,
        ).toString();

        // Save to question firestore
        setCurrentQuestionIdSaved(currentQuestionId);
    
        await createQuestions(currentDataSetId, currentQuestionId, {
            question: question,
            options:[optionOne,optionTwo, optionThree, optionFour]
        });
        ToastAndroid.show('Question saved', ToastAndroid.SHORT);

        //Show modal for some optionList
        // setModalVisible(!modalVisible)

        // Reset
        setQuestion('');
        setOptionOne('');
        setOptionTwo('');
        setOptionThree('');
        setOptionFour('');
    };

     
    const handleOptionOneSave = async () => {

        if (optionOne == '') {
            return setErrorMessage('Please enter the option');
        }

        let currAnswerId = Math.floor(
            100000 + Math.random() * 9000,
        ).toString();

        // Save to option firestore
        await createOptionList(currentDataSetId, currentQuestionIdSaved,currAnswerId, {
            answer: optionOne,
            addedInfo: otherInfo,
        });

        // Reset
        setOptionOne('');
        // setIsResultModalVisible(true)
    };

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
            }}>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                }}>
                <View style={{ padding: 20 }}>
                    <Text
                        style={{ fontSize: 20, textAlign: 'center', color: COLORS.black }}>
                        Add Question
                    </Text>
                    <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                        For {currentQuestionTitle}
                    </Text>

              
                 <FormInput
                        labelText="Question"
                        placeholderText="enter question"
                        onChangeText={val => setQuestion(val)}
                        value={question}
                    />
               { 
                  errorMessage.length > 0 ?  <Text style={{ textAlign: 'center',color:'red'}}>{errorMessage}</Text>:null
               }
                    {/* Image upload */}

                    {/* {imageUri == '' ? (
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 28,
                                backgroundColor: COLORS.primary + '20',
                            }}
                            onPress={selectImage}>
                            <Text style={{ opacity: 0.5, color: COLORS.primary }}>
                                + add image
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <Image
                            source={{
                                uri: imageUri,
                            }}
                            resizeMode={'cover'}
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 5,
                            }}
                        />
                    )} */}


                    {/* Options */}
                    <View style={{ marginTop: 30 }}>
                        <FormInput
                            labelText="Option 1"
                            onChangeText={val => setOptionOne(val)}
                            value={optionOne}
                        />
                        <FormInput
                            labelText="Option 2"
                            onChangeText={val => setOptionTwo(val)}
                            value={optionTwo}
                        />
                        <FormInput
                            labelText="Option 3"
                            onChangeText={val => setOptionThree(val)}
                            value={optionThree}
                        />
                        <FormInput
                            labelText="Option 4"
                            onChangeText={val => setOptionFour(val)}
                            value={optionFour}
                        />
                    </View>
                    <FormButton
                        labelText="Save Question"
                        handleOnPress={() => handleQuestionSave()}
                    />
                    <FormButton
                        labelText="Done & Go Home" 
                        isPrimary={false}
                        handleOnPress={() => {
                            setCurrentQuestionId('');
                            navigation.navigate('DashBoard');
                        }}
                        style={{
                            marginVertical: 20,
                        }}
                    />
                </View>
              
            </ScrollView>
            <Modal
                    visible={modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                    transparent={true}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            top: 10,
                            right: 0,
                            position: 'absolute'
                            }}>
                            <AntDesign name="closecircle"  size={29} />
                        </TouchableOpacity>
                        <Text
                            style={{
                            fontSize: 16,
                            fontWeight: '700',
                            textAlign: 'left',
                            marginRight:10
                            }}>
                            Add choices of the above added question 
                        </Text>
                        <View style={{marginTop:20}}>
                        <FormInput
                            labelText="Option"
                            onChangeText={val => setOptionOne(val)}
                            value={optionOne}
                        />
                        </View>
                        <FormButton
                        labelText="Save Option"
                        handleOnPress={() =>  handleOptionOneSave()}
                    />
                        </View>
                        
                    </View>
                </Modal>
                <QuestionModal
                    isModalVisible={isResultModalVisible}
                    handleOnClose={() => {
                    setIsResultModalVisible(false);
                    }}
                    handleHome={() => {
                    setIsResultModalVisible(false);
                    setModalVisible(false);
                    setOptionOne('');
                    }}
                    goHome={() => navigation.navigate('DashBoard')}
                />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: COLORS.black + '90',
      },
      modalView: {
        marginTop: 50,
        width: '95%',
        minHeight: '35%',
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
});


export default AnswersData;
