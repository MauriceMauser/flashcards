import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { handleAddCard } from '../actions/decks';

class NewQuestionView extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { navigation, addCard } = this.props;
    const title = navigation.state.params.title;
    const { question, answer } = this.state;
    const card = { 
      question,
      answer
    };
    await addCard(title, card);
    await this.setState({ question: '', answer: '' });
    navigation.navigate('Overview');
  }
  
  shouldComponentUpdate(nextProps, nextState){
     return (nextState.question != this.state.question) || (nextState.answer != this.state.answer);
  }

  render() {
    const { decks, navigation, addCard } = this.props;
    const title = navigation.state.params.title;
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
          <View style={{ flex: 1, marginTop: 100 }}>
            <Text>{title}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <TextInput 
              onChangeText={question => this.setState({question})}
              value={this.state.question}
              placeholder="Your question, please"
              style={styles.input}
            />
            <TextInput 
              onChangeText={answer => this.setState({answer})}
              value={this.state.answer}
              placeholder="Your answer, please"
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

const mapStateToProps = decks => ({
    decks
});

const mapDispatchToProps = dispatch => ({
  addCard: async (title, card) => dispatch(handleAddCard(title, card))
});

export default connect (mapStateToProps, mapDispatchToProps) (NewQuestionView);

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
  	height: 48,
    width: 300,
  	fontSize: 20,
  	color: 'darkgray',
    borderColor: 'darkgray',
  }
})
