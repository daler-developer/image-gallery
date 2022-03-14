import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

const Welcome = ({}) => {
  const navigation = useNavigation()

  const handleLoginBtnPress = () => navigation.navigate('Auth', { tab: 'login' })

  const handleRegisterBtnPress = () => navigation.navigate('Auth', { tab: 'register' })

  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />

      <View style={styles.btns}>

        <TouchableOpacity style={[styles.btn, styles.loginBtn]} onPress={handleLoginBtnPress}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.registerBtn]} onPress={handleRegisterBtnPress}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  logo: {
    borderRadius: 10,
    alignSelf: 'flex-start',
    width: 50,
    height: 50
  },
  btns: {
    
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 3
  },
  btnText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 17,
    fontWeight: '500'
  },
  loginBtn: {
    backgroundColor: 'orange'
  },
  registerBtn: {
    marginTop: 5,
    backgroundColor: 'purple'
  }
})

export default Welcome
