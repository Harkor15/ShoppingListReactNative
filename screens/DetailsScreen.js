import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'


export default class DetailsScreen extends PureComponent {
    constructor(props) {
        super(props);
       
        const productsList = [];
        for (let i = 0; i < this.props.products.length; i++) {
            productsList.push({
                key: 'key'+i,
                product: this.props.products[i]
            });
        }
        this.state={productsList};
    }
    render() {
        
        

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.4 }}>
                    <Text style={{ fontSize: 32, margin: 5, fontWeight: "bold" }}>{this.props.shop_name}</Text>
                    <Text style={{ fontSize: 24, margin: 5 }}> ${this.props.budget}</Text>
                    <Text style={{ fontSize: 30, margin: 5 }}> Products:</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.productsList}
                        renderItem={({ item }) =>
                            <View>
                                <Text style={{margin:2, fontSize:24,marginLeft:10}}> {item.product}</Text>
                            </View>
                        } />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}> DELETE</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
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