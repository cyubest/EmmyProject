import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';

export const createDataSetsQuestion = (currentDataSetId, title, description,userId) => {
    return firestore().collection('DataSet').doc(currentDataSetId).set({
        title,
        description,
        userId
    })
}

// Create new list of questions for current Data set
export const createQuestions = (currentDataSetId, currentQuestionId, question) => {
    return firestore().collection('DataSet').doc(currentDataSetId).collection('QNA').doc(currentQuestionId).set(question)
        .then(() => {
            ToastAndroid.show('Question is saved now', ToastAndroid.SHORT);
        })
        .catch(err => {
            console.log(err)
        })

}

export const createOptionList = (currentDataSetId, currentQuestionId,currAnswerId,answer) => {
    return firestore().collection('DataSet').doc(currentDataSetId).collection('QNA').doc(currentQuestionId).collection('OptionList').doc(currAnswerId).set(answer)
        .then(() => {
            ToastAndroid.show('One optionList is  saved now', ToastAndroid.SHORT);
        }
        ).catch(err => {
            console.log(err)
        }
        )
}
// Create list of answered questions for current Data set
export const createAnsweredQuestions = (currentDataSetId, currentQuestionId, question) => {
    return firestore().collection('DataSet').doc(currentDataSetId).collection('AnsweredQNA').doc(currentQuestionId).set(question)
        .then(() => {
            ToastAndroid.show('Question saved', ToastAndroid.SHORT);
        }).catch(err => {
            console.log(err)
        }).catch(err => {
            console.log(err)
        })
}
//Get All Questions 

export const getQuestions = () =>{
    return firestore().collection('DataSet').get();
}

// Get Data Set by Id

export const getDataSetById = (currentDataId) =>{
  return  firestore().collection('DataSet').doc(currentDataId).get();
}

// Get questions by currentDataSetId

export const getQuestionsByDataId = currentDataSetId =>{
    return firestore().collection('DataSet').doc(currentDataSetId)
    .collection('QNA')
    .get();
}

// Get answers from subQuestions  by passed current questionId

export const getAnswersByQuestionId = (currentDataSetId, currentQuestionId) =>{
    return firestore().collection('DataSet').doc(currentDataSetId)
    .collection('QNA').doc(currentQuestionId)
    .collection('OptionList')
    .get();
}

export const addPersonalInformation = (currentPersonalId,fullName,age,address,gender,occupation,userId) =>{
    return firestore().collection('PersonalInformation').doc(currentPersonalId).set({
        fullName,
        age,
        address,
        gender,
        occupation,
        userId
    })
    .then(() => {
        ToastAndroid.show('User info saved now', ToastAndroid.SHORT);
    })
    .catch(err => {
        console.log(err)
    })
}