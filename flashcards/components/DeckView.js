import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

class DeckView extends Component {
  render() {
    const { decks, navigation } = this.props;
    const { title, questions } = decks[navigation.state.params.title];
    return (
      <View
        style={{ 
          flex: 1, 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1, marginTop: 100 }}>
          <Text>{title}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{`${questions.length} cards in deck`}</Text>
        </View>
        <View 
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Button 
            onPress={() => navigation.navigate('Quiz', { title: title })}
            title="Take Quiz"
          />
          <Button
            onPress={() => navigation.navigate('NewQuestion', { title: title })}
            title="Add Card"
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect (mapStateToProps) (DeckView);
