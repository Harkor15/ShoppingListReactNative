import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'



export default class DetailsScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users').doc(this.props.uid).collection("lists").doc(this.props.item.key);
        const productsList = [];
        for (let i = 0; i < this.props.item.products.length; i++) {
            productsList.push({
                key: 'key' + i,
                product: this.props.item.products[i]
            });
        }
        this.state = { productsList };
    }

    deleteClick = () => {
        this.ref.delete();
        Actions.pop();
    }

    render() {
        return (
            <View style={styles.fullFlex}>
                <View style={styles.firstSectionSize}>
                    <Text style={styles.shopName}>{this.props.item.shop_name}</Text>
                    <Text style={styles.budget}> ${this.props.item.budget}</Text>
                    <Text style={styles.products}> Products:</Text>
                </View>
                <View style={styles.fullFlex}>
                    <FlatList
                        data={this.state.productsList}
                        extraData={this.state.productsList}
                        renderItem={({ item }) =>
                            <View>
                                <Text style={styles.flatListItemText}> {item.product}</Text>
                            </View>
                        } />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.deleteClick}>
                    <Text style={styles.buttonText}> DELETE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    flatListItemText: {
        margin: 2,
        fontSize: 24,
        marginLeft: 10
    },
    fullFlex: {
        flex: 1
    },
    products: {
        fontSize: 30,
        margin: 5
    },
    firstSectionSize: {
        flex: 0.4
    },
    shopName: {
        fontSize: 32,
        margin: 5,
        fontWeight: "bold"
    },
    budget: {
        fontSize: 24,
        margin: 5
    },
    button: {
        flex: 0.1,
        alignItems: "center",
        backgroundColor: '#ff006a',
        borderRadius: 2,
        margin: 4,
        height: 30
    },
    buttonText: {
        color: "#FFFFFF",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 20,
    }
});