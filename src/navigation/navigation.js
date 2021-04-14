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
    
    Jobseeker:{
        screen:Jobseeker,
        navigationOptions:{
            headerLeft:()=>(null)
        }
    },
    
    Jobdata:{
        screen:Jobdata
    },

   
    Switch:{
        screen:Switch,
        navigationOptions:{
            title:'Switch roles'
        }
    },
    Recruiter:{
        screen:Recruiter,
        navigationOptions:{
            headerLeft: () => (null)
        }
    },
  
    Recruiterhome:{
        screen:Recruiterhome
    },
}

const homestack = createStackNavigator(screens)

const appContainer = createAppContainer(homestack)

export default appContainer
