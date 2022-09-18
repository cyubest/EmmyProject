import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, Alert, StatusBar, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from './shared/colors/color';
import STYLES from './shared/styles';
import logos from '../../assets/logos';
import { signup } from '../../utils/auth';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native-paper';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const [credentialsError,setCredentialsError] = useState('');


    const handleOnSubmit = () => {
        if (email != '' && password != '' && confirmPassword) {
            if (password === confirmPassword) {
                setLoading(true)
                auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    setLoading(false)
                    ToastAndroid.show('Logged In', ToastAndroid.SHORT);
                })
                .catch(error => {   
                    switch(error.code) {
                      case 'auth/weak-password':
                            setCredentialsError('Email or Password is incorrect')
                            setLoading(false)
                            break;
                      default:
                            setLoading(false)
                            break
                   }
                 })
        

       
    }
}
    }
    return (
        <SafeAreaView
            style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.dark }}>
                        STAT
                    </Text>
                    <Text
                        style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.secondary }}>
                        INFO
                    </Text>
                </View>
                <View style={{ marginTop: 50 }}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}>
                        Welcome Back,
                    </Text>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: COLORS.light }}>
                        Sign up to continue
                    </Text>
                </View>
                <View style={{ marginTop: 50 }}>
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
                            value={email}
                        />
                    </View>
                    
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
                            onChangeText={(value) => setPassword(value)}
                            value={password}
                            secureTextEntry
                        />
                    </View>
                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="lock-outline"
                            color={COLORS.light}
                            size={20}
                            style={STYLES.inputIcon}
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            style={STYLES.input}
                            onChangeText={(value) => setConfirmPassword(value)}
                            value={confirmPassword}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity onPress={() => handleOnSubmit()}>
                        <View style={STYLES.btnPrimary}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                Sign Up
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {credentialsError.length >0 ? <Text style={{color:'red',textAlign:'center'}}>{credentialsError}</Text> :null}
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginTop: 20,
                        marginBottom: 20,
                    }}>
                    <Text style={{ color: COLORS.light, fontWeight: 'bold' }}>
                        Already have an account ?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{flexDirection:'row'}}>
                    {loading? <ActivityIndicator size='small' style={{alignSelf:'center'}} color="white"/> :null}
                        <Text style={{ color: COLORS.pink, fontWeight: 'bold' }}>
                            Sign in
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUpScreen;
