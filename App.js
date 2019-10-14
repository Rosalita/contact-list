import React from 'react';
import { Button, SectionList, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import PropTypes from 'prop-types'
import AddContactForm from './AddContactForm'

import contacts, { compareNames } from './contacts';


const Row = props => (
  <View style={styles.row}>
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </View>
)

const ContactsList = props => {
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase()
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    }
  }, {})

  const sections = Object.keys(contactsByLetter).sort().map(letter => ({
    title: letter,
    data: contactsByLetter[letter],
  }))

  return (
    <SectionList
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={sections}
    />
  )
}
const renderItem = obj => <Row {...obj.item} />
const renderSectionHeader = obj => <Text>{obj.section.title}</Text>

ContactsList.propTypes = {
  contacts: PropTypes.array,
}

export default class App extends React.Component {
  state = {
    showContacts: false,
    showForm: false,
    contacts: contacts,
  }

  toggleContacts = () => {
    this.setState(prevState => ({ showContacts: !prevState.showContacts }))
  }

  toggleForm = () => {
    this.setState(prevState => ({ showForm: !prevState.showForm }))
  }

  sort = () => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts].sort(compareNames),
    }))
  }

  render() {
    if (this.state.showForm) return <AddContactForm/>
    
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <Button title="add contact" onPress={this.toggleForm} />
        {this.state.showContacts && <ContactsList contacts={this.state.contacts} />}
        {/* {this.state.showContacts && (
          <FlatList
            renderItem={this.renderItem}
            data={this.state.contacts}
          />
        )} */}
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
