import { StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const GameCard = (props ) => {
    console.log("gelen props :"+JSON.stringify(props))

    const [visible, setVisible] = useState(false)

    if (visible) {
        return (
            <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.gameIconContainer}>
                <Image style={styles.gameIcon} source={props.image} />
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.gameIconContainer}>
                <Image style={[styles.gameIcon, { opacity: 0 }]} source={props.image} />
            </TouchableOpacity>
        )
    }
}

export default GameCard

const styles = StyleSheet.create({
    gameIcon: {
        width: windowWidth/5,
        height: windowWidth/5,
        resizeMode: 'contain',
        margin: '2%'
    },
   
    gameIconContainer: {
        backgroundColor: '#C4DDFF',
        margin: '2%',
        borderRadius: 5
    },
})