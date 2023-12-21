import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

/*
1.
Di official tambah ini di package.json:
  "jest": {
    "preset": "react-native"
  },
Tidak usah itu malah error:
! Implicit config resolution does not allow multiple configuration files. Either remove unused config files or select one explicitly with `--config`.

2. optional
Jika ingin mengedit ini misal menambah <Text> maka ubah script "test": "jest" menjadi "jest -u" agar tidak error dan bisa mengupdate snapshotnya
 */
class Intro extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>
          This is a React Native snapshot test.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
});

export default Intro;
