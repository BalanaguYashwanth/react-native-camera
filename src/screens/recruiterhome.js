import React, { useState } from 'react'
import { View, Text, Alert, ScrollView } from 'react-native'
import home from './camera'
import { Checkbox, TextInput, Button } from 'react-native-paper'
import { styles } from '../styles/global'
import axios from 'axios'

export default function recuriterhome({ navigation }) {

    const [checked, setChecked] = useState(false);
    const [projectChecked, setProjectChecked] = useState(true)
    const [numform, setNumform] = useState(['form1'])
    const [forms, setForms] = useState({ form1: { id: 1, question: 'Enter the question', opt1: 'enter the option1', opt2: 'enter the option2', opt3: 'enter the option3', opt4: 'enter the option4' } })
    const [arrs, setArrs] = useState([])
    const [companyName, setCompanyName] = useState('')
    const [project, setProject] = useState('')
    const [info, setInfo] = useState(null)
    const [description, setDescription] = useState('')
    const [position, setPosition] = useState('')
    const [location, setLocation] = useState('')
    const [salary, setSalary] = useState('')
    const [optional, setOptional] = useState('')

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

    function submit() {
        if (description != '' && companyName != '' && position != '' && location != '' && salary != '') {
            axios.post('https://particle-ae921-default-rtdb.firebaseio.com/media.json', {
                project: project,
                companyname: companyName,
                description: description,
                position: position,
                optional: optional,
                location: location,
                salary: salary,
                form: forms,
            }).then(res => {
                console.log(res)
                setInfo('submitted')
                navigation.push('Successfullyposted')
            })
                .catch(err => console.log(err))
        } else {
            setInfo('please enter all the inputs')
            setTimeout(function () {
                setInfo(null)
            }, 3000)
        }
    }

    function submit1()
    {
        //description != '' && companyName != '' && position != '' && location != '' && salary != ''
        if (true) {
            navigation.navigate('Recruitercamera',{
                project: project,
                companyname: companyName,
                description: description,
                position: position,
                optional: optional,
                location: location,
                salary: salary,
                form: forms,
            })
        } else {
            setInfo('please enter all the inputs')
            setTimeout(function () {
                setInfo(null)
            }, 3000)
        }
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

    return (
        <View style={{ height: 100, flex: 1 }}  >
            <View>
                {info && <Text style={{ justifyContent: 'center', textAlign: 'center', backgroundColor: 'grey', fontWeight: 'bold' }} > {info}  </Text>}
            </View>
            <View style={{ marginLeft: 20, marginRight: 20, margin: 10 }}>
                <ScrollView>
                    <TextInput style={{ margin: 10, backgroundColor: '#ddddd' }} label='Company Name' onChangeText={(val) => setCompanyName(val)} />
                    <TextInput style={{ margin: 10, backgroundColor: '#ddddd' }} label='Description' multiline={true} onChangeText={((val) => setDescription(val))} />
                    <TextInput style={{ margin: 10, backgroundColor: '#ddddd' }} label='Positions' multiline={true} onChangeText={((val) => setPosition(val))} />

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }} >
                        {/* <Checkbox
                            onPress={() => (setProjectChecked(!projectChecked))}
                            status={projectChecked ? 'checked' : 'unchecked'}
                            color='#2196F3'
                        /> */}
                        {/* <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, margin: 5 }}  >  Project Section </Text> */}
                    </View>

                    <TextInput style={{ margin: 10, backgroundColor: '#ddddd' }} label="Location Field" onChangeText={(val) => setLocation(val)} />

                    <TextInput style={{ margin: 10, backgroundColor: '#ddddd' }} label="Salary Field" onChangeText={(val) => setSalary(val)} />

                    {projectChecked && <TextInput style={{ margin: 10, backgroundColor: '#ddddd' }} label="Project Details" onChangeText={(val) => setProject(val)} />}

                    <TextInput style={{ margin: 10, backgroundColor: '#ddddd' }} label="Optional Field" onChangeText={(val) => setOptional(val)} />


                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginBottom: 5, marginTop: 10 }}>

                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(!checked)}
                            color='#8A2BE2'
                        />

                        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, margin: 5 }} >  Quiz Section </Text>
                    </View>
                    {
                        allforms(forms)
                    }

                    <Button onPress={submit1} style={{ margin: 5, }} mode='contained' >  Create Short Video  </Button>


                </ScrollView>
            </View>
        </View>
    )
}
