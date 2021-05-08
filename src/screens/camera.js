import { Camera } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert } from 'react-native'
import { Video, Audio } from "expo-av";
import VideoPlayer from 'expo-video-player'
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios'
import { fb, db } from '../authentication/config'
import firebase from 'firebase'
import uuid from 'uuid';

export default function home({navigation}) {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [videosource, setVideosource] = useState(null);
  const [recordingstatus, setRecordingstatus] = useState(false);
  const [preview, setPreview] = useState(false);
  const [info,setInfo]=useState('')
  const [uploading,setUploading] = useState(true) 

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

  function flipfunction() {
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
      <View style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center' }} >
        <TouchableOpacity onLongPress={recordVideo} style={styles.buttonbackground} onPressOut={stopVideo}  >
          <Fontisto name="record" size={24} color="black" />
        </TouchableOpacity>
      </View>
    )
  }

  function cancelvideo() {
    setVideosource(null)
    setPreview(false)
  }

  function cancel() {
    return (
      <View style={styles.vcancelbutton} >
        <TouchableOpacity onPress={cancelvideo} style={{ textAlign: 'left', position: 'absolute', padding: 5 }}  >
          <Text style={styles.button} > cancel </Text>
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
    return (
      <View>
        <TouchableOpacity
          onPress={flipfunction}
          style={styles.buttonbackground}
        >
          <MaterialIcons name="flip-camera-android" size={24} color="black" />
        </TouchableOpacity>
      </View>
    )
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



  async function submit() {

    setUploading(false)
    setInfo(' processing.....')

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        setInfo(' Network request failed')
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', videosource, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    let link = await snapshot.ref.getDownloadURL()
   
    await axios.post('https://particle-ae921-default-rtdb.firebaseio.com/job.json', {
      company: navigation.getParam('company'),
      personName:navigation.getParam('personName'),
      quizAns:navigation.getParam('quizAns'),
      projectLink:navigation.getParam('projectLink'),
      optionalInput:navigation.getParam('optionalInput'),
      video: link,
    })
      .then(res => {
        console.log(res)
        setUploading(true)
        navigation.push('Switch')
      })
      .catch(err => console.log(err))
  }


  return (
    <SafeAreaView style={styles.container} >
      { !preview && <Camera ref={cameraRef} style={styles.camera} type={type} />}

      
      {videosource && video()}

      { !!info && <Text style={{backgroundColor:'white', padding:5, textAlign:'center'}} > {info} </Text>}


     { uploading &&  <View style={{ flexDirection: 'row' }} >
        {preview && cancel()}
        
        {preview && <View style={styles.vsubmitbutton}>
          
          <Text style={styles.button} onPress={submit} >  submit </Text>
          <Text> {info} </Text>
        </View>
        }
      </View>
      }

      <View style={{ flex: 0.1, flexDirection: 'row', flexWrap: 'wrap' }}  >
        <View style={{ flexDirection: 'column', marginLeft: 25, padding: 5 }}>
          {!preview && flip()}
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'column', padding: 5, marginLeft: 100 }}>
          {recordingstatus && recordingindicator()}
          {!preview && playstopvideo()}
        </View>
      </View>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({

  vcancelbutton: {
    flex: 1,
    //justifyContent:'center',
    backgroundColor: 'white',

    position: 'relative',
    flexDirection: 'column'
  },

  vsubmitbutton: {
    flex: 1,
    //justifyContent:'center',
    backgroundColor: 'white',
    padding: 5,
    textAlign: 'right',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'relative',
    flexDirection: 'column',
  },

  buttonbackground: {
    borderRadius: 35,
    backgroundColor: "#DDDDDD",
    padding: 10,
    alignItems: 'center',
  },

  buttonbackgroundflip: {

    backgroundColor: "#DDDDDD",
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  container: {
    ...StyleSheet.absoluteFillObject,
  },

  media: {
    flex: 1,
    marginTop:10,
    ...StyleSheet.absoluteFillObject,
  },

  button: {
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },


  indicator: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  camera: {
    flex: 1,
  },

})
