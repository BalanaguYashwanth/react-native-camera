import React from 'react'
import { Text, TextInput, View, TouchableOpacity, Touchable, Alert,Button } from 'react-native'
import { styles } from '../styles/global'
//import {Button} from 'react-native-paper'

export default function Switch({navigation}) {

    function recruiterHandler() {
        navigation.push('Recruiter')
    }
    function jobseekerHandler() {
        navigation.push('Jobseeker')
    }

    function responses()
    {
        navigation.push('Responses')
    }

    return (
        <View style={styles.container}>
            {/* <Text style={{textAlign:'center',margin:5, fontWeight:'bold'}}>  Who you are  </Text> */}
            <TouchableOpacity style={styles.button} onPress={recruiterHandler}> 
            <Text> Hire Talent </Text> 
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.button} onPress={jobseekerHandler}> 
            <Text> Job Search</Text> 
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.button} onPress={responses}> 
            <Text> Evaluator </Text> 
            </TouchableOpacity> */}
        </View>
    )
}
