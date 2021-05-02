import React, { useEffect, useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, Touchable, Alert, ScrollView, Image } from 'react-native'
import { styles } from '../styles/global'
//import {Button} from 'react-native-paper'
import axios from 'axios'
import { Card, Button, Paragraph,Title } from 'react-native-paper'
import Jobdata from '../screens/jobdata'

export default function jobseeker({ navigation }) {
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
        <View style={{ flex: 1, flexDirection: "column" }} >
            <ScrollView>
                {
                    datas && datas.map((data, index) => (
                        <View key={index}>
                            {/* <View style={{ flex: 1, margin: 10,width:100 ,flexDirection: 'row' }}>
                                <Image
                                    style={styles.logo}
                                    source={{
                                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                                    }}
                                />
                            </View> */}
                            <Card style={{ flex: 1, margin: 10}} key={index} >

                                <View  style={{margin:15}}>
                                
                                <Text style={{ marginBottom:10 ,fontSize:20}} >Company:- {data.companyname}  </Text>
                                <Text style={{  fontSize:20}}>Positions :- </Text>
                                <Text style={{ marginBottom:10 , fontSize:20}} >{data.position}  </Text>
                                <Text style={{  fontSize:20}}>Description :- </Text>
                                <Paragraph style={{fontWeight:'bold',}} >{data.description}  </Paragraph>
                                </View>
                                <Card.Actions>
                                    <Button onPress={() => {
                                        { navigation.push('Jobdata', { companyname: data }) }
                                    }} > Apply </Button>

                                    <Button onPress={() => (navigation.push('Responses'))} > Evaluate </Button>

                                </Card.Actions>

                            </Card>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}