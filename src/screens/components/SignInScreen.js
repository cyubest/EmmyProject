import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, StatusBar, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from './shared/colors/color';
import STYLES from './shared/styles';
import logos from '../../assets/logos';
import { signIn } from '../../utils/auth';
import auth from '@react-native-firebase/auth';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const [emailError,setEmailError] = useState('')
    const [credentialsError,setCredentialsError] = useState('');

    const handleOnSubmit = () => {
        if (email != '' && password != '') {
            setLoading(true)
            auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                setLoading(false)
                ToastAndroid.show('Logged In', ToastAndroid.SHORT);
            })
            .catch(error => {   
                switch(error.code) {
                  case 'auth/invalid-email':
                        setEmailError('The email address is badly formatted')
                        setLoading(false)
                        break;
                  case 'auth/wrong-password':
                        setCredentialsError('Email or Password is incorrect')
                        setLoading(false)
                        break;
                  case 'auth/user-not-found':
                        setCredentialsError('Email or Password is incorrect')
                        setLoading(false)
                        break
                  default:
                        setLoading(false)
                        break
               }
             })
        }
    }
    return (
        <SafeAreaView
            style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.dark }}>
                        STAT
                    </Text>
                    <Text
                        style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.secondary }}>
                        INFO
                    </Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}>
                        Welcome Back,
                    </Text>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: COLORS.light }}>
                        Sign in to continue
                    </Text>
                </View>

                <View style={{ marginTop: 80 }}>
                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="mail-outline"
                            color={COLORS.light}
                            size={20}
                            style={STYLES.inputIcon}
                        />
                        <TextInput
                            placeholder="Email"
                            style={STYLES.input}
                            onChangeText={(value) => setEmail(value)}
                            keyboardType={'email-address'}
                        />
                    </View>
                    {emailError.length >0 ? <Text style={{color:'red',textAlign:'center'}}>{emailError}</Text> :null}
                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="lock-outline"
                            color={COLORS.light}
                            size={20}
                            style={STYLES.inputIcon}
                        />
                        <TextInput
                            placeholder="Password"
                            style={STYLES.input}
                            secureTextEntry
                            onChangeText={(value) => setPassword(value)}
                        />
                    </View>
                    {credentialsError.length >0 ? <Text style={{color:'red',textAlign:'center'}}>{credentialsError}</Text> :null}
                    <TouchableOpacity onPress={() => handleOnSubmit()}  disabled={loading}>
                        <View style={[STYLES.btnPrimary,{flexDirection:'row'}]}>
                        {loading? <ActivityIndicator size='small' style={{alignSelf:'center'}} color="white"/> :null}
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                Sign In
                            </Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginTop: 40,
                        marginBottom: 20,
                    }}>
                    <Text style={{ color: COLORS.light, fontWeight: 'bold' }}>
                        Don`t have an account ?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                        <Text style={{ color: COLORS.pink, fontWeight: 'bold' }}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignInScreen;