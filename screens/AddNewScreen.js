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
    componentDidMount() {
        console.log("sld", this.props.uid)
    }
    addButtonCLick = () => {
        if (this.state.inputField != "") {
            let list = this.state.productsList;
            list.push({ name: this.state.inputField, key: list.length + "" })
            this.setState({ inputField: "", productsList: list });
        }


    }

    doneButtonClick = () => {
        console.log("sld", this.state.productsList[0]);
        const tab = [];
        for (let i = 0; i < this.state.productsList.length; i++) {
            tab.push(this.state.productsList[i].name)
        }
        console.log("sld", "try", this.state.shop, this.state.budget, tab);
        if (this.state.shop != "" && this.state.budget != "" && tab.length > 0) {
            this.ref.add({
                budget: this.state.budget,
                shop_name: this.state.shop,
                products: tab
            })
            console.log("sld", "done");
            Actions.pop();
        }

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ margin: 20, fontSize: 30 }}>New shopping list</Text>
                <Text style={{ marginLeft: 20 }}> Product</Text>
                <View style={{ flexDirection: "row", marginLeft: 20 }}>
                    <TextInput underlineColorAndroid={'#ff006a'} style={{ width: '80%' }} value={this.state.inputField}
                        clearButtonMode='always'
                        onChangeText={(inputField) => { this.setState({ inputField }) }}></TextInput>
                    <TouchableOpacity onPress={this.addButtonCLick}
                        style={{ backgroundColor: 'red', borderRadius: 50, width: 50, height: 50, alignItems: "center" }}>
                        <Text style={{ color: "white", textAlign: "center", fontSize: 32, }}>+</Text>
                    </TouchableOpacity>
                </View>

                <FlatList style={{ flex: 1 }} data={this.state.productsList} renderItem={({ item }) =>
                    <View>
                        <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 5 }}>{item.name}</Text>
                    </View>} />

                <View style={styles.inputView}>
                    <Text style={styles.fieldText}>Shop:</Text>
                    <TextInput underlineColorAndroid={'#ff006a'} style={styles.fieldInput} 
                        onChangeText={(shop) => { this.setState({ shop }) }}> </TextInput>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.fieldText}>Budget:</Text>
                    <TextInput underlineColorAndroid={'#ff006a'} style={styles.fieldInput}
                        onChangeText={(budget) => { this.setState({ budget }) }}> </TextInput>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.doneButtonClick}>
                    <Text style={styles.buttonText} > DONE </Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
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