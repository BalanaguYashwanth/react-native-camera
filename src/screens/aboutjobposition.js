import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../styles/global'

export default function aboutjobposition({ navigation }) {
    return (
        <View style={{ marginTop: 100 }} >
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }} > About job position </Text>
            <View style={styles.borderbox} >
                <View style={styles.innerborderbox1} >
                </View>
            </View>

            <View style={{ margin: 20, flexDirection: 'column',}} >
                <Text style={{ marginTop: 50, marginBottom: 50 }}> What job poistion are you looking for hire? and where?  </Text>

                <TextInput style={styles.input} placeholder="Position" />

                <TextInput style={styles.input} multiline placeholder="Location" />

                <View style={{ flexDirection: 'row',flexWrap: "wrap",flex:1 }} >
                    <TouchableOpacity onPress={() => (navigation.push('Aboutcompany'))}   >
                        <Text style={{ textAlign: 'left', color: 'blue', fontWeight: 'bold' }} > {'< Back '} </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignSelf: "flex-end",flexWrap: "wrap", flex:1}}>
                    <TouchableOpacity onPress={() => (navigation.push('Switch'))}  >
                        <Text style={{ textAlign: 'right', color: 'blue', fontWeight: 'bold',  }} > {'Next >'} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    ) 
}

