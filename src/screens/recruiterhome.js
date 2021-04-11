import React, { useState } from 'react'
import { View, Text, Button, Alert, ScrollView } from 'react-native'
import home from './camera'
import { Checkbox, TextInput } from 'react-native-paper'
import { styles } from '../styles/global'

export default function recuriterhome() {

    const [checked, setChecked] = useState(false);
    const [projectChecked, setProjectChecked] = useState(false)
    const [numform, setNumform] = useState(['form1'])
    const [forms, setForms] = useState({ form1: { id: 1, question: 'enter the question', opt1: 'enter the option1', opt2: 'enter the option2', opt3: 'enter the option3', opt4: 'enter the option4' } })
    const [arrs, setArrs] = useState([])

    function add() {
        let addform = { ...forms }
        let newid = 0
        newid = numform.length + 1
        let nameform = 'form' + newid
        numform.push(nameform)
        addform[nameform] = { id: newid, question: 'enter the question', opt1: 'enter the option1', opt2: 'enter the option2', opt3: 'enter the option3', opt4: 'enter the option4' }
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
        console.log(forms)
        //Alert.alert('done')
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
            <View>
                { checked && <ScrollView>
                    {
                        arr.map((form) => (
                            <View key={form.id}>
                                <Button title={'quiz ' + form.id} />
                                <TextInput style={{ margin: 5 }} onChangeText={(value) => {
                                    let uform={...forms}
                                    let formkey=form.key
                                    //let structform=
                                    uform[form.key]={...forms[formkey],question:value}
                                    setForms(uform)
                                }} label={form.question} />
                                <TextInput style={{ margin: 5 }}  onChangeText={(value) => {
                                    let uform={...forms}
                                    let formkey=form.key
                                    //let structform=
                                    uform[form.key]={...forms[formkey],opt1:value}
                                    setForms(uform)
                                }} label={form.opt1} />
                                <TextInput style={{ margin: 5 }}  onChangeText={(value) => {
                                    let uform={...forms}
                                    let formkey=form.key
                                    //let structform=
                                    uform[form.key]={...forms[formkey],opt2:value}
                                    setForms(uform)
                                }} label={form.opt2} />
                                <TextInput style={{ margin: 5 }}  onChangeText={(value) => {
                                    let uform={...forms}
                                    let formkey=form.key
                                    //let structform=
                                    uform[form.key]={...forms[formkey],opt3:value}
                                    setForms(uform)
                                }} label={form.opt3} />
                                <TextInput style={{ margin: 5 }}  onChangeText={(value) => {
                                    let uform={...forms}
                                    let formkey=form.key
                                    //let structform=
                                    uform[form.key]={...forms[formkey],opt4:value}
                                    setForms(uform)
                                }} label={form.opt4} />
                                <Button title={'delete'} color="#BEBEBE" onPress={() => deleting(arr, form.id)} />
                            </View>
                        ))
                    }
                    <Button title='+' onPress={add} />
                </ScrollView>
                }
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: '#DCDCDC', height: 100, flex: 1 }}  >
            <View style={{ marginLeft: 20, marginRight: 20, margin: 10 }}>
                <ScrollView>
                    <Text style={{ justifyContent: 'center', textAlign: 'center', margin: 10, fontSize: 20, fontWeight: 'bold' }} >  Details Form </Text>
                    <TextInput label='enter the company name' />

                    {/* <Checkbox  value={isSelected}  onValueChange={setSelected(true)} /> */}
                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginBottom: 5, marginTop: 10 }}>

                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(!checked)}
                            color='#2196F3'
                        />

                        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, margin: 5 }} >  Quiz Section </Text>
                    </View>

                    {
                        allforms(forms)

                    }


                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10, marginTop: 5 }} >
                        <Checkbox
                            onPress={() => (setProjectChecked(!projectChecked))}
                            status={projectChecked ? 'checked' : 'unchecked'}
                            color='#2196F3'
                        />
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, margin: 5 }}  >  Project Section </Text>
                    </View>

                    {projectChecked && <TextInput label="enter the project details" />}

                    <Button title="submit" onPress={submit} />
                </ScrollView>
            </View>
        </View>
    )
}

