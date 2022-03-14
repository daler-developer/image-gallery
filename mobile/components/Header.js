import { View, StyleSheet, Text } from 'react-native'

const Header = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TodoList</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    shadowColor: 'yellow',
  },
  title: {
    fontSize: 22,
    fontWeight: '500'
  }
})

export default Header
