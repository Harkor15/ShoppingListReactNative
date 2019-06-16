import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';



export default class LoginScreen extends PureComponent {
    state = { user: null, email: '', password: '', errorMessage: null }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
        })
        if (this.state.user != null) {
            Actioins.mainScreen({ uid: this.state.user._auth._user.uid });
        }
    }
    handleLogin = () => {
        if (this.state.email != '' && this.state.password != "") {
            const { email, password } = this.state
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => Actions.mainScreen({ uid: this.state.user._auth._user.uid }))
                .catch(error => this.setState({ errorMessage: error.message }));
        }
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Text style={styles.infoText}>E-mail:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={styles.inputField} onChangeText={(email) => this.setState({ email })}  ></TextInput>
                <Text style={styles.infoText}>Password:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={styles.inputField} secureTextEntry onChangeText={(password) => this.setState({ password })} >

                </TextInput>
                <TouchableOpacity style={styles.buttonLogin}
                    onPress={this.handleLogin} >
                    <Text style={styles.buttonLoginText}>LOG IN</Text>
                </TouchableOpacity>
                <View style={styles.secondLine}>
                    <TouchableOpacity style={styles.registerButton} onPress={() => Actions.registerScreen()}>
                        <Text style={styles.registerButtonText}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: "center"
    },
    infoText: {
        marginLeft: 25
    },
    inputField: {
        marginLeft: 25,
        marginRight: 25,
    },
    buttonLogin: {
        backgroundColor: '#ff006a',
        margin: 30,
        height: 40,
        borderRadius: 2,
        justifyContent: "center"
    },
    buttonLoginText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    secondLine: {
        width: "100%",
        alignItems: "flex-end"
    },
    registerButton: {
        backgroundColor: '#ff006a',
        height: 40,
        borderRadius: 2,
        width: "40%",
        marginRight: 30,
        justifyContent: "center"
    },
    registerButtonText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    }

});