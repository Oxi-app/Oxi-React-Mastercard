import React from 'react';
import {StyleSheet, FlatList, Text, TextInput, View, Image, Keyboard,TouchableWithoutFeedback, SafeAreaView, Modal, Alert, Pressable, ScrollView} from "react-native";

const App = () => (

  return(

  <SafeAreaView style={styles.centering}>

  <ScrollView>
  <View style={styles.transactionCard}>
                    <View style={styles.left}>
                        <Text>3rd</Text>
                        <View style={styles.circle}> 
                        </View>
                    </View>
                    <View style={styles.middle}>
                        <View>
                        <Text style={styles.merchantText}>British Airways</Text>
                        <Text>£250.67</Text>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <Text>360Kg</Text>
                    </View> 
                </View>
                <View style={styles.transactionCard}></View>
                <View style={styles.transactionCard}></View>
                <View style={styles.transactionCard}></View>
                <View style={styles.transactionCard}></View>
                <View style={styles.transactionCard}></View>
                <View style={styles.transactionCard}></View>
                <View style={styles.transactionCard}></View>
                <View style={styles.transactionCard}></View>
  </ScrollView>
  </SafeAreaView>
  )
);


const styles = StyleSheet.create({
  authenticator:{
    width: 10,
    hieght: 10,

  },

  centering: {
    paddingTop: '10%',
    width: '100%',
    height: '100%',
    alignItems: "center",
    flexDirection:'column',
    justifyContent: 'space-evenly',
  },

  container0: {
    width: '100%',
    height: '15%',
    flexDirection: "row",
    justifyContent: "space-between",
  },


  container1: {
    width: '80%',
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: '3%'
  },

  menu:{
    position: 'relative',
    top: '10%',
    right: '10%'
  },



  dateView: {
    position: 'relative',
    right: '10%'
  },

  tinyLogo: {
    width: 90,
    height: 90,
  },

  signUpLogo: {
    width: 100,
    height: 100,

  },

  signUpLogoView:{
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  signUpView: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%'
  },

  container2: {
    width: '80%',
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },

  greyBox: {
    width: 197,
    height: 62.54,
    borderRadius: 20.85,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center"
  },

  carbonUsage: {
    fontSize: 44,
    color: "#00C2FF",
  },

  // main: {
  //   height: "60%",
  //   width: "90%",
  //   flexDirection: "column",
  //   flexGrow: 1,
  // },

  transactionsViewHeader:{
    width: "100%",
    height: "10%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "#00C2FF",
    borderWidth: 5,
    backgroundColor: "#00C2FF",
    justifyContent: 'center',
    alignItems: 'center'

  },

  transactionsViewHeaderText: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  headerText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },

  test: {
    width: '100%',
    height: '95%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopColor: 'white',
    borderColor: "#E0E0E0",
    borderWidth: 2,
  },


  transactionsView:{
    width: 300,
    height: 300,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopColor: 'white',
    borderColor: "#E0E0E0",
    borderWidth: 2,
    

  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },


  title: {
    fontSize: 32,
  },


  transactionCard:{
    width: 300,
    height: 100,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    flexDirection: 'row',
  },

  left:{
    width: '35%',
    height: '100%',
   // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  circle:{
    width: 45,
    height: 45,
    borderRadius: '30%',
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  },

  middle:{
    width: '45%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  merchantText: {
    fontWeight: 'bold',
    fontSize: 15
  },

  right:{
        width: '20%',
        height: '100%',
      //  backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
  },

  instructionsModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    paddingBottom: '5%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '95%',
    position: 'relative',
    top: '2%'

  },

  menuModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 350,
    position: "relative",
    bottom: 120,
    width: 305,
    justifyContent: 'space-around'
  },

  modalButtonClose: {
    height: 30,
    width: 70,
    borderRadius: 10,
    position: 'relative',
    left: '10%'
  },

  doneButton:{
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
    position: 'relative',
    right: '10%',
  },

  backButton:{
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
    position: 'relative',
  },

  instructionsButton: {
    height: 50,
    width: 90,
    borderRadius: 5,
    backgroundColor: "#00C2FF",
    position: 'relative',
    left: 5
  },
  instructionsButtonText:{
    color: 'white',
    justifyContent: 'center',
    position: 'relative',
    top: 15,
    left: 5,
    fontWeight: "500"
  },

  signOutButtonText:{
    color: 'white',
    justifyContent: 'center',
    position: 'relative',
    alignSelf: 'center',
    top: 15,
    // left: 5,
    fontWeight: "500"
  },

  deleteButtonText:{
    color: 'white',
    justifyContent: 'center',
    position: 'relative',
    alignSelf: 'center',
    top: 10,
    // left: 5,
    fontWeight: "500"
  },

  buttonClose: {
    backgroundColor: "#00C2FF",
  },

  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    position: "relative",
    top: 5,
  },

  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textInputView:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'

  },

  menuInputView:{
    flexDirection: "column",
    alignItems: "center",
    height: 300,
    justifyContent: 'space-evenly'
  },

  container11: {
    width: 250,
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
  },


  cardScreenText:{
   fontSize: 25,
   textAlign: 'center',
  },

  instructionsText:{
    fontSize: 11,
    textAlign: 'center',

   },


  comingSoon:{
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: '10%'
   }

  
  
});

export default App;