import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'

import store from './redux/store'
import Welcome from './components/screens/Welcome'
import Home from './components/screens/Home'
import Auth from './components/screens/Auth'

const Stack = createNativeStackNavigator()

const App = () => {
  return <>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
          />
          <Stack.Screen
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hide />
    </Provider>
  </>
}

const styles = StyleSheet.create({
  container: {

  },
  block: {

  }
})

export default App
