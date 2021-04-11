import React from 'react'
import { Text, TextInput, View, TouchableOpacity, Touchable, Alert,Button } from 'react-native'
import { styles } from '../styles/global'
//import {Button} from 'react-native-paper'


export default function jobseeker() {

    function pressHandler() {
        Alert.alert('hello')
    }

    return (
        <View style={styles.container}>
            <Text> Job Seeker</Text> 
        </View>
    )
}
