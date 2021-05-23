import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import React from 'react'
import Switch from '../screens/switch'
import Recruiter from '../screens/recruiter'
import Jobseeker from '../screens/jobseeker'
import Camera from '../screens/camera'
import Recruiterhome from '../screens/recruiterhome' 
import Jobdata from '../screens/jobdata'
import Responses from '../screens/responses'
import Successfullyposted from '../screens/successfullyposted'
import Recruitersection from '../screens/recruitersection'
import Recruitercamera from '../screens/recruitercamera'
import Aboutcompany from '../screens/aboutcompany'
import Aboutjobposition from '../screens/aboutjobposition' 
import Aboutmorejobposition from '../screens/aboutmorejobposition'


const screens={

    Switch:{
        screen:Switch,
        navigationOptions:{
            headerLeft:()=>(null),
            title:'Switch roles'
        }
    },

    Aboutcompany:{
        screen:Aboutcompany,
        navigationOptions:{
            header:() => false
        },
    },


    Aboutjobposition:{
        screen:Aboutjobposition,
        navigationOptions:{
            header:() => false
        }
    },

    Recruitercamera:{
        screen:Recruitercamera,
        navigationOptions:{
            header:()=>false
        }
    },
    

   

   
   
    Aboutmorejobposition:{
        screen:Aboutmorejobposition,
        navigationOptions:{
            header:()=>false
        }
    },

    Recruiterhome:{
        screen:Recruiterhome
    },

    Recruitersection:{
        screen:Recruitersection,
    },
   
    Jobseeker:{
        screen:Jobseeker,
        navigationOptions:{
            headerLeft:()=>(null)
        }
    },

    Successfullyposted:{
        screen:Successfullyposted,
        navigationOptions:{
            headerTitle:'Posted'
        }
    },
    
   
    Responses:{
        screen:Responses
    },
   
    
    Jobdata:{
        screen:Jobdata,
        navigationOptions:{
            headerTitle:'Job challange',
            headerLeft:() => (null)
        }
    },
   
   
    Recruiter:{
        screen:Recruiter,
        navigationOptions:{
            headerLeft: () => (null)
        }
    },


    camera:{
        screen:Camera,
        navigationOptions:{
            headerLeft: () => (null)
        }
    },

}

const homestack = createStackNavigator(screens)

const appContainer = createAppContainer(homestack)

export default appContainer
