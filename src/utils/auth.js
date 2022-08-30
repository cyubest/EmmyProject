import auth from '@react-native-firebase/auth';
import { ToastAndroid, ActivityIndicator } from 'react-native';

export const signIn = (email, password) => {
    auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            ToastAndroid.show('Logged In', ToastAndroid.SHORT);
        })
        .catch(err => {
            ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
}

export const signup = (email, password) => {
    auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            ToastAndroid.show('Signed Up', ToastAndroid.SHORT)
        })
        .catch(err => {
            console.log(err)
        })
}

export const signOut = () => {
    auth().signOut().then(() => {
        ToastAndroid.show('Signed Out', ToastAndroid.SHORT)
    })
}