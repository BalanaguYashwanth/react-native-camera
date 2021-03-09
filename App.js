import { Camera } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert } from 'react-native'
import { Video, Audio } from "expo-av";
import VideoPlayer from 'expo-video-player'

export default function home() {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [videosource, setVideosource] = useState(null);
  const [recordingstatus, setRecordingstatus] = useState(false);
  const [preview, setPreview] = useState(false);
  const cameraRef = useRef();

  useEffect(() => {

    async function hello() {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }

    hello();

  }, []);


  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>  No access to camera </Text>;
  }

  function flip() {
    if (type == Camera.Constants.Type.back) {
      setType(Camera.Constants.Type.front)
    } else {
      setType(Camera.Constants.Type.back)
    }
  }

  async function recordVideo() {
    if (cameraRef.current) {
      try {
        const videoRecord = cameraRef.current.recordAsync();
        if (videoRecord) {
          setRecordingstatus(true)
          const data = await videoRecord
          const source = data.uri
          setVideosource(source)
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }

  function playstopvideo() {
    return (
      <TouchableOpacity onLongPress={recordVideo} style={styles.buttonbackground} onPressOut={stopVideo}  >
        <Text> record </Text>
      </TouchableOpacity>
    )
  }

  function cancelvideo(){
    setVideosource(null)
    setPreview(false)
  }

  function cancel() {
    return (
      <View style={styles.vcancelbutton} >
      <TouchableOpacity onPress={cancelvideo} style={{textAlign:'left', paddingTop:5}}  >
        <Text style={{padding:20}}> cancel </Text>
      </TouchableOpacity>
      </View>
    )
  }

  function stopVideo() {
    if (cameraRef.current) {
      setPreview(true)
      setRecordingstatus(false)
      cameraRef.current.stopRecording();
    }
  }


  function recordingindicator() {
    return (
      <View style={styles.indicator}>
        <Text  > recording.... </Text>
      </View>
    )

  }

  function flip() {
    <View style={styles.button} >
      <TouchableOpacity
        onPress={flip}
        style={styles.buttonbackground}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  }

  function video() {
    return (
      <View style={styles.media}>
      <VideoPlayer
  videoProps={{
    shouldPlay: true,
    resizeMode: Video.RESIZE_MODE_CONTAIN,
    source: {
      uri: videosource,
    },
  }}
/>
</View>
    )
  }

  return (
    <SafeAreaView style={styles.container} >
    { !preview && <Camera ref={cameraRef} style={styles.camera} type={type} />}

    {videosource && video()}
        
    {preview && cancel()}
      
      <View style={styles.button}>    

        {recordingstatus && recordingindicator()}
        {!preview && playstopvideo()}
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  vcancelbutton:{
    flex:0.07,
    //justifyContent:'center',
    backgroundColor: 'white',
    paddingTop:5
  },

  buttonbackground: {
    backgroundColor: "#DDDDDD",
    padding: 10
  },

  container: {
    ...StyleSheet.absoluteFillObject,
  },
  media: {
      flex:1,
      height:400,
      marginTop:10,
    ...StyleSheet.absoluteFillObject,
  },

  button: {
    flex: 0.1,
    paddingTop: 10,
    alignItems: 'center',
  },

  indicator: {
    alignItems: 'center',
  },

  camera: {
    flex: 1,
  },

})
