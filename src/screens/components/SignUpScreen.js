import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, Alert, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import COLORS from './shared/colors/color';
import STYLES from './shared/styles';
import logos from '../../assets/logos';
import { signup } from '../../utils/auth';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOnSubmit = () => {
        if (email != '' && password != '' && confirmPassword) {
            if (password === confirmPassword) {
                signup(email, password);
            } else {
                Alert.alert('password did not match')
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
                        <Text style={{ color: COLORS.pink, fontWeight: 'bold' }}>
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUpScreen;
