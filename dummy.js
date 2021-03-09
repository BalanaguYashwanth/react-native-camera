import { Camera } from 'expo-camera';
import React,{useState,useEffect, useRef} from 'react'
import {StyleSheet,Text,View,TouchableOpacity,SafeAreaView,Button,Alert} from 'react-native'
import { Video,Audio } from "expo-av";

export default function home(){
  const [hasPermission,setHasPermission] = useState(null)
  const [type,setType]=useState(Camera.Constants.Type.back);
  const [videosource,setVideosource] = useState(null);
  const [recordingstatus,setRecordingstatus] = useState(false);
  const [preview, setPreview] = useState(false);
  const cameraRef = useRef();

  useEffect(() => {

    async function hello(){
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }

    hello();

  }, []);


  if(hasPermission === null)
  {
    return <View />;
  }

  if(hasPermission === false)
  {
    return <Text>  No access to camera </Text>; 
  }

  function flip(){
    if(type==Camera.Constants.Type.back)
    {
      setType(Camera.Constants.Type.front)
    }else{
      setType(Camera.Constants.Type.back)
    }
  }

  async function recordVideo(){
    if (cameraRef.current) 
    {
      try{
            const videoRecord =  cameraRef.current.recordAsync();
            if(videoRecord)
            {
              setRecordingstatus(true)
              const data = await videoRecord
              const source = data.uri
              setVideosource(source)
            }
        }catch(error){
          console.warn(error);
        }
    }
  }

  function playstopvideo(){
    return(
      <TouchableOpacity  onLongPress={recordVideo} style={styles.buttoninside}  onPressOut={stopVideo}  >
        <Text> record </Text>
      </TouchableOpacity>
    )
  } 

  function stopVideo(){
    if(cameraRef.current)
    {
      setRecordingstatus(false)
      cameraRef.current.stopRecording();
    }
  }


  function recordingindicator(){
    return(
      <View style={styles.indicator}>
        <Text  > recording.... </Text>
      </View>
    )

  }

  function flip(){
    <View style={styles.button} >
    <TouchableOpacity       
     onPress={flip}
     style={styles.buttoninside}
    >
      <Text>Press Here</Text>
    </TouchableOpacity>
    </View>
  }

  function video(){
    setPreview(true)
    return(
    <Video  source ={{uri:videosource}} 
            shouldPlay={true}
            style={styles.media}
    />
    
    )
  }

  

  return(
    <SafeAreaView  style={styles.container} >  
      <Camera ref={cameraRef} style={styles.camera} type={type}  />
     
        
      <View style={styles.button}>
           {videosource && video() }
          {recordingstatus && recordingindicator()} 
          { !preview && playstopvideo()}
      </View>

    </SafeAreaView>
  )
}

const styles=StyleSheet.create({

  buttoninside:{
    backgroundColor: "#DDDDDD",
    padding: 10
  },

  container:{
    ...StyleSheet.absoluteFillObject,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },

  button:{
    flex: 0.1,
    paddingTop:10,
    alignItems:'center', 
  },

  indicator:{
    alignItems:'center', 
  },

  camera:{
    flex:1,
  },

})
