import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'

export default function jobdata({ navigation }) {

    const [datas, setDatas] = useState()
    const [project, setProject] = useState()
    const [form, setForm] = useState()
//{ form1: { id: 1, key: "form1", opt1: "Programming language", opt2: "Non Programming language", opt3: "Science", opt4: "Social", question: "Where array will use" }, }
    useEffect(() => {
        let data = navigation.getParam('companyname')
        console.log('datas', data)
        setForm(data.form)
        setProject(data.project)
        setDatas(data)
    }, [])

    function forms(form) {
        let arrs = []
        for (let obj in form) {
            arrs.push(form[obj])
        }
        return (
            <View>
                {
                   form && Object.entries(form).map(([key, value]) => (
                        <View key={value.id}>
                            <Text> {value.id}) {value.question}  </Text>
                            <Text> A {value.opt1}  </Text>
                            <Text> B {value.opt2}  </Text>
                            <Text> C {value.opt3}  </Text>
                            <Text> D {value.opt4}  </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    return (
        <View>
            <TextInput label={project} />
            {forms(form)}
        </View>
    )
}

