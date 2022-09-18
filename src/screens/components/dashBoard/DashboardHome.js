import { View, Text, ScrollView, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import COLORS from '../shared/colors/color';
import CreateButton from '../shared/FormButton/CreateButton';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAB, Portal, Provider } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '../../../utils/auth';

export default function DashboardHome({navigation}) {
  const [showButton,setShowButton] = useState(true);
  const [userLoggedIn,setUserLoggedIn] = useState(null);
  const [viewInfo,setViewInfo] = useState(null);
  const [admin,setAdmin] = useState('');
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const widthAndHeight = 250
  const series = [123, 321, 123, 789, 537]
  const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
  const dataPie = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const data = {
    labels: ["Male", "Female"], // optional
    data: [0.4, 0.6]
  };

  const datas = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [3, 7, 4, 2, 1, 5]
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

 
  useEffect(() => {
    getLoggedUser();
  }, [])
  
  const getLoggedUser = async () => {
  const user = await AsyncStorage.getItem('user')
  // const adminAccount = await AsyncStorage.setItem('email')
  setUserLoggedIn(user);
  const result = await AsyncStorage.getItem('done');
  setViewInfo(result)
 }

 console.log(userLoggedIn,'userLoggedIn');

  return (
<SafeAreaView style={{backgroundColor:'white'}} >


<View style={{flexDirection:'row',justifyContent:'space-between',alignSelf:'center',backgroundColor:'white'}}>
        <View style={{width:80,backgroundColor:'white',height:80,borderRadius:20,}}>
          <View style={{width: 40,height: 40,borderRadius: 80 / 2,backgroundColor: '#fff',alignSelf:'center',top:30,borderWidth:1,borderColor:COLORS.primary,alignSelf:'center'}}>
            <Text style={{position:'absolute',alignSelf:'center',top:5,fontSize:20}}>5</Text>
          </View>
        </View>
        {/* <View style={{width:130,backgroundColor:'white',height:150,borderRadius:20}}>
        <View style={{width: 80,height: 80,borderRadius: 80 / 2,backgroundColor: '#fff',alignSelf:'center',top:30,borderWidth:1,borderColor:COLORS.primary}}>
            <Text style={{position:'absolute',alignSelf:'center',top:10,fontSize:40}}>10</Text>
          </View>
        </View>
        <View style={{width:130,backgroundColor:'white',height:150,borderRadius:20}}>
        <View style={{width: 80,height: 80,borderRadius: 80 / 2,backgroundColor: '#fff',alignSelf:'center',top:30,borderWidth:1,borderColor:COLORS.primary}}>
            <Text style={{position:'absolute',alignSelf:'center',top:10,fontSize:40}}>15</Text>
          </View>
        </View> */}
     </View>
     <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={380} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="people"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "black",
          backgroundGradientTo: "black",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignSelf:'center'
        }}
      />
    <ProgressChart
      data={data}
      width={380}
      height={220}
      strokeWidth={16}
      radius={32}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "black",
        backgroundGradientTo: "#488cfa",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
        alignSelf:'center'
      }}
      hideLegend={false}
    />
    
   {/* <PieChart
      data={dataPie}
      width={Dimensions.get("window").width}
      height={220}
      chartConfig={{
        backgroundColor: "#fff",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      accessor={"population"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      center={[10, 50]}
      absolute
    /> */}
       {/* {showButton ?  <View style={{flexDirection:'column'}}>
      <View style={{position: 'absolute', bottom: -40,right: 20,}} >
     <TouchableOpacity onPress={() => setShowButton(false)} >
       <MaterialIcons name="close-circle" size={30} color={COLORS.primary} />
       </TouchableOpacity>
       </View>
        <CreateButton
          labelText="Create DataSet"
          style={{
            position: 'absolute',
            bottom: -90,
            right: 20,
            borderRadius: 50,
            paddingHorizontal: 30,
          }}
          handleOnPress={() => navigation.navigate('CreateQuestions',{user:userLoggedIn})}
        />
      </View> : null}  */}
    <View>
    </View>
 
    <Provider   
    settings={{
     icon: props => <MaterialIcon {...props} />,
     }}>
     <Portal>
     <FAB.Group
         fabStyle={{backgroundColor:'#5d5add'}}
         open={open}
         color={COLORS.white}
         icon={open ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
         actions={[
          {
            icon: 'content-paste',
            label: 'Report',
            onPress: () => navigation.navigate('ReportGenerate',{user:userLoggedIn}),
        },
          {
            icon: 'book',
            label: 'Answers',
            onPress: () => navigation.navigate('AnsweredList',{user:userLoggedIn}),
        },
        {
             
          icon:'add',
          label: 'CreateDataSet',
          onPress: () => navigation.navigate('CreateQuestions',{user:userLoggedIn}),
      },
         {
             icon: 'logout',
             label: 'Logout',
             onPress: () =>Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                  {
                      text: 'Cancel',
                      onPress: () => {
                          return null;
                      },
                  },
                  {
                      text: 'Confirm',
                      onPress: () => {
                          signOut()
                      },
                  },
              ],
              { cancelable: false },
          ),
         },
        
         ]}
         onStateChange={onStateChange}
         onPress={() => {
         if (open) {
             // do something if the speed dial is open
         }
         }}
     />
     </Portal>
 </Provider>

</SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    margin: 10
  }
});