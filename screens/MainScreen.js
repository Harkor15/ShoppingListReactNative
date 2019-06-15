import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'


export default class MainScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('users').doc(this.props.uid).collection("lists");
        this.unsubscribe = null;
        this.state = { uid: this.props.uid, lists: null, loading: true };
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
        console.log('sld', this.props.uid);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    onCollectionUpdate = (querySnapshot) => {
        // TODO
        //console.log("sld", querySnapshot);
        const lists = [];
        querySnapshot.forEach((doc) => {
            const { shop_name, budget, products } = doc.data();

            lists.push({
                key: doc.id,
                budget,
                shop_name,
                products,
            });
        });
        //console.log("sld", lists);
        this.setState({ lists, loading: false });
    }
    itemClick=(item)=>{
        Actions.detailsScreen(item);
        //console.log("sld", item);
    }
    addNew=()=>{
        Actions.addNewScreen({uid: this.props.uid});
    }


    render() {
        if (this.state.loading) {
            return (
                <View>
                    <Text>LOADING</Text>
                </View>
            )
        }
        //console.log("sld lists", this.state.lists);
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <FlatList 
                        data={this.state.lists}
                        renderItem={({ item }) =>
                        <TouchableOpacity onPress={()=>this.itemClick(item)}>
                            <View>
                                <Text style={{fontSize:24}}>{item.shop_name}</Text>
                                <Text style={{fontSize:18, marginBottom:10}}>${item.budget}</Text>
                            </View>
                        </TouchableOpacity>
                        }
                    />
                </View>
                <View style={{ flex: 0.1, width: "100%", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={styles.button} onPress={() => Actions.pop()}>
                        <Text style={styles.buttonText}>
                            LOG OUT
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.addNew}>
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
