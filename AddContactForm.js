import React from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    input: {
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,

    }
})

export default class AddContactForm extends React.Component {
    static propTypes = {
        addContact: PropTypes.func,
    }

    state = {
        name: "",
        phone: "",
    }

    handleNameChange = name => {
        this.setState({name})
    }

    handlePhoneChange = phone => {
        this.setState({phone})
    }

    render() {
        return (
            <View style={{ paddingTop: 20, }}>
                <TextInput
                onChangeText={this.handleNameChange} 
                style={styles.input} 
                value={this.state.name} 
                />
                <TextInput 
                onChangeText={this.handlePhoneChange}
                style={styles.input} 
                value={this.state.phone} 
                keyboardType="numeric"
                />
                <Button title="Add Contact" />
            </View>
        )
    }
}