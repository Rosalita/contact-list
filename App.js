import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'

import contacts, { compareNames } from './contacts';


const Row = props => (
  <View style={styles.row}>
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </View>
)

export default class App extends React.Component {
  state = {
    showContacts: false,
    contacts: contacts,
  }

  toggleContacts = () => {
    this.setState(prevState => ({ showContacts: !prevState.showContacts }))
  }

  sort = () => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts].sort(compareNames),
    }))
  }

  renderItem = obj => <Row {...obj.item}/>

  render() {
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="sort" onPress={this.sort} />
        {this.state.showContacts && (
          <FlatList
            renderItem={this.renderItem}
            data={this.state.contacts}
          />
        )}
        {/* 
        {this.state.showContacts && (
          <ScrollView>
            {contacts.map(contact => (
              <Row {...contact} />
            ))}
          </ScrollView>
        )}
         */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  row: {
    padding: 20,
  }
});
