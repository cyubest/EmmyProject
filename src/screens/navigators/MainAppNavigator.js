import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AnswersData, CreateDataSets, HomeScreen, PlayQuestionScreen } from '../components';
import DashboardHome from '../components/dashBoard/DashboardHome';
import AdditionalUserInformation from '../components/AdditionalUserInformation';


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
            <Stack.Screen name="DashBoard" component={DashboardHome} options={{
                headerShown: true,
                headerTitle: 'DashBoard',
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingLeft: 80,
                },
                headerStyle: {
                    backgroundColor: '#fff',
                },
            }} 
                />
        </Stack.Navigator>
    );
}

export default MainAppNavigators;