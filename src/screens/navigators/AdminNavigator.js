import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AnswersData, CreateDataSets} from '../components';
import DashboardHome from '../components/dashBoard/DashboardHome';
import AnsweredList from '../components/dashBoard/AnsweredList';
import ViewDetails from '../components/dataSet/ViewDetails';
import ReportGenerate from '../components/dashBoard/ReportGenerate';


const Stack = createStackNavigator();

const AdminNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>

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
            <Stack.Screen name="CreateQuestions" component={CreateDataSets} />
            <Stack.Screen name="AddQuestion" component={AnswersData} />
            <Stack.Screen name="AnsweredList"component={AnsweredList} />
            <Stack.Screen name="ViewDetails"component={ViewDetails} />
            <Stack.Screen name="ReportGenerate" component={ReportGenerate}/>
        </Stack.Navigator>
    );
}

export default AdminNavigator;