import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import React from 'react'
import Switch from '../screens/switch'
import Recruiter from '../screens/recruiter'
import Jobseeker from '../screens/jobseeker'
import Camera from '../screens/camera'
import Recruiterhome from '../screens/recruiterhome' 
import Jobdata from '../screens/jobdata'

const screens={


    Switch:{
        screen:Switch,
        navigationOptions:{
            title:'Switch roles'
        }
    },

    Recruiterhome:{
        screen:Recruiterhome
    },
    
    Jobseeker:{
        screen:Jobseeker,
        navigationOptions:{
            headerLeft:()=>(null)
        }
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
