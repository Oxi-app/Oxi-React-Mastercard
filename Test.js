import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeScreen(navigation) {
  return (

    <SafeAreaView style={styles.container}>

        <View style={styles.navBar}>

        <Image style={styles.tinyLogo} source ={require('./assets/logo.png')}/>

        </View>

        <View style ={styles.pageContent}>

          <View style={styles.infoView}>

            <View style={styles.nameDateView}>
              <Text style={styles.listItemtitle}>Welcome Nishan</Text>
              <Text style={styles.listItemtitle}>02/01/2023</Text>
            </View>

            <View style={styles.monthlyFootprintView}></View>

          </View>

          <View style={styles.transactionsView}></View>

        </View>

        <View style={styles.bottomSection}>

        </View>


        <StatusBar style="auto" />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: "100%",
    height: "100%",
    justifyContent: 'space-between',
    flexDirection: 'column'
  },

  navBar: {
    width: "100%",
    height: "10%",
    // backgroundColor: "blue",
    alignItems: 'center',
    justifyContent: 'center'
  },

  tinyLogo: {
    width: 90,
    height: 90,
    justifyContent: 'center'
  },

  listItemtitle:{
    fontSize: 17,
    fontWeight: 'bold'
  },

  pageContent: {
    width: "100%",
    height: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  },

  infoView:{
    width: "100%",
    height: 200,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'

  },

  nameDateView: { 
    width: "95%",
    height: 50,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  monthlyFootprintView: {
    width: 200,
    height: 100,
    backgroundColor: 'grey',
    borderRadius: 20,
  },

  transactionsView: {
    width: "95%",
    height: 350,
    backgroundColor: 'pink',
    borderRadius: 20,

  },

  bottomSection: {
    width: "100%",
    height: "10%", 
    backgroundColor: "orange",
    justifyContent: "flex-end"
  }


});




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
    <NavigationContainer>
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

export default MyStack()
