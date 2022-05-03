import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GameCard from '../components/GameCard';

const windowWidth = Dimensions.get('window').width;
export class Game2 extends Component {
    state = { 
        point: 60, // timer + point  
        cards: [], // current mixed cards
        selectedCardIndex1: null, // first pick
        selectedCardIndex2: null,  // second pick
        which: 1, // next card status {1 selectedCardIndex or 2 selectedCardIndex2}
        gameEnd: false
    }
    cards = [ // Current cards
        { id: 1, matched: false, visible: false, name: 'csharp', img: require('../assets/images/csharp.png') },
        { id: 2, matched: false, visible: false, name: 'js', img: require('../assets/images/js.png') },
        { id: 3, matched: false, visible: false, name: 'nodejs', img: require('../assets/images/nodejs.png') },
        { id: 4, matched: false, visible: false, name: 'php', img: require('../assets/images/php.png') },
        { id: 5, matched: false, visible: false, name: 'python', img: require('../assets/images/python.png') },
        { id: 6, matched: false, visible: false, name: 'reactjs', img: require('../assets/images/reactjs.png') },
    ]

    shuffle(array) { // Cards mixed function
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    gameEnd() { 
        console.log("Game over")
        this.setState({ gameEnd: true })
        clearInterval(this.timer)
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.cards.filter(item => item.visible == false).length == 0 && !this.state.gameEnd) {
            this.gameEnd()
        }

        if (this.state.point == 0 && !this.state.gameEnd) {
            this.gameEnd()
        }
        if (this.state.cards[this.state.selectedCardIndex1]?.name == this.state.cards[this.state.selectedCardIndex2]?.name && this.state.selectedCardIndex1 != null && this.state.selectedCardIndex2 != null) {
            console.log("Matched")
            this.setState({ selectedCardIndex1: null, selectedCardIndex2: null })
        }
        else if (this.state.selectedCardIndex1 != this.state.selectedCardIndex2 && this.state.selectedCardIndex1 != null && this.state.selectedCardIndex2 != null) {
            console.log("Unmatched")
            setTimeout(() => { // if unmatched, selected cards turn again
                newStatus = []
                this.state.cards.map((item, index) => {
                    if (this.state.selectedCardIndex1 == index || this.state.selectedCardIndex2 == index) {
                        newStatus.push({
                            id: item.id,
                            matched: item.matched,
                            visible: !item.visible,
                            name: item.name
                        })
                    }
                    else {
                        newStatus.push(item)
                    }
                })
                this.setState({ cards: newStatus });
                this.setState({ selectedCardIndex1: null, selectedCardIndex2: null })
            }, 150);
        }
    }
    clickItem(cardItem, cardIndex) { 
        newStatus = []
        this.state.cards.map((item, index) => {
            if (cardIndex == index) {
                newStatus.push({
                    id: item.id,
                    matched: item.matched,
                    visible: !item.visible,
                    name: item.name
                })
            }
            else {
                newStatus.push(item)
            }
        })
        this.setState({ cards: newStatus });
    }
    timer = setInterval(() => {
        this.setState({ point: this.state.point - 1 })
    }, 1000);
    componentDidMount() {
        this.timer
        console.log("Game Started.")
        newCard = this.cards.concat(this.cards) // cards(quantity 6) + cards (quantity 6) = 12 cards
        this.setState({ cards: this.shuffle(newCard) }) // cards mixed and set cards state
    }
    componentWillUnmount() {
        clearInterval(this.timer) // if logout or close game timer stopped
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={[styles.gameHeader, styles.itemShadow]}>Current Point : <Text>{this.state.point}</Text></Text>
                <View>
                    <View style={[styles.iconContainer, styles.itemShadow]}>
                        {this.state.cards.map((item, index) =>
                            <GameCard click={() => { this.clickItem(item, index), this.state.which == 1 ? this.setState({ selectedCardIndex1: index, which: 2 }) : this.setState({ selectedCardIndex2: index, which: 1 }) }} visible={item.visible} image={item.img} id={item.id} name={item.name} />
                        )}
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <Modal transparent visible={this.state.gameEnd} animationType='fade'>
                    <View style={styles.gameEndPopup}>
                        <View style={styles.gameEndContainer}>
                            <Text style={styles.gameEndPoint}>Your Point : {this.state.point} </Text>
                            <Text style={styles.gameEndPoint}>Best Point : {this.state.point} </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={styles.logoutButton}>
                                <Text style={styles.logoutText}>LOGOUT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}

export default Game2

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
    logoutButton: {
        alignSelf: 'center',
        marginTop: '5%',
        backgroundColor: '#42C2FF',
        padding: 10,
        borderRadius: 10
    },
    logoutText: {
        color: 'black'
    },
    gameEndPopup: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.8)',
        alignItems: 'center',
        justifyContent: 'center'

    },
    gameEndContainer: {
        backgroundColor: 'rgba(255,255,255,.9)',
        width: windowWidth * .70,
        height: windowWidth * .70,
        borderRadius: 10,
        justifyContent: 'center', alignItems: 'center'

    },
    gameEndPoint: {
        fontSize: 20,
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: '10%',
        color: '#00A'
    }
})