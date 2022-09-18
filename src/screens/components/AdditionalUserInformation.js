import React from 'react'
import { Button, View,Text, TouchableOpacity} from 'react-native';
import { Formik } from 'formik';
import { TextInput as Input } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import COLORS from './shared/colors/color';
import * as yup from 'yup';
import { addPersonalInformation } from '../../utils/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
const added ='done';

export default function AdditionalUserInformation({navigation,route}) {
  const {user,questId,dataTitle,dataDescription} = route.params;
  const [value, setValue] = React.useState('Male');

  const confirmAddedInfo = async() =>{
    await AsyncStorage.setItem('done',added)
  }


  return (
    <ScrollView>
    <View>
        <Formik

        initialValues={{ 
          fullName:'',
          age:0,
          address:'',
          gender:value,
          occupation:''
        }}

        onSubmit={async(values) => {
          let currentPersonalId = Math.floor(
            100000 + Math.random() * 9000,
        ).toString();
    
        // Save to option firestore
        await addPersonalInformation(currentPersonalId, values.fullName,values.age,values.address,values.gender,values.occupation,user);
        // console.log('now now',currentPersonalId, values.fullName,values.age,values.address,values.gender,values.occupation,user)
        confirmAddedInfo()
        navigation.navigate('PlayQuestionScreen', {
          questId: questId,
          user:user,
          dataDescription:dataDescription,
          dataTitle:dataTitle
        });
        }}
        validationSchema={yup.object().shape({
          fullName: yup.string().required('fullName is required'),
          address: yup.string().required('Address is required'),
          age:yup.number().required('Age is required')
        })}

        >

        {({ handleChange, handleBlur, handleSubmit, values }) => (

        <View style={{width:'90%',alignSelf:'center'}}>
           <View>
            <Text style={{fontWeight:'bold',textAlign:'center',fontSize:20}}>Please fill your personal information </Text>
           </View>
           <View style={{marginTop:20}}>
            <Input
              label="Full Name"
              mode="outlined"
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              style={{top:28}}
              />
            <Input
              label="Age"
              mode="outlined"
              keyboardType = 'number-pad'
              value={values.age}
              onChangeText={handleChange('age')}
              style={{top:38}}
              />
            <Input
              label="address"
              mode="outlined"
              value={values.address}
              onChangeText={handleChange('address')}
              style={{top:48}}
              />
            <View style={{top:60}}>
              <Text>Choose Your Gender</Text>
            </View>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
            <View style={{flexDirection:'row',top:70}}>
            <View>
              <Text>Male</Text>
              <RadioButton value="Male" />
            </View>
            <View style={{paddingLeft:40}}>
              <Text>Female</Text>
              <RadioButton value="Female" />
            </View>
            </View>
          </RadioButton.Group>
          <Input
              label="Your occupation"
              mode="outlined"
              onChangeText={handleChange('occupation')}
              style={{top:88}}
              />
            </View>
         <View style={{marginTop:102}}>
            <TouchableOpacity onPress={handleSubmit} 
            mode='Outlined'
            title="Submit" 
            style={{
                paddingVertical: 10,
                backgroundColor: COLORS.primary,
                borderWidth: 1,
                height:50,
                borderColor: COLORS.primary,
                borderRadius: 5 }}>
                  <Text style={{textAlign:'center',fontSize:20,color:COLORS.white}}>Submit</Text>
                </TouchableOpacity>
            </View>
         </View>

        )}

        </Formik>
    </View>
    </ScrollView>
  )
}
