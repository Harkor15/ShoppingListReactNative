import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class RegisterScreen extends PureComponent {
    render() {
        return (
            <View style={{  flex: 1,justifyContent: "center"}}>
                <Text style={{marginLeft:25}}>E-mail:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={{marginLeft:25, marginRight:25,}}  ></TextInput>
                <Text style={{marginLeft:25}}>Password:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={{marginLeft:25, marginRight:25,}}  secureTextEntry></TextInput>
                <Text style={{marginLeft:25}}>Password:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={{marginLeft:25, marginRight:25,}}  secureTextEntry></TextInput>
                <TouchableOpacity onPress={()=>Actions.pop()}
                style={{backgroundColor:'#ff006a', margin: 30,height: 40, borderRadius:2,justifyContent: "center"}} > 
                    <Text style={{textAlign:"center", color:"#FFFFFF", fontSize:16,fontWeight:"bold"}}>REGISTER</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}
