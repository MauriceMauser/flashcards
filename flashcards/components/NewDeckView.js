import React, { Component } from 'react';
import { 
  View,
  KeyboardAvoidingView, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { connect } from 'react-redux';
import { handleCreateDeck } from '../actions/decks';

class NewDeckView extends Component {
  state = {
    title: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title } = this.state;
    await this.props.dispatch(handleCreateDeck(title));
    await this.setState({ title: '' });
    this.props.navigation.navigate('Deck', { title: title });
  }

  handleOnChangeText = title => {
    this.setState({ title })
  }

  render() {
    return (
  	  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView 
          style={{ 
            flex: 1, 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
          behavior="padding"
        >
          <View style={{ flex: 1, paddingVertical: 10, marginTop: 100 }}>
            <Text>What is the title of your new deck?</Text>
          </View>
          <View style={{ flex: 1 }}>
            <TextInput 
              onChangeText={this.handleOnChangeText}
              value={this.state.title}
              placeholder="Please enter title"
              style={styles.input}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Submit"
              onPress={this.handleSubmit}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect ()(NewDeckView);

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
  	height: 48,
    width: 200,
  	fontSize: 20,
  	color: 'darkgray',
    borderColor: 'darkgray',
  }
})
