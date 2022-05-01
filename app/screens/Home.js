import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = ({navigation}) => {
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={()=>navigation.navigate("Game")}>
                <Text>Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    
})