import React, { useEffect, useState } from 'react'
import { Text, View , ScrollView, Linking } from 'react-native'
import {Card, Title,Button} from 'react-native-paper'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function responses() {

    const [datas, setDatas] = useState()

    useEffect(() => {
        axios.get('https://particle-ae921-default-rtdb.firebaseio.com/job.json')
            .then(res => {
                let arr=[]
                console.log(res.data)
                let result = res.data
                for( let obj in result )
                {
                    result[obj].key=obj
                    arr.push(result[obj])
                }
                setDatas(arr)

            })
            .catch(err => console.log(err))
    }, [])

    return (
        <View>
            <ScrollView> 
            {
                datas && datas.map( (data,index) => (

                    <Card key={index} style={{margin:10}}  >
                        <Card.Title style={{textTransform:'uppercase'}} title={data.company} />
                        <Card.Content>
                            <Title>Name:- {data.personName} </Title>
                         { data.projectLink &&   <Title>ProjectLink :- { data.projectLink} </Title>}
                            <Title>QuizAns:- {data.quizAns  ? data.quizAns :'NA' } </Title>
                            <Title>OptionalData:-{data.optionalInput ? data.optionalInput : 'NA' } </Title>
                            <Title style={{color:'blue'}} onPress={ () => Linking.openURL(data.video) } >VideoLink<Icon name="external-link" size={20} color="blue" />  </Title>
                        </Card.Content>

                    </Card>
                )  )
            }
            </ScrollView>
        </View>
    )
}
