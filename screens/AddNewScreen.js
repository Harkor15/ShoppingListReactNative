import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'




export default class AddNewScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users').doc(this.props.uid).collection("lists");
        this.state = { inputField: "", productsList: [], budget: "", shop: "" };
    }

    addButtonCLick = () => {
        if (this.state.inputField != "") {
            let list = this.state.productsList;
            list.push({ name: this.state.inputField, key: list.length + "" })
            this.setState({ inputField: "", productsList: list });
        }
    }

    doneButtonClick = () => {
        const tab = [];
        for (let i = 0; i < this.state.productsList.length; i++) {
            tab.push(this.state.productsList[i].name)
        }
        if (this.state.shop != "" && this.state.budget != "" && tab.length > 0) {
            this.ref.add({
                budget: this.state.budget,
                shop_name: this.state.shop,
                products: tab
            })
            Actions.pop();
        }
    }

    render() {
        return (
            <View style={styles.fullFlex}>
                <Text style={styles.title}>New shopping list</Text>
                <Text style={styles.productInfo}> Product</Text>
                <View style={styles.firstSection}>
                    <TextInput underlineColorAndroid={'#ff006a'} style={styles.inputBar} value={this.state.inputField}
                        clearButtonMode='always' onChangeText={(inputField) => { this.setState({ inputField }) }} />
                    <TouchableOpacity onPress={this.addButtonCLick} style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <FlatList style={styles.fullFlex} data={this.state.productsList}
                    renderItem={({ item }) =>
                        <View>
                            <Text style={styles.listItemText}>{item.name}</Text>
                        </View>
                    }
                />
                <View style={styles.inputView}>
                    <Text style={styles.fieldText}>Shop:</Text>
                    <TextInput underlineColorAndroid={'#ff006a'} style={styles.fieldInput}
                        onChangeText={(shop) => { this.setState({ shop }) }} />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.fieldText}>Budget:</Text>
                    <TextInput underlineColorAndroid={'#ff006a'} style={styles.fieldInput}
                        onChangeText={(budget) => { this.setState({ budget }) }} />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.doneButtonClick}>
                    <Text style={styles.buttonText} > DONE </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBar: {
        width: '80%'
    },
    firstSection: {
        flexDirection: "row",
        marginLeft: 20
    }
    ,
    productInfo: {
        marginLeft: 20
    },
    title: {
        margin: 20,
        fontSize: 30
    },
    fullFlex: {
        flex: 1
    },
    listItemText: {
        fontSize: 18,
        marginLeft: 20,
        marginTop: 5
    },
    addButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 32,
    },
    addButton: {
        backgroundColor: '#ff006a',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: "center"
    },
    button: {
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#ff006a',
        borderRadius: 2,
        margin: 20,
        height: 30
    },
    buttonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontWeight: "bold"
    },
    fieldText: {

        flex: 2,
        fontSize: 18
    },
    fieldInput: {

        flex: 8,
        marginRight: 20
    },
    inputView: {
        flexDirection: "row",
        marginLeft: 20,
        alignItems: "center"
    },
});