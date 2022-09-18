import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AnswersData, CreateDataSets, HomeScreen, PlayQuestionScreen } from '../components';
import DashboardHome from '../components/dashBoard/DashboardHome';
import AdditionalUserInformation from '../components/AdditionalUserInformation';
import AnsweredList from '../components/dashBoard/AnsweredList';


const Stack = createStackNavigator();

const MainAppNavigators = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CreateQuestions" component={CreateDataSets} />
            <Stack.Screen name="AddQuestion" component={AnswersData} />
            <Stack.Screen name="PlayQuestionScreen" component={PlayQuestionScreen}/>
            <Stack.Screen name="AdditionalUserInformation" component={AdditionalUserInformation}/>
           
        </Stack.Navigator>
    );
}

export default MainAppNavigators;