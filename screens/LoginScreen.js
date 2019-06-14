import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

login=()=>{
 Actions.LoginScreen();
}
class LoginScreen extends PureComponent {
    render() {
        return (
            <View style={{  flex: 1,justifyContent: "center"}}>
                <Text style={{marginLeft:25}}>E-mail:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={{marginLeft:25, marginRight:25,}}  ></TextInput>
                <Text style={{marginLeft:25}}>Password:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={{marginLeft:25, marginRight:25,}} secureTextEntry>

                </TextInput>
                <TouchableOpacity style={{backgroundColor:'#ff006a', margin: 30,height: 40, borderRadius:2,justifyContent: "center"}}
                onPress={()=> login()} > 
                    <Text style={{textAlign:"center", color:"#FFFFFF", fontSize:16,fontWeight:"bold"}}>LOG IN</Text>
                </TouchableOpacity>
                <View style={{width: "100%", alignItems:"flex-end"}}>
                    <TouchableOpacity style={{backgroundColor:'#ff006a', height: 40,borderRadius:2,width:"40%",marginRight:30,justifyContent: "center" }}onPress={()=> Actions.registerScreen()}>
                        <Text style={{textAlign:"center", color:"#FFFFFF", fontSize:16,fontWeight:"bold"}}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default LoginScreen;