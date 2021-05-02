import React,{useEffect} from 'react'
import {TextInput, Text, View, Image} from 'react-native'

export default function posted({navigation}){
    
    useEffect( () => {
        setTimeout( function(){
            navigation.push('Switch')
        },2000 )
        
    },[])
    

    return(
        <View>
            <Image  source={require('../assets/success.gif')} style={{width:'100%', height:'100%'}} />
            <Text> success </Text>
        </View>
    )
}
