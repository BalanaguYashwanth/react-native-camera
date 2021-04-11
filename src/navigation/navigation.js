import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import React from 'react'
import Switch from '../screens/switch'
import Recruiter from '../screens/recruiter'
import Jobseeker from '../screens/jobseeker'
import Camera from '../screens/camera'
import Recruiterhome from '../screens/recruiterhome' 

const screens={
    Recruiterhome:{
        screen:Recruiterhome
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
    Jobseeker:{
        screen:Jobseeker,
        navigationOptions:{
            headerLeft:()=>(null)
        }
    },
  
}

const homestack = createStackNavigator(screens)

const appContainer = createAppContainer(homestack)

export default appContainer
