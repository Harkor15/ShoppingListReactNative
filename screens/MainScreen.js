import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'


export default class MainScreen extends PureComponent {
    state = { user: null, email: '', password: '' }
    componentDidMount() {
        console.log('sld', this.props.uid);

        const ref = firebase.firestore().collection('users').doc(this.props.uid).collection("lists");
        //if (ref.exists) {
        //    return ref.data()
        //  } else{
        //      console.log("sld", "error");
        //  }
        
        firebase
            .firestore()
            .runTransaction(async transaction => {
                const col = await transaction.get(ref);
                console.log("sld", col);
            })
            .catch(error => {
                console.log('Transaction failed: ', error);
              });
        }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, }}>
                    <Text>
                        Main screen! WTF
                    </Text>
                </View>
                <View style={{ flex: 0.1, width: "100%", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={styles.button} onPress={() => Actions.pop()}>
                        <Text style={styles.buttonText}>
                            LOG OUT
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                            ADD NEW LIST
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


}
const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#ff006a',
        borderRadius: 2,
        margin: 4,
        height: 30
    },
    buttonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontWeight: "bold"
    }
});
