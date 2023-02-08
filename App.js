import {Amplify} from "@aws-amplify/core";
import { DataStore } from "@aws-amplify/datastore";
import {React,  useState, useEffect, useRef  } from "react";
import {StyleSheet, FlatList, Text, TextInput, View, Image, Keyboard,TouchableWithoutFeedback, SafeAreaView, Modal, Alert, Pressable, ScrollView} from "react-native";
import { ExampleItem, Item, Materials, Basket, Points } from "./src/models";
import { BarCodeScanner } from "expo-barcode-scanner";
import awsconfig from './src/aws-exports'
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});
import awsExports from "./src/aws-exports";
import { Auth } from "@aws-amplify/auth/lib";
import { withAuthenticator, Authenticator, SignIn} from 'aws-amplify-react-native/dist/Auth';
import Icon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Sentry from 'sentry-expo';
import Greetings from "aws-amplify-react-native/dist/Auth/Greetings";
import { AmplifyTheme } from 'aws-amplify-react-native';
import mobileAds from 'react-native-google-mobile-ads';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads'

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  });



Amplify.configure(awsExports)

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

Sentry.init({
  dsn: 'https://0fb3958998bc45a5b3f010fb4b2d3031@o4504055028121600.ingest.sentry.io/4504055032315904',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3940256099942544/2934735716';

const Tab = createBottomTabNavigator();

// const myTheme = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#00C2FF' });

const myTheme = {
  ...AmplifyTheme,
button: {
  ...AmplifyTheme.button,
  backgroundColor: "#00C2FF"},

buttonDisabled: {
  ...AmplifyTheme.buttonDisabled,
  backgroundColor: '#C4C4C4'
},

sectionFooterLink: {
  ...AmplifyTheme.sectionFooterLink,
  color: '#00C2FF'
}
};

function HomeScreen({navigation, signOut, user}){

  // Defining constants


  const [month, updateCurrentMonth] = useState(null);
  const [year, updateYear] = useState(null);
  const [userSub, updateUserSub] = useState(null);
  const [userFirstName, updateUserFirstName] = useState(null)
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [instructionsModalVisible, setInstructionsModalVisible] = useState(false);
  const [deletionModalVisible, setDeletionModalVisible] = useState(false);
  const [points, setPoints] = useState(0);


  const inputRef = useRef();

  //Determining and defining current date
  const getCurrentDate = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    return date + "-" + month + "-" + year;
  };

  // Reformat the date in AWSDATETIME format
  function dateFormat() {
    const currentMonth = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    if (currentMonth < 10) {
      updateCurrentMonth("0" + currentMonth);
    } else {
      updateCurrentMonth(currentMonth);
    }
    updateYear(year);
  }

  // Check date every time the app rerenders
  useEffect(() => {
    dateFormat();
    getUserInfo();
    getCurrentpoints();
  }, []);

  const [pointsTotal, updatePointsTotal] = useState(0)

  useEffect(() =>{

    const interval = setInterval(() => {
      const year = new Date().getFullYear()  
  
      const month = new Date().getMonth() +1  
  
      const day = new Date().getDate()
  
      const hours = new Date().getHours()
  
      const minutes = new Date().getMinutes()
  
      const seconds = new Date().getSeconds()
      
  
      if (day==1 && hours ==0 && minutes==0 && seconds == 0){
  
        const emissions = 162
        const amount = 220

        const weightedEmissions = emissions/amount

        const addedPoints = (-500)*weightedEmissions+1000
         

        async function addPoints(){
          await DataStore.save(
            new Points({
            "Points": addedPoints.toString()
          })
        ); 

          const userSub = (await Auth.currentAuthenticatedUser()).attributes.sub;
          const pointsArray =(await DataStore.query(Points,(n)=>n.owner.eq(userSub))).map((p)=>p.Points)
          console.log(pointsArray)
          const pointsTotal = (pointsArray.map(Number)).reduce((a,v) =>  a = a + v , 0 )
          updatePointsTotal(pointsTotal.toFixed(0))
      }
        addPoints()
      }
      else{
      } 
    }, 1000);
    return () => clearInterval(interval);
  }, [] )


  //async functions

  async function getUserInfo() {
    const userFirstName = (await Auth.currentAuthenticatedUser()).attributes.name
    updateUserFirstName(userFirstName)
    const userSub = (await Auth.currentAuthenticatedUser()).attributes.sub;
    updateUserSub(userSub)
  }

  async function getCurrentpoints(){
    const userSub = (await Auth.currentAuthenticatedUser()).attributes.sub;
    const pointsArray =(await DataStore.query(Points,(n)=>n.owner.eq(userSub))).map((p)=>p.Points)
    console.log(pointsArray)
    const pointsTotal = (pointsArray.map(Number)).reduce((a,v) =>  a = a + v , 0 )
    updatePointsTotal(pointsTotal.toFixed(0))
  }

  const DATA = [
        {
          "transactionMetadata": {
            "id": "ee421c25-f928-4bf6-b884-3600b76b860d",
            "retrievalRefNumber": "MCC000100",
            "processingCode": "00",
            "authCode": "52717Z",
            "dateAndTime": "2018-07-02T00:00+00:00",
            "merchantName": "ABC Store",
            "acquiringInstitutionCountryCode": "USA",
            "acquiringInstitutionCode": "12312312312",
            "amount": "25.50",
            "currencyCode": "USD",
            "indicator": "AT"
          },
          "transactionFootPrint": {
            "mcc": 3997,
            "carbonEmissionInGrams": 48.52,
            "carbonEmissionInOunces": 1.71,
            "category": {
              "mainCategory": "Leisure & Entertainment",
              "subCategory": "Hotels & Vacation",
              "sector": "Hotels, Motels & Resorts",
              "sectorCode": "604"
            }
          }
        },
        {
          "transactionMetadata": {
            "id": "fdc4626c-f51e-4ba6-9728-c79ac1d9aec8",
            "retrievalRefNumber": "MCC000480",
            "processingCode": "01",
            "authCode": "K3C161",
            "dateAndTime": "2019-12-25T00:00+00:00",
            "merchantName": "ABC Store",
            "acquiringInstitutionCountryCode": "USA",
            "acquiringInstitutionCode": "23423423423",
            "amount": "30.00",
            "currencyCode": "USD",
            "indicator": "CL"
          },
          "transactionFootPrint": {
            "mcc": 5962,
            "carbonEmissionInGrams": 27.98,
            "carbonEmissionInOunces": 0.99,
            "category": {
              "mainCategory": "Shopping",
              "subCategory": "Department Store",
              "sector": "Specialty Retail & Services",
              "sectorCode": "302"
            }
          }
        },
  ];

  const Item = ({title, amount, currency, emissions, date, category}) => {
    let iconName;
    let color;
    if (category==="Shopping"){
      iconName= "cart-outline"
      color = "blue"
    }
    else if (category==="Transportation"){
      iconName= "car-outline"
      color = "green"

    }
    else if (category==="Health & Beauty"){
      iconName= "medkit-outline"
      color="red"
    }
    else if (category==="Home & Garden"){
      iconName= "home-outline"
      color = "orange"
    }
    else if (category==="Food & Beverages"){
      iconName= "fast-food-outline"
      color="black"

    }
    else if (category==="Government Services"){
      iconName= "people-outline"
      color="brown"
    }
    else if (category==="Leisure & Entertainment"){
      iconName= "game-controller-outline"
      color = "purple"
    }

    return(
        <View style={styles.transactionCard}>
                <View style={styles.left}>
                    <Text>{JSON.stringify(date).substring(9,11)}/{JSON.stringify(date).substring(6,8)}</Text>
                    <View style={[styles.circle, {backgroundColor: color}]}>
                    
                        <IonIcon name={iconName} size={25} color={"white"}/>
                      
                    </View>
                </View>
                <View style={styles.middle}>
                    <View>
                    <Text style={styles.merchantText}>{title}</Text>
                    <Text>{currency} {amount}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <Text>{emissions}g</Text>
                </View>
            </View>
          )
      
      };

  const monthlyFootprint = ((DATA.map((p)=>p.transactionFootPrint.carbonEmissionInGrams)).reduce((a,v) =>  a = a + v , 0 ))/1000

  console.log(monthlyFootprint)

  return (
    //<HideKeyboard>
      <SafeAreaView style={styles.centering}>

        <View style={styles.container0}>
          <Image
            style={styles.tinyLogo}
            source={require("./assets/logo.png")}
          />

          <View style={styles.menu}>
            <Pressable
              onPress={() => {
                setMenuModalVisible(true);
              }}
            >
              <Icon name="menu" size={35} color="black" />
            </Pressable>
          </View>
        </View>

        <View style={styles.container1}>
          <Text>
            Welcome {userFirstName} {"\n"}
            {"\n"}
            Your carbon footprint this month:
          </Text>
          <View style={styles.dateView}>
            <Text>{getCurrentDate()}</Text>
          </View>
        </View>

        <View style={styles.container2}>
          <View style={styles.greyBox} >
          <Text style={styles.carbonUsage}>{monthlyFootprint.toFixed(2)} Kg</Text>
          </View>
        </View> 

        <View style={styles.main}>

        <View style={styles.transactionsViewHeader}>
            <View style={styles.transactionsViewHeaderText}>
              <Text style={styles.headerText}>Transactions</Text>
              <View style={styles.pointsView}>
                <View style={styles.pointsSymbol}><View style={styles.pointsSymbol2}></View></View>
                <Text>{pointsTotal}</Text>
              </View>
            </View>
        </View>

      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.transactionMetadata.merchantName} amount={item.transactionMetadata.amount} currency={item.transactionMetadata.currencyCode} emissions={item.transactionFootPrint.carbonEmissionInGrams} date={item.transactionMetadata.dateAndTime} category={item.transactionFootPrint.category.mainCategory}/>}
        keyExtractor={item => item.transactionMetadata.id}
      />
        </View>

        <BannerAd       
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }} />

        {/* Modals */}

         <Modal
          transparent={true}
          visible={menuModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setMenuModalVisible(!menuModalVisible);
          }}
        >
          <View style={styles.centeredView2}>
            <View style={styles.menuModalView}>
              <View style={styles.doneButton}>
                <Pressable
                  style={[styles.modalButtonClose, styles.buttonClose]}
                  onPress={() => {
                    setMenuModalVisible(!menuModalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
              </View>
              <View style={styles.menuInputView}>

                <Pressable
                  onPress={() => {
                    Auth.signOut();
                  }}
                >
                  <View style={styles.instructionsButton}>
                    <Text style={styles.signOutButtonText}>Sign Out</Text>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => {
                    deleteUser();
                  }}
                >
                  <View style={styles.instructionsButton}>
                    <Text style={styles.deleteButtonText}>Delete Account</Text>
                  </View>
                </Pressable>

                <Text>
                  {" "}
                  This action is irreversible and will delete all associated
                  data.{" "}
                </Text>

                <Text> Powered by AWS Amplify API</Text>
              </View>
            </View>
          </View>
        </Modal>

      </SafeAreaView>


   // </HideKeyboard>
  );
            }






const styles = StyleSheet.create({
  authenticator:{
    width: 10,
    hieght: 10,

  },

  centering: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    flexDirection:'column',
    justifyContent: 'space-evenly',
  },

  container0: {
    width: '100%',
    height: '10%',
    flexDirection: "row",
    justifyContent: "space-between",
  },


  container1: {
    width: '80%',
    height: "9%",
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
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
  },

  greyBox: {
    width: "80%",
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

  main: {
    height: "60%",
    width: "90%",
    flexDirection: "column",

  },

  transactionsViewHeader:{
    width: "100%",
    height: "10%",
    borderRadius: 20,
    //  borderTopLeftRadius: 20,
    //  borderTopRightRadius: 20,
    borderColor: "#00C2FF",
    borderWidth: 5,
     backgroundColor: "#00C2FF",
    justifyContent: 'center',
    alignItems: 'center'

  },

  pointsView: {
    width: 75,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5
  },

  
  pointsSymbol:{
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#00C2FF',
    justifyContent: 'center',
    alignItems: 'center'
  },

  pointsSymbol2:{
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: '#00C2FF',
    borderColor: 'white',
    borderWidth: 1
  },

  transactionsViewHeaderText: {
    width: "90%",
    height: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },

  headerText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },

  test: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopColor: 'white',
    borderColor: "#E0E0E0",
    borderWidth: 2,

  },


  transactionsView:{



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
    width: "100%",
    height: 80,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    flexDirection: 'row',
    marginVertical: 8
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




const signUpConfig = {
  header:
  <ScrollView contentContainerStyle={styles.signUpView}>
  <View style = {styles.signUpLogoView}>
  <Image style={styles.signUpLogo} source ={require('./assets/logo.png')}/>
  </View>
  {/* <Text>Sign Up </Text> */}
  </ScrollView> ,
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "First Name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Family name",
      key: "family_name",
      required: true,
      displayOrder: 2,
      type: "string",
    },

    {
      label: "Email (Will become your username)",
      key: "username",
      required: true,
      displayOrder: 3,
      type: "string",
    },

    {
      label: "Password (Must contain uppercase characters, numerals & symbols)",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

const Stack = createNativeStackNavigator()

const CardScreen = ({navigation, route}) => {
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



const ChartScreen = ({navigation, route}) => {
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

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
  },
};

const MyStack = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
      initialRouteName="Home"
       screenOptions={{
        headerShown: false,
      }}

      >

        <Tab.Screen name="Wallet" component={CardScreen}  options={{
            tabBarIcon:({color,size})=>(
              <Icon name="credit-card" size={35} color="black"/>
            )
          }}/>

        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon:({color,size})=>(
              <Icon name="home" size={35} color="black"/>
            )
          }}/>

        <Tab.Screen name="Analytics" component={ChartScreen}  options={{
            tabBarIcon:({color,size})=>(
              <Icon name="bar-chart" size={35} color="black"/>
            )
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};



export default withAuthenticator(MyStack, {theme : myTheme, signUpConfig});



