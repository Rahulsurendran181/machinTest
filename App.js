import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Modules/Navigation/navigation';
export default class App extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {

  }

  render() {
    return (
      // <NavigationContainer>
        <View style={styles.backgroundContainer}>
          <Navigation />
        </View>
      // </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  }
});