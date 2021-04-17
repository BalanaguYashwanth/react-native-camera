import React, { useEffect, useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, Touchable, Alert } from 'react-native'
import { styles } from '../styles/global'
//import {Button} from 'react-native-paper'
import axios from 'axios'
import { Card, Button } from 'react-native-paper'
import Jobdata from '../screens/jobdata'

export default function jobseeker({navigation}) {
    const [datas, setDatas] = useState([])
    
    useEffect(() => {
        axios.get('https://particle-ae921-default-rtdb.firebaseio.com/media.json')
            .then(res => {
                let result = res.data
                let arr = []
                for (let obj in result) {
                    result[obj].key = obj
                    arr.push(result[obj])
                }
                setDatas(arr)
                console.log('arr', arr)
            })
            .catch(err => console.log(err))
    }, [])

    function pressHandler() {
        Alert.alert('hello')
    }

    return (
        <View >
            {
                datas && datas.map((data, index) => (
                    <Card style={{ margin: 10, }} key={index} >
                        <Card.Title title={data.companyname}  />
                        <Card.Actions>
                            <Button onPress={() => {
                                {navigation.push('Jobdata',{ companyname:data} )}  
                             } } > {'->'}</Button>
                                
                        </Card.Actions>
                    </Card>
                ))
            }
        </View>
    )
}
