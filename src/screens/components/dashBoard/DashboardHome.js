import { View, Text, ScrollView, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import React from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import COLORS from '../shared/colors/color';

export default function DashboardHome() {

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
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };

  const datas = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
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

  return (
<SafeAreaView style={{flex: 1}}>
<ScrollView >

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{width:130,backgroundColor:'white',height:150,borderRadius:20}}>
          <View style={{width: 80,height: 80,borderRadius: 80 / 2,backgroundColor: '#fff',alignSelf:'center',top:30,borderWidth:1,borderColor:COLORS.primary}}>
            <Text style={{position:'absolute',alignSelf:'center',top:10,fontSize:40}}>5</Text>
          </View>
        </View>
        <View style={{width:130,backgroundColor:'white',height:150,borderRadius:20}}>
        <View style={{width: 80,height: 80,borderRadius: 80 / 2,backgroundColor: '#fff',alignSelf:'center',top:30,borderWidth:1,borderColor:COLORS.primary}}>
            <Text style={{position:'absolute',alignSelf:'center',top:10,fontSize:40}}>10</Text>
          </View>
        </View>
        <View style={{width:130,backgroundColor:'white',height:150,borderRadius:20}}>
        <View style={{width: 80,height: 80,borderRadius: 80 / 2,backgroundColor: '#fff',alignSelf:'center',top:30,borderWidth:1,borderColor:COLORS.primary}}>
            <Text style={{position:'absolute',alignSelf:'center',top:10,fontSize:40}}>15</Text>
          </View>
        </View>
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
        yAxisSuffix="k"
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
    
   <PieChart
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
    />
    <View>
    </View>
</ScrollView>
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