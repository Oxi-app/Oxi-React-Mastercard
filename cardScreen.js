import {React,  useState, useEffect, useRef  } from "react";
import {StyleSheet, FlatList, Text, TextInput, View, Image, Keyboard,TouchableWithoutFeedback, SafeAreaView, Modal, Alert, Pressable, ScrollView} from "react-native";

function CardScreen ({navigation, route}) {
    return(
  <SafeAreaView >
  
          <Text style={styles.comingSoon}>
            Coming Soon...{'\n'}{'\n'}
          </Text>
          <Text style={styles.cardScreenText}>
            Earn crypto for spending sustainbly and store in your Wallet{'\n'}{'\n'}
            Add FIAT to your wallet{'\n'}{'\n'}
            Exchange crypto to FIAT and other crypto{'\n'}{'\n'}
            Purchase with crypto
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

  export default CardScreen