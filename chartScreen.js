import {React,  useState, useEffect, useRef  } from "react";
import {StyleSheet, FlatList, Text, TextInput, View, Image, Keyboard,TouchableWithoutFeedback, SafeAreaView, Modal, Alert, Pressable, ScrollView} from "react-native";
import {DATA} from './App'

function ChartScreen({navigation, route}){

    console.log(DATA)
  return(
    <SafeAreaView>
    <Text style={styles.comingSoon}>
      Coming Soon...{'\n'}{'\n'}
    </Text>
    <Text style={styles.cardScreenText}>
      Gain greater insight into your carbon footprint{'\n'}{'\n'}
      Spot trends{'\n'}{'\n'}
      Oxi will recommend ways to improve your spending
    </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
comingSoon:{
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: '10%'
   },

cardScreenText:{
   fontSize: 25,
   textAlign: 'center',
  },
})

export default ChartScreen