import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'

export default class RegisterScreen extends PureComponent {
    state = { email: '', password: '', password2: '', errorMessage: null }
    
    handleSignUp = () => {

        
        if (this.state.email != '' && this.state.password != '' && this.state.password == this.state.password2) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => Actions.pop())
                .catch(error => this.setState({ errorMessage: error.message }))
                //console.log("sld",this.state.email, this.state.password,this.state.password2);
        
                //Actions.pop();
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ marginLeft: 25 }}>E-mail:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={{ marginLeft: 25, marginRight: 25, }}  onChangeText={(email) => this.setState({email})} ></TextInput>
                <Text style={{ marginLeft: 25 }}>Password:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={{ marginLeft: 25, marginRight: 25, }} secureTextEntry  onChangeText={(password) => this.setState({password})}></TextInput>
                <Text style={{ marginLeft: 25 }}>Password:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={{ marginLeft: 25, marginRight: 25, }} secureTextEntry  onChangeText={(password2) => this.setState({password2})}></TextInput>
                <TouchableOpacity onPress={this.handleSignUp}
                    style={{ backgroundColor: '#ff006a', margin: 30, height: 40, borderRadius: 2, justifyContent: "center" }} >
                    <Text style={{ textAlign: "center", color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>REGISTER</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
