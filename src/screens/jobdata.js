import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput, RadioButton, Button } from 'react-native-paper'


export default function jobdata({ navigation }) {

    const [checked, setChecked] = useState()
    const [datas, setDatas] = useState()
    const [project, setProject] = useState('')
    const [form, setForm] = useState()
    const [company, setCompany] = useState()
    const [name, setName] = useState('')
    const [projectlink, setProjectlink] = useState()
    const [info, setInfo] = useState()
    //{ form1: { id: 1, key: "form1", opt1: "Programming language", opt2: "Non Programming language", opt3: "Science", opt4: "Social", question: "Where array will use" }, }

    useEffect(() => {
        let data = navigation.getParam('companyname')
        console.log('datas', data)
        setForm(data.form)
        setCompany(data.companyname)
        setProject(data.project)
        setDatas(data)
    }, [])


    function forms(form) {
        let arrs = []
        for (let obj in form) {
            arrs.push(form[obj])
        }

        function submit() {
            if (name != '') {
                navigation.push('camera', { company: company, personName: name, quizAns: checked, projectLink: projectlink })
                console.log(checked)
            }
            else {
                setInfo('please fillup all datas')
            }
        }

        return (
            <View>
              
                {
                    form && Object.entries(form).map(([key, value]) => (
                        <View key={value.id} style={{ margin: 10, }} >

                            <Text> {value.id}) {value.question}  </Text>
                            <Text> <RadioButton value='A' color='black' onPress={() => setChecked('A')} status={checked === 'A' ? 'checked' : 'unchecked'} /> <Text> {value.opt1} </Text>  </Text>
                            <Text> <RadioButton value='B' color='black' onPress={() => setChecked('B')} status={checked === 'B' ? 'checked' : 'unchecked'} />  {value.opt2} </Text>
                            <Text> <RadioButton value='C' color='black' onPress={() => setChecked('C')} status={checked === 'C' ? 'checked' : 'unchecked'} />  {value.opt3} </Text>
                            <Text> <RadioButton value='D' color='black' onPress={() => setChecked('D')} status={checked === 'D' ? 'checked' : 'unchecked'} />  {value.opt4} </Text>
                            <Button onPress={submit} style={{ margin: 5 }} mode="contained" >  submit </Button>

                        </View>
                    ))
                }
            </View>
        )
    }

    return (
        <View style={{ margin: 10 }}>
            
            <Text style={{ textAlign:'center', fontWeight: 'bold', color:'red'}} > {info} </Text>

            <Text style={{ textAlign: 'center', alignItems: 'center', fontWeight: '500', fontSize: 30, margin: 5 }}   > Exam Details </Text>

            <TextInput label="enter your name" onChangeText={(val) => (setName(val))} style={{ margin: 4 }} />

            {  !!project && <TextInput style={{ margin: 4 }} onChangeText={(val) => (setProjectlink(val))} label={project} />}

            {forms(form)}
        </View>
    )
}

