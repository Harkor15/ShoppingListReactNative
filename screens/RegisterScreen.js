import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
            Actions.pop();
        }
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Text style={styles.textField}>E-mail:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={styles.textInputStyle} onChangeText={(email) => this.setState({ email })} ></TextInput>
                <Text style={styles.textField}>Password:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={styles.textInputStyle} secureTextEntry onChangeText={(password) => this.setState({ password })}></TextInput>
                <Text style={styles.textField}>Password:</Text>
                <TextInput underlineColorAndroid={'#ff006a'} style={styles.textInputStyle} secureTextEntry onChangeText={(password2) => this.setState({ password2 })}></TextInput>
                <TouchableOpacity onPress={this.handleSignUp}
                    style={styles.butttonSingUp} >
                    <Text style={styles.textOnButtonSingUp}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: "center"
    },
    textField: {
        marginLeft: 25
    },
    textInputStyle: {
        marginLeft: 25,
        marginRight: 25,
    },
    butttonSingUp: {
        backgroundColor: '#ff006a',
        margin: 30,
        height: 40,
        borderRadius: 2,
        justifyContent: "center"
    },
    textOnButtonSingUp: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    }

});