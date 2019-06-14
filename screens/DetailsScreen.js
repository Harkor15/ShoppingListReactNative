import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'

export default class DetailsScreen extends PureComponent {

    render() {
        return (
            <View>
                <Text style={{ fontSize: 24, margin: 5, fontWeight: "bold" }}>{this.props.shop_name}</Text>
                <Text style={{ fontSize: 18, margin: 5 }}> ${this.props.budget}</Text>
                <Text style={{ fontSize: 20, margin: 5 }}> Products:</Text>
                <FlatList data={this.props.products} renderItem={({item})=>
                <View> 
                    <Text>
                        {item.products}
                    </Text>
                </View>
            }/>

                
            </View>
        )
    }
}