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
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
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
        this.setState({ lists, loading: false });
    }

    itemClick = (item) => {
        Actions.detailsScreen({ item: item, uid: this.props.uid });
    }

    addNew = () => {
        Actions.addNewScreen({ uid: this.props.uid });
    }

    render() {
        if (this.state.loading) {
            return (
                <View>
                    <Text>LOADING</Text>
                </View>
            )
        }
        return (
            <View style={styles.fullFlex}>
                <View style={styles.fullFlex}>
                    <FlatList
                        data={this.state.lists}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.itemClick(item)}>
                                <View>
                                    <Text style={styles.flatShopName}>{item.shop_name}</Text>
                                    <Text style={styles.flatBugdet}>${item.budget}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
                <View style={styles.secondSectionView}>
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
    fullFlex: {
        flex: 1
    },
    flatShopName: {
        fontSize: 24
    },
    flatBugdet: {
        fontSize: 18,
        marginBottom: 10
    },
    secondSectionView: {
        flex: 0.1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
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
