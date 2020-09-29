import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MyComments = () => {
    return (
      <View style={styles.container}>
        <Text>MyComments Screen</Text>
      </View>
    );
};

export default MyComments;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});