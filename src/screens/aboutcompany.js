import React,{useState} from 'react'
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { styles } from '../styles/global'
import AsyncStorage from '@react-native-community/async-storage';

export default function aboutcompany({ navigation }) {

    const [company, setCompany] = useState()
    const [aboutcompany, setAboutcompany] = useState()

    async function save(){
        try{
            await AsyncStorage.setItem("company",company)
            await AsyncStorage.setItem("aboutcompany",aboutcompany)
            console.log(company)
        }catch(err){
            console.log(err)
        }
    }

    // function save1(){
    //     console.log('done',company)
    // }

    return (
        <View style={{ marginTop: 100 }} >
            <ScrollView>
            <Text style={{ textAlign: 'center', fontWeight:'bold' }} > About Company </Text>
            <View style={styles.borderbox} >
                <View style={styles.innerborderbox} >
                </View>
            </View>

            <View style={{ margin: 20 }} >
                <Text style={{ marginTop: 50, marginBottom: 50 }}>Tell about your company, what you do and where are your located </Text>

                <TextInput style={styles.input}  onChangeText={(val) => {setCompany(val)}} placeholder="Company Name" />

                <TextInput style={styles.input}  onChangeText={ (val) => setAboutcompany(val) } multiline placeholder="About Company" />
                
                <TouchableOpacity onPress={ () =>  {
                    save
                    (navigation.push('Aboutjobposition'))
                    } } >
                    <Text style={{ textAlign: 'right', color: 'blue', fontWeight: 'bold' }} > {'Next >'} </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
}


