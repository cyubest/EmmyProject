import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ToastAndroid } from 'react-native';
import { createDataSetsQuestion } from '../../../utils/database';
import COLORS from '../shared/colors/color';
import FormButton from '../shared/FormButton';
import FormInput from '../shared/FormInput';
import moment from 'moment';

const CreateDataSets = ({ navigation,route }) => {
    const {user} = route.params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorTitleMessage, setErrorTitleMessage] = useState('');
    const [errorDescriptionMessage, setErrorDescriptionMessage] = useState('');
    const[created_on,setCreated_on] = useState(moment());

    const handleQuestionsSave = async () => {

        if (title ===''  && description === '') {
            return( 
                setErrorTitleMessage('Please enter the title'),
                setErrorDescriptionMessage('Please enter the description')
            )
        } else if (title === '') {
            return setErrorTitleMessage('Please enter the title');
        } else if (description === '') {
            return setErrorDescriptionMessage('Please enter the description');
        } else {
            const currentDataSetId = Math.floor(100000 + Math.random() * 9000).toString();
            // Save to firestore
            await createDataSetsQuestion(currentDataSetId, title, description,created_on, user);
            // console.log(currentDataSetId,user, title, description,'currentDataSetId,userLoggedIn.uid, title, description');
            // Navigate to Add Question string
            navigation.navigate('AddQuestion', {
                currentDataSetId: currentDataSetId,
                currentDataSetTitle: title,
            });
    
            // Reset
            setTitle('');
            setDescription('');
            ToastAndroid.show('Data collection Saved', ToastAndroid.SHORT);
        }
     
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                padding: 20,
            }}>
            <Text
                style={{
                    fontSize: 20,
                    textAlign: 'center',
                    marginVertical: 20,
                    fontWeight: 'bold',
                    color: COLORS.black,
                }}>
                Create Data Collection
            </Text>

            <FormInput
                labelText="Title"
                placeholderText="enter reasearch title"
                onChangeText={val => setTitle(val)}
                value={title}
            />
            {errorTitleMessage.length >0 ? <Text style={{ color: 'red',marginBottom:10  }}>{errorTitleMessage}</Text> : null}
            <FormInput
                labelText="Description"
                placeholderText="Enter research questions"
                onChangeText={val => setDescription(val)}
                value={description}
            />
            {errorDescriptionMessage.length >0 ? <Text style={{ color: 'red',marginBottom:10 }}>{errorDescriptionMessage}</Text> : null}
            <FormButton labelText="Save question " handleOnPress={() => handleQuestionsSave()} />

            {/* Temporary button - navigate without saving quiz*/}
            {/* <FormButton
                labelText="Navigate to AddQuestionScreen"
                style={{
                    marginVertical: 20,
                }}
                handleOnPress={() => {
                    navigation.navigate('AddQuestion', {
                        currentDataSetId: '106692',
                        currentDataSetTitle: 'Data set',
                    });
                }}
            /> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default CreateDataSets;
