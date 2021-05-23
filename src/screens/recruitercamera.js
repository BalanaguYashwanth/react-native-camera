import { Camera } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native'
import { Video, Audio } from "expo-av";
import axios from 'axios'
import { fb, db } from '../authentication/config'
import firebase from 'firebase'
import uuid from 'uuid';
import { styles } from '../styles/global'
import { Checkbox, Button, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';


export default function recruitercamera({ navigation }) {

  const [hasPermission, setHasPermission] = useState(null)
  const [numform, setNumform] = useState(['form1'])
  const [forms, setForms] = useState({ form1: { id: 1, question: 'Enter the question', opt1: 'enter the option1', opt2: 'enter the option2', opt3: 'enter the option3', opt4: 'enter the option4' } })
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [info, setInfo] = useState('')
  const [uploading, setUploading] = useState(true)
  const [recording, setRecording] = React.useState();
  const [audiosource, setAudiosource] = useState('');
  const cameraRef = useRef();
  const [checked, setChecked] = useState(false);
  const [arrs, setArrs] = useState([])
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [aboutcompany, setAboutcompany] = useState('')
  const [jobdescription, setJobdescription] = useState('')
  const [project, setProject] = useState('')

  async function load() {
    try {
      let company = await AsyncStorage.getItem('company');
      let position = await AsyncStorage.getItem('position');
      let location = await AsyncStorage.getItem('location')
      let salary = await AsyncStorage.getItem('salary')
      let aboutcompany = await AsyncStorage.getItem('aboutcompany')
      let jobdescription = await AsyncStorage.getItem('jobdescription')
      setCompany(company)
      setPosition(position)
      setLocation(location)
      setSalary(salary)
      setAboutcompany(aboutcompany)
      setJobdescription(jobdescription)
      console.log('company', company)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

    load()

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

  function add() {
    let addform = { ...forms }
    let newid = 0
    newid = numform.length + 1
    let nameform = 'form' + newid
    numform.push(nameform)
    addform[nameform] = { id: newid, question: 'Enter the question', opt1: 'enter the option1', opt2: 'enter the option2', opt3: 'enter the option3', opt4: 'enter the option4' }
    setForms(addform)
    //console.log(forms)
  }

  function deleting(arr, numid) {
    //console.log(numid,arr)
    let arr1 = {}
    for (let x in arr) {
      if (numid != arr[x].id) {
        //console.log(x,arr[x])
        arr1[x] = arr[x]
      }
    }
    setForms(arr1)
  }


  function allforms(datas) {
    //console.log(datas)
    let arr = []

    for (let x in datas) {
      datas[x].key = x
      arr.push(datas[x])
      console.log(arr)
    }

    return (
      <View style={{ flex: 1, flexDirection: 'column' }} >
        { checked && <ScrollView>
          {
            arr.map((form, index) => (
              <View style={{ flex: 1 }} key={form.id}>
                <Button mode="outlined" >  {'Question ' + parseInt(index + 1)} </Button>
                <TextInput style={{ margin: 5, backgroundColor: '#ddddd', padding: 5 }} onChangeText={(value) => {
                  let uform = { ...forms }
                  let formkey = form.key
                  uform[form.key] = { ...forms[formkey], question: value }
                  setForms(uform)
                }} label={'Enter the question'} />
                <TextInput style={{ margin: 5, backgroundColor: '#ddddd' }} onChangeText={(value) => {
                  let uform = { ...forms }
                  let formkey = form.key
                  uform[form.key] = { ...forms[formkey], opt1: value }
                  setForms(uform)
                }} label={'choice 1'} />
                <TextInput style={{ margin: 5, backgroundColor: '#ddddd' }} onChangeText={(value) => {
                  let uform = { ...forms }
                  let formkey = form.key
                  uform[form.key] = { ...forms[formkey], opt2: value }
                  setForms(uform)
                }} label={'choice 2'} />
                <TextInput style={{ margin: 5, backgroundColor: '#ddddd' }} onChangeText={(value) => {
                  let uform = { ...forms }
                  let formkey = form.key
                  uform[form.key] = { ...forms[formkey], opt3: value }
                  setForms(uform)
                }} label={'choice 3'} />
                <TextInput style={{ margin: 5, backgroundColor: '#ddddd' }} onChangeText={(value) => {
                  let uform = { ...forms }
                  let formkey = form.key
                  uform[form.key] = { ...forms[formkey], opt4: value }
                  setForms(uform)
                }} label={'choice 4'} />

                <View style={{ flex: 1, flexDirection: 'row' }} >
                  <Button onPress={() => deleting(arr, form.id)} style={{ margin: 10, flex: 1, justifyContent: 'space-around' }} mode="contained" > Delete </Button>
                  <Button onPress={add} style={{ margin: 10, flex: 1, justifyContent: 'space-between' }} mode="contained"   >  Add </Button>
                </View>
              </View>
            ))
          }

        </ScrollView>
        }
      </View>
    )
  }


  async function submit() {

    if (audiosource != '') {

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
        xhr.open('GET', audiosource, true);
        xhr.send(null);
      });

      const ref = firebase
        .storage()
        .ref()
        .child(uuid.v4());
      const snapshot = await ref.put(blob);

      blob.close();

      let link = await snapshot.ref.getDownloadURL()

      await axios.post('https://particle-ae921-default-rtdb.firebaseio.com/media.json', {
        project: project,
        companyname: company,
        aboutcompany: aboutcompany,
        jobdescription: jobdescription,
        position: position,
        location: location,
        salary: salary,
        form: forms,
        audio: link,
      }).then(res => {
        console.log(res)
        setInfo('submitted')
        navigation.push('Successfullyposted')
      })
        .catch(err => console.log(err))
    }else{
      setInfo('audio recording is compulsary')
    }
  }
  //{company} {aboutcompany} {position} {location} {jobdescription} {salary}


  function submit1() {
    console.log('done')
  }

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudiosource(uri)
    console.log('Recording stopped and stored at', uri);
  }


  return (
    <View >
      <ScrollView>
        <View style={{ marginTop: 100 }} >
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }} > Additional Information  </Text>
          <View style={styles.borderbox} >
            <View style={styles.innerborderbox3} >
            </View>
          </View>

          <View style={{ margin: 20, flexDirection: 'column', }} >
            <Text style={{ marginTop: 50, marginBottom: 50 }}>Save time ,ask for more information or have application answer assesment questions in advance   </Text>

            <TextInput style={{ margin: 5, backgroundColor: '#ddddd' }} label="Type question here" onChangeText={(val) => setProject(val)} />

            <View style={{ flexDirection: 'row', marginBottom: 5, }}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
                color='#8A2BE2'
              />
              <Text style={{ marginTop: 10, fontSize: 15, }} >Multiple choice</Text>
            </View>
            {
              allforms(forms)
            }

            <Text style={{ marginTop: 50, marginBottom: 50, color: 'grey' }} >Personalize job post with a short video message, Pitch your product or service, communication your company value  </Text>

            <View style={{ marginBottom: 40 }}>

              <Button
                onPress={recording ? stopRecording : startRecording}
              > {recording ? 'Stop Recording' : 'Start Recording'} </Button>

              {/* <Text style={styles.updatedbutton} onPress={submit} >  submit </Text> */}
              <Text style={{ justifyContent: 'center', textAlign: 'center' }} > {info} </Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', flexWrap: "wrap", flex: 1, justifyContent: 'space-between' }} >

                <TouchableOpacity onPress={() => (navigation.push('Aboutmorejobposition'))}   >
                  <Text style={{ textAlign: 'left', color: 'blue', fontWeight: 'bold' }} > {'< Back '} </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={submit}  >
                  <Text style={{ textAlign: 'right', color: 'blue', fontWeight: 'bold', }} > {'Submit >'} </Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </View>
  )
}


// const styles = StyleSheet.create({

  // vcancelbutton: {
  //   flex: 1,
  //   //justifyContent:'center',
  //   backgroundColor: 'white',

  //   position: 'relative',
  //   flexDirection: 'column'
  // },

  // vsubmitbutton: {
  //   flex: 1,
  //   //justifyContent:'center',
  //   backgroundColor: 'white',
  //   padding: 5,
  //   textAlign: 'right',
  //   alignItems: 'flex-end',
  //   justifyContent: 'flex-end',
  //   position: 'relative',
  //   flexDirection: 'column',
  // },

  // buttonbackground: {
  //   borderRadius: 35,
  //   backgroundColor: "#DDDDDD",
  //   padding: 10,
  //   alignItems: 'center',
  // },

  // buttonbackgroundflip: {

  //   backgroundColor: "#DDDDDD",
  //   alignItems: 'flex-start',
  //   justifyContent: 'flex-start',
  // },

  // container: {
  //   ...StyleSheet.absoluteFillObject,
  // },

  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   backgroundColor: '#ecf0f1',
  //   padding: 10,
  // },

  // media: {
  //   flex: 1,
  //   marginTop: 10,
  //   ...StyleSheet.absoluteFillObject,
  // },

  // button: {
  //   backgroundColor: '#DDDDDD',
  //   alignItems: 'center',
  //   borderRadius: 10,
  //   padding: 10,
  //   margin:10,
  //   justifyContent:'center',
  //   textAlign:'center',
  // },


  // indicator: {
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },

  // camera: {
  //   flex: 1,
  // },

// })
