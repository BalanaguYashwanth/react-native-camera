import React from 'react'
import {View,Text, TouchableOpacity, Image} from 'react-native'
import {styles} from '../styles/global'

export default function recruitersection({navigation}){

    function home()
    {
        //console.log('reacted')
        navigation.navigate('Aboutcompany')
    }

    function response()
    {
        //console.log('reacted1')
        navigation.navigate('Responses')
    }

    return(
        <View  style={styles.container}>

            <Image 
            style={styles.imagecenter}
            source={{ uri:'https://resume.naukri.com/articles/wp-content/uploads/sites/7/2020/05/RC-Image1.jpg' }} 
            />

           <TouchableOpacity  style={styles.button}  onPress={ home  }> 
                <Text  > Post a Job </Text>
           </TouchableOpacity>

            <TouchableOpacity style={styles.button}  onPress={ response  } > 
            <Text > Responses </Text>
            </TouchableOpacity>

        </View>
    )
}

