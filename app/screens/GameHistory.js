import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV()

export class GameHistory extends Component {
    state = {
        points: [],
        bestPoint: 0
    }
    componentDidMount() {
        points = storage.getString("point")?.split(" ");
        this.setState({ points })
        points.map(item =>
            this.state.bestPoint < item && this.setState({ bestPoint: item })
        )
    }
    render() {
        console.log("gelen")
        return (
            <SafeAreaView style={styles.container}>
                <Text style={[styles.gameHeader, styles.itemShadow]}>Point History</Text>
                <Text>Best Point : {Math.max(this.state.bestPoint)} </Text>
                <ScrollView style={{ alignSelf: 'center', paddingTop: '15%' }}>
                    {this.state.points?.map((item, index) =>
                        item != "" && <Text>{index + 1}. Point :{item}</Text>
                    )}
                </ScrollView>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>LOGOUT</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default GameHistory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E8F9FD'
    },
    gameHeader: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        marginTop: '20%'
    },
    gameIcon: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        margin: 10
    },
    iconContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center', width: '80%'
    },
    startButton: {
        color: '#fff',
        fontSize: 20
    },
    startButtonContainer: {
        alignSelf: 'center',
        backgroundColor: '#0AA1DD',
        marginTop: '10%',
        padding: '2%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'lightgray',

    },
    itemShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 6,
        },
        shadowOpacity: 0.36,
        shadowRadius: 5.14,
    },
    logoutButton: {
        alignSelf: 'center',
        marginBottom: '10%',
        backgroundColor: '#42C2FF',
        padding: 10,
        borderRadius: 10
    },
    logoutText: {
        color: 'black'
    },
})