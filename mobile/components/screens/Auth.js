import { useFormik } from 'formik'
import { Link } from '@react-navigation/native'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Animated, Easing, ActivityIndicator } from 'react-native'
import * as yup from 'yup'
import { useEffect, useRef } from 'react'

const Auth = ({ route }) => {
  const form = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      username: yup.string().trim().required().min(3).max(15),
      password: yup.string().trim().required().min(3).max(15),
    }), 
    onSubmit(v) {
      form.resetForm()
    }
  })

  const deg = useRef(new Animated.Value(10)).current 

  useEffect(() => {
    Animated.loop(
      Animated.timing(deg, { toValue: 360, duration: 1000, easing: Easing.linear, useNativeDriver: true })
    ).start()
  }, [])

  const tab = route.params.tab

  return (
    <View style={styles.container}>
      
      <View style={styles.top}>
        <TextInput
          style={[styles.textInput, form.touched.username && form.errors.username && styles['textInput--error']]}
          placeholder="Username"
          value={form.values.username}
          onChangeText={form.handleChange('username')}
          onBlur={form.handleBlur('username')}
        />
        <TextInput
          placeholder="Password"
          style={[styles.textInput, form.touched.password && form.errors.password && styles['textInput--error'], { marginTop: 10 }]}
          value={form.values.password}
          onChangeText={form.handleChange('password')}
          onBlur={form.handleBlur('password')}
        />
        {tab === 'login' && (
          <Text style={styles.linkWrapper}>
            Don't have an account? <Link to={{ screen: 'Auth', params: { tab: 'register' } }} style={styles.link}>Register</Link>
          </Text>
        )}
        {tab === 'register' && (
          <Text style={styles.linkWrapper}>
            Already have an account? <Link to={{ screen: 'Auth', params: { tab: 'login' } }} style={styles.link}>Login</Link>
          </Text>
        )}
      </View>

      <TouchableOpacity style={[styles.submitBtn]} onPress={form.handleSubmit}>
        {form.isSubmitting ? (
          <ActivityIndicator size="small" color="white" style={styles.spinner} />
        ) : (
          <Text style={styles.btnText}>
            {tab === 'login' ? 'Login' : 'Register'}
          </Text>
        )}
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  top: {},
  textInput: {
    height: 40,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 3
  },
  'textInput--error': {
    borderColor: 'red'
  },
  linkWrapper: {
    marginTop: 10,
    textAlign: 'center'
  },
  link: {
    color: 'blue'
  },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 10,
    backgroundColor: 'blue'
  },
  spinner: {

  },
  btnText: {
    color: 'white'
  }
})

export default Auth
