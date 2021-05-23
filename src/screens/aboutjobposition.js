import React,{useState} from 'react'
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { styles } from '../styles/global'
import AsyncStorage from '@react-native-community/async-storage';

export default function aboutjobposition({ navigation }) {

    const [position, setPosition] = useState()
    const [location, setLocation] = useState()

    async function save(){
        try{
            await AsyncStorage.setItem("position",position)
            await AsyncStorage.setItem("location",location)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <View style={{ marginTop: 100 }} >
            <ScrollView>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }} > About job position </Text>
            <View style={styles.borderbox} >
                <View style={styles.innerborderbox1} >
                </View>
            </View>

            <View style={{ margin: 20, flexDirection: 'column',flex:1}} >
                <Text style={{ marginTop: 50, marginBottom: 50 }}> What job postion are you looking for hire? and where?  </Text>

                <TextInput style={styles.input} onChangeText={ (val) => setPosition(val)} placeholder="Position" />

                <TextInput style={styles.input} onChangeText={ (val) => setLocation(val)  }  multiline placeholder="Location" />

                <View style={{ flexDirection: 'row',flex:1, justifyContent:'space-between' }} >
                    <TouchableOpacity onPress={() => (navigation.push('Aboutcompany'))}   >
                        <Text style={{ textAlign: 'left', color: 'blue', fontWeight: 'bold' }} > {'< Back '} </Text>
                    </TouchableOpacity>
               
                    <TouchableOpacity onPress={() => {
                        save
                        (navigation.push('Aboutmorejobposition'))
                        }}  >
                        <Text style={{ textAlign: 'right', color: 'blue', fontWeight: 'bold',  }} > {'Next >'} </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
    ) 
}

//{company:navigation.params('company'),aboutcompany:navigation.params('aboutcompany'),position:position }