import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../styles/global'

export default function aboutcompany({ navigation }) {
    return (
        <View style={{ marginTop: 100 }} >
            <Text style={{ textAlign: 'center', fontWeight:'bold' }} > About Company </Text>
            <View style={styles.borderbox} >
                <View style={styles.innerborderbox} >
                </View>
            </View>

            <View style={{ margin: 20 }} >
                <Text style={{ marginTop: 50, marginBottom: 50 }}> Tell about your company, what you do and where are your located </Text>

                <TextInput style={styles.input} placeholder="Company Name" />

                <TextInput style={styles.input} multiline placeholder="About Company" />
                

                <TouchableOpacity onPress={ () =>  (navigation.push('Aboutjobposition')) } >
                    <Text style={{ textAlign: 'right', color: 'blue', fontWeight: 'bold' }} > {'Next >'} </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


