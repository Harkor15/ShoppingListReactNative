import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';



class LoginScreen extends PureComponent {
    state = { user: null, email: '', password: '', errorMessage: null }
    
    componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
        })
        console.log("sld", this.state.user);
        if (this.state.user != null) {
            Actioins.mainScreen({ uid: this.state.user._auth._user.uid });
        }
    }
    handleLogin = () => {
        Actions.mainScreen({ uid: "ZupUhFFMemdGvKqt98v5u2M7CfE2" }); /////////////////////////////////////////////////////////// TEMPORARY!
        //if (this.state.email != '' && this.state.password != "") {
        //    const { email, password } = this.state
        //    firebase
        //        .auth()
        //        .signInWithEmailAndPassword(email, password)
        //        .then(() => Actions.mainScreen({uid:this.state.user._auth._user.uid}))
        //        .catch(error => this.setState({ errorMessage: error.message }));
        //    console.log("sld", this.state.user._auth._user.uid);
        //}

    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ marginLeft: 25 }}>E-mail:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={{ marginLeft: 25, marginRight: 25, }} onChangeText={(email) => this.setState({ email })}  ></TextInput>
                <Text style={{ marginLeft: 25 }}>Password:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={{ marginLeft: 25, marginRight: 25, }} secureTextEntry onChangeText={(password) => this.setState({ password })} >

                </TextInput>
                <TouchableOpacity style={{ backgroundColor: '#ff006a', margin: 30, height: 40, borderRadius: 2, justifyContent: "center" }}
                    onPress={this.handleLogin} >
                    <Text style={{ textAlign: "center", color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>LOG IN</Text>
                </TouchableOpacity>
                <View style={{ width: "100%", alignItems: "flex-end" }}>
                    <TouchableOpacity style={{ backgroundColor: '#ff006a', height: 40, borderRadius: 2, width: "40%", marginRight: 30, justifyContent: "center" }} onPress={() => Actions.registerScreen()}>
                        <Text style={{ textAlign: "center", color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default LoginScreen;