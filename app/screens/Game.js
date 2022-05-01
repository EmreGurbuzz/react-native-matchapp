import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GameCard from '../components/GameCard';

const Home = ({ navigation }) => {
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const [point, setPoint] = useState(0);
    const [optionOne, setOptionOne] = useState(null)
    const [optionTwo, setOptionTwo] = useState(null)
    const [Cards, setCards] = useState([])
    const cards = [
        { id: 1, name: 'csharp', img: require('../assets/images/csharp.png') },
        { id: 2, name: 'js', img: require('../assets/images/js.png') },
        { id: 3, name: 'nodejs', img: require('../assets/images/nodejs.png') },
        { id: 4, name: 'php', img: require('../assets/images/php.png') },
        { id: 5, name: 'python', img: require('../assets/images/python.png') },
        { id: 6, name: 'reactjs', img: require('../assets/images/reactjs.png') },
        { id: 1, name: 'csharp', img: require('../assets/images/csharp.png') },
        { id: 2, name: 'js', img: require('../assets/images/js.png') },
        { id: 3, name: 'nodejs', img: require('../assets/images/nodejs.png') },
        { id: 4, name: 'php', img: require('../assets/images/php.png') },
        { id: 5, name: 'python', img: require('../assets/images/python.png') },
        { id: 6, name: 'reactjs', img: require('../assets/images/reactjs.png') },
    ]
    useEffect(() => {
        console.log("Game Started.")
        shuffled = shuffle(cards);
        setCards(shuffled)

    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.gameHeader, styles.itemShadow]}>Current Point : <Text>{point}</Text></Text>
            <View>
                <View style={[styles.iconContainer, styles.itemShadow]}>
                    {Cards.map(item =>
                        <GameCard image={item.img} id={item.id} name={item.name} />
                    )}
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E8F9FD',
        width: '100%',
        justifyContent: 'center'
    },
    gameHeader: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: '20%',
    },

    iconContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center'
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
    logoutButton:{
        alignSelf:'center',
        marginTop:'5%',
        backgroundColor:'#42C2FF',
        padding:10,
        borderRadius:10
    },
    logoutText:{
        color:'black'
    }
})