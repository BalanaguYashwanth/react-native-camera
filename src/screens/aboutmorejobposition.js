import React,{useState} from 'react'
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { styles } from '../styles/global'
import AsyncStorage from '@react-native-community/async-storage';

export default function aboutmorejobposition({ navigation }) {

    const [jobdescription, setJobdescription] = useState()
    const [salary, setSalary] = useState()

    async function save(){
        try{
            await AsyncStorage.setItem('jobdescription',jobdescription)
            await AsyncStorage.setItem('salary',salary)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <View style={{ marginTop: 100 }} >
            <ScrollView>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }} > About job position </Text>
            <View style={styles.borderbox} >
                <View style={styles.innerborderbox2} >
                </View>
            </View>

            <View style={{ margin: 20, flexDirection: 'column',}} >
                <Text style={{ marginTop: 50, marginBottom: 50 }}>   </Text>

                <TextInput style={styles.input} onChangeText={(val)=>(setJobdescription(val)) } multiline placeholder="Job Description" />

                <TextInput style={styles.input} onChangeText={(val) => setSalary(val) } placeholder="Salary" />

                <View style={{ flexDirection: 'row',flexWrap: "wrap",flex:1, justifyContent:'space-between' }} >
                    <TouchableOpacity onPress={() => (navigation.push('Aboutjobposition'))}   >
                        <Text style={{ textAlign: 'left', color: 'blue', fontWeight: 'bold' }} > {'< Back '} </Text>
                    </TouchableOpacity>
              
                    <TouchableOpacity onPress={() => {
                        save
                        (navigation.push('Recruitercamera'))
                        }}  >
                        <Text style={{ textAlign: 'right', color: 'blue', fontWeight: 'bold',  }} > {'Next >'} </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
    ) 
}

